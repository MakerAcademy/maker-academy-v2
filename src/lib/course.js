import { db } from "@config/firebase";
import { extractFileInObject } from "@utils/helperFunctions";
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
  arrayRemove,
} from "firebase/firestore";
import { DEFAULT_CONTENT_THUMBNAIL } from "./document";
import { uploadFile } from "./storage";

export const generateCourseSearchTerm = (data) => {
  let _searchTerm = `${data?.title || ""} ${data?.brand || ""} ${
    data?.shortDescription || ""
  } ${data?.level || ""} ${data?.category || ""}`
    ?.toLowerCase()
    ?.replace(/[^a-zA-Z ]/g, "")
    ?.split(" ")
    ?.filter((i) => i?.length > 4);

  //remove duplicate words
  _searchTerm = Array.from(new Set(_searchTerm)).filter(Boolean);

  return _searchTerm;
};

export const submitCourse = async (cid, data = {}) => {
  try {
    const { obj, files } = extractFileInObject(data);

    // Add to courses
    const docRef = doc(collection(db, "courses"));
    const docPayload = {
      ...obj,
      thumbnail: obj?.thumbnail || DEFAULT_CONTENT_THUMBNAIL,
      author: cid,
      id: docRef.id,
    };
    const docRes = await setDoc(docRef, docPayload);

    const _allDocs = obj?.curriculum?.flatMap?.((n) => n.documents);

    //searchable term
    let _searchTerm = generateCourseSearchTerm(obj);

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
      private: !!obj?.private,
      filters: {
        brand: obj?.brand || "none",
        searchTerm: _searchTerm,
        category: obj?.category || "",
        level: obj?.level || "",
      },
      metadata: {
        level: obj?.level || "",
        title: obj?.title || "",
        brand: obj?.brand || "",
        shortDescription: obj?.shortDescription || "",
        category: obj?.category || "",
        duration: obj?.duration || "",
        allDocuments: _allDocs || [],
        thumbnail: obj?.thumbnail || DEFAULT_CONTENT_THUMBNAIL,
      },
    };
    const contentRes = await setDoc(contentRef, {
      ...cleanObject(contentPayload),
      timestamp: serverTimestamp(),
    });

    // Upload files
    if (files && Object.keys(files)) {
      for await (const [key, value] of Object.entries(files)) {
        const extension = value?.name?.split(".")?.[1];

        await uploadFile(
          `/content/${contentRef.id}/${key}.${extension}`,
          value
        ).then(async (res) => {
          if (res?.success) {
            await updateDoc(docRef, { [key]: res?.metadata?.downloadURL });
            await updateDoc(
              contentRef,
              {
                [`metadata.${key}`]: res?.metadata?.downloadURL,
              },
              { merge: true }
            );
          }
        });
      }
    }

    return { success: true, payload: { ...obj, id: contentRef.id } };
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updateCourse = async (data = {}, disableUpdatedTimestamp) => {
  try {
    const { obj, files } = extractFileInObject(data);

    const { published, id, timestamp, updatedTimestamp, ...other } = obj;

    // Add to courses
    const docRef = doc(db, "courses", published);
    const docPayload = {
      ...other,
      thumbnail: obj?.thumbnail || DEFAULT_CONTENT_THUMBNAIL,
    };
    const docRes = await updateDoc(docRef, cleanObject(docPayload));

    const _allDocs = obj?.curriculum?.flatMap?.((n) => n.documents);

    //searchable term
    let _searchTerm = generateCourseSearchTerm(obj);

    // new content
    const contentRef = doc(db, "content", id);
    const contentPayload = {
      private: !!obj?.private,
      filters: {
        brand: obj?.brand || "none",
        searchTerm: _searchTerm,
        category: obj?.category || "",
        level: obj?.level || "",
      },
      metadata: {
        level: obj?.level || "",
        title: obj?.title || "",
        brand: obj?.brand || "",
        shortDescription: obj?.shortDescription || "",
        category: obj?.category || "",
        duration: obj?.duration || "",
        allDocuments: _allDocs || [],
        thumbnail: obj?.thumbnail || DEFAULT_CONTENT_THUMBNAIL,
      },
    };

    const contentRes = await updateDoc(contentRef, {
      ...cleanObject(contentPayload),
      ...(disableUpdatedTimestamp
        ? {}
        : { updatedTimestamp: serverTimestamp() }),
    });

    // Upload files
    if (files && Object.keys(files)) {
      for await (const [key, value] of Object.entries(files)) {
        const extension = value?.name?.split(".")?.[1];

        await uploadFile(
          `/content/${contentRef.id}/${key}.${extension}`,
          value
        ).then(async (res) => {
          if (res?.success) {
            await updateDoc(docRef, { [key]: res?.metadata?.downloadURL });
            await updateDoc(
              contentRef,
              {
                [`metadata.${key}`]: res?.metadata?.downloadURL,
              },
              { merge: true }
            );
          }
        });
      }
    }

    return { success: true, payload: { ...obj, id: contentRef.id } };
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

      const docRef = await doc(db, "courses", contentData.published);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const docObj = {
          ...(seperate
            ? {
                document: {
                  ...docSnap.data(),
                  timestamp:
                    contentData.timestamp?.toDate?.()?.toString() ||
                    contentData.timestamp,
                  updatedTimestamp:
                    contentData.updatedTimestamp?.toDate?.()?.toString() ||
                    contentData.updatedTimestamp,
                },
              }
            : docSnap.data()),
          ...contentData,
          timestamp:
            contentData.timestamp?.toDate?.()?.toString() ||
            contentData.timestamp,
          updatedTimestamp:
            contentData.updatedTimestamp?.toDate?.()?.toString() ||
            contentData.updatedTimestamp,
        };

        return cleanObject(docObj) || {};
      }
    }
  } catch (error) {
    console.log("cid", cid, "No such course!", error);
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
