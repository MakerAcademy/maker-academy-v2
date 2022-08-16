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

export const submitCourse = async (cid, data = {}) => {
  try {
    // Add to courses
    const docRef = doc(collection(db, "courses"));
    const docPayload = {
      ...data,
      author: cid,
      id: docRef.id,
      timestamp: serverTimestamp(),
    };
    const docRes = await setDoc(docRef, docPayload);

    //searchable term
    let _searchTerm = `${data?.title || ""} ${data?.brand || ""} ${
      data?.shortDescription || ""
    } ${data?.level || ""} ${data?.category || ""}`
      ?.toLowerCase()
      ?.replace(/[^a-zA-Z ]/g, "")
      ?.split(" ")
      ?.filter((i) => i?.length > 4);

    //remove duplicate words
    _searchTerm = Array.from(new Set(_searchTerm)).filter(Boolean);

    // new content
    const contentRef = doc(collection(db, "content"));
    const contentPayload = {
      author: cid,
      published: docRef.id,
      id: contentRef.id,
      contentType: "course",
      likes: 0,
      views: 0,
      enrolledUsers: 0,
      status: "pending",
      timestamp: serverTimestamp(),
      private: !!data?.private,
      filters: {
        brand: data?.brand || "none",
        searchTerm: _searchTerm,
        category: data?.category || "",
        level: data?.level || "",
      },
      metadata: {
        level: data?.level || "",
        title: data?.title || "",
        brand: data?.brand || "",
        shortDescription: data?.shortDescription || "",
        category: data?.category || "",
        duration: data?.duration || "",
      },
    };
    const contentRes = await setDoc(contentRef, cleanObject(contentPayload));

    return { success: true, payload: { ...data, id: contentRef.id } };
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getCourse = async (cid) => {
  const docRef = doc(db, "courses", cid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return console.log("cid", cid, "No such course!");
  }
};

export const getCourseWithContent = async (cid, seperate) => {
  try {
    const contentRef = doc(db, "content", cid);
    const contentSnap = await getDoc(contentRef);

    if (contentSnap.exists()) {
      const contentData = contentSnap.data();

      const docRef = doc(db, "courses", contentData.published);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const docObj = {
          ...(seperate
            ? {
                document: {
                  ...docSnap.data(),
                  timestamp:
                    contentData.timestamp?.toDate?.()?.toString() || null,
                  updatedTimestamp:
                    contentData.updatedTimestamp?.toDate?.()?.toString() ||
                    null,
                },
              }
            : docSnap.data()),
          ...contentData,
          timestamp: contentData.timestamp?.toDate?.()?.toString() || null,
          updatedTimestamp:
            contentData.updatedTimestamp?.toDate?.()?.toString() || null,
        };

        return docObj;
      }
    }
  } catch (error) {
    console.log("cid", cid, "No such course!");
    throw error;
  }
};

export const enrollToCourse = async (contentId, cid) => {
  try {
    if (!contentId || !cid)
      throw { message: "Missing Content ID or Profile ID" };

    const userRef = doc(db, "contacts", cid);
    await updateDoc(userRef, {
      enrolledCourses: arrayUnion(contentId),
    });

    const contentRef = doc(db, "content", contentId);
    await updateDoc(contentRef, {
      enrolledUsers: increment(1),
    });

    return { success: true };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const likeCourse = async (contentId, cid) => {
  try {
    const _ref = doc(db, "contacts", cid);
    await updateDoc(_ref, {
      likedContent: arrayUnion(contentId),
    });

    const contentRef = doc(db, "content", contentId);
    await updateDoc(contentRef, {
      likes: increment(1),
    });

    return { success: true };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const unlikeCourse = async (contentId, cid) => {
  try {
    const _ref = doc(db, "contacts", cid);
    await updateDoc(_ref, {
      likedContent: arrayRemove(contentId),
    });

    const contentRef = doc(db, "content", contentId);
    await updateDoc(contentRef, {
      likes: increment(-1),
    });

    return { success: true };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
