import { db } from "@config/firebase";
import { cleanObject } from "@utils/helpers";
import {
  setDoc,
  collection,
  doc,
  serverTimestamp,
  getDoc,
  updateDoc,
  arrayUnion,
  increment,
} from "firebase/firestore";

export const submitAssessment = async (cid, _data = {}) => {
  try {
    const { questions, ...data } = _data;

    // Add to assessments
    const docRef = doc(collection(db, "assessments"));

    const _questions =
      questions?.map(({ answer, ...i }, idx) => ({ ...i, index: idx })) || [];
    const _answers =
      questions?.map((i, idx) => ({ answer: i.answer || "", index: idx })) ||
      [];

    const docPayload = {
      ...data,
      questions: _questions,
      author: cid,
      id: docRef.id,
    };
    const docRes = await setDoc(docRef, {
      ...cleanObject(docPayload),
    });

    // Save answers
    const answersRef = doc(db, "assessments", docRef.id, "answers", "answers");
    const answersRes = await setDoc(
      answersRef,
      cleanObject({ answers: _answers })
    );

    // new content
    const contentRef = doc(collection(db, "content"));
    const contentPayload = {
      author: cid,
      published: docRef.id,
      id: contentRef.id,
      contentType: "assessment",
      views: 0,
      enrolledUsers: 0,
      status: "pending",
      private: true,
      metadata: {
        level: data?.level || null,
        title: data?.title || null,
        description: data?.description || null,
        category: data?.category || null,
        duration: data?.duration || null,
        totalQuestions: data?.questions?.length || 0,
      },
    };
    const contentRes = await setDoc(contentRef, {
      ...cleanObject(contentPayload),
      timestamp: serverTimestamp(),
    });

    return { success: true, payload: { ...data, id: contentRef.id } };
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getAssessmentWithContent = async (cid, seperate) => {
  try {
    const contentRef = doc(db, "content", cid);
    const contentSnap = await getDoc(contentRef);

    if (contentSnap.exists()) {
      const contentData = contentSnap.data();

      const docRef = doc(db, "assessments", contentData.published);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const docObj = {
          ...(seperate
            ? {
                document: {
                  ...docSnap.data(),
                  timestamp:
                    contentData.timestamp?.toDate?.()?.toString?.() || null,
                  updatedTimestamp:
                    contentData?.updatedTimestamp?.toDate?.()?.toString?.() ||
                    null,
                },
              }
            : docSnap.data()),
          ...contentData,
          timestamp: contentData.timestamp?.toDate?.()?.toString?.() || null,
          updatedTimestamp:
            contentData?.updatedTimestamp?.toDate?.()?.toString?.() || null,
        };

        return docObj;
      }
    }
  } catch (error) {
    console.log("cid", cid, "No such assessment!");
    throw error;
  }
};
