import { db } from "@config/firebase";
import { isArrayEqual } from "@utils/helperFunctions";
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
  query,
  onSnapshot,
  where,
  limit,
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

export const updateAssessment = async (_data = {}, disableUpdatedTimestamp) => {
  try {
    const { questions, ...data } = _data;
    const { id, published } = _data;

    // Add to assessments
    const docRef = doc(db, "assessments", published);

    const _questions =
      questions?.map(({ answer, ...i }, idx) => ({ ...i, index: idx })) || [];
    const _answers =
      questions?.map((i, idx) => ({ answer: i.answer || "", index: idx })) ||
      [];

    const docPayload = {
      ...data,
      questions: _questions,
    };
    const docRes = await updateDoc(docRef, cleanObject(docPayload));

    // Save answers
    const answersRef = doc(db, "assessments", published, "answers", "answers");
    const answersRes = await updateDoc(
      answersRef,
      cleanObject({ answers: _answers })
    );

    // update content
    const contentRef = doc(db, "content", id);
    const contentPayload = {
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
    const contentRes = await updateDoc(contentRef, {
      ...cleanObject(contentPayload),
      ...(disableUpdatedTimestamp
        ? {}
        : { updatedTimestamp: serverTimestamp() }),
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

export const listenUsersSubmittedAssessment = (cid, docId, callback) => {
  const q = query(
    collection(db, "submitted_assessments"),
    where("cid", "==", cid),
    where("assessmentId", "==", docId),
    limit(1)
  );

  const unsub = onSnapshot(q, (snap) => {
    callback?.(snap?.docs?.[0]?.data?.());
  });

  return unsub;
};

export const getAssessmentAnswers = async (docId) => {
  try {
    const assessmentRef = doc(db, "assessments", docId, "answers", "answers");
    const assessmentSnap = await getDoc(assessmentRef);

    return { success: true, payload: assessmentSnap.data()?.answers };
  } catch (error) {
    console.log(error);
  }
};

export const submitCompletedAssessment = async (
  cid,
  courseId,
  assessmentId,
  publishedId,
  answers
) => {
  // return console.log(answers);
  try {
    // Get answers
    const answersRef = await getDoc(
      doc(db, "assessments", publishedId, "answers", "answers")
    );
    const fetchedAnswers = answersRef.data?.();

    const graded = gradeAnswers(fetchedAnswers?.answers, answers);
    // return console.log(graded);

    const sum = graded.reduce((acc, item) => {
      return acc + item.points;
    }, 0);

    // Submit user assessment
    const docRef = doc(collection(db, "submitted_assessments"));
    const docPayload = {
      totalPoints: sum,
      answers: graded,
      id: docRef.id,
      course: courseId,
      cid,
      assessmentId,
    };
    const docRes = await setDoc(docRef, {
      ...cleanObject(docPayload),
      timestamp: serverTimestamp(),
    });

    // Add to users submitted assessment
    const userRef = doc(db, "contacts", cid);
    await updateDoc(userRef, {
      submittedAssessments: arrayUnion(assessmentId),
    });

    return { success: true };
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

const gradeAnswers = (answers, submission) => {
  const correctAnswers = answers.map((an, i) => {
    const usersAns = submission[an?.index];

    const _data = {
      index: an?.index,
      answer: usersAns,
      correctAnswer: an.answer,
    };

    if (typeof an.answer === "string") {
      return usersAns === an.answer
        ? { ..._data, points: 1 }
        : { ..._data, points: 0 };
    } else if (typeof an.answer === "object") {
      return isArrayEqual(an.answer, usersAns)
        ? { ..._data, points: 1 }
        : { ..._data, points: 0 };
    }
  });

  // console.log(correctAnswers);

  return correctAnswers;
};
