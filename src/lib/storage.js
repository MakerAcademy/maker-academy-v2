import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";

const storage = getStorage();

export const uploadFile = async (_ref, file) => {
  // console.log(_ref, file);
  try {
    if (file && _ref) {
      const storageRef = ref(storage, _ref);
      const uploadTask = uploadBytesResumable(storageRef, file);

      //Get percentage of upload
      uploadTask.on("state_changed", (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Uploading: ", progress);
      });

      let metadata = {};
      //Get back url after upload
      await uploadTask.then(async (snapshot) => {
        //Remove metadata null/undefined values
        metadata = Object.entries(snapshot.metadata).reduce(
          (a, [k, v]) => (v ? ((a[k] = v), a) : a),
          {}
        );

        await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          metadata = { ...metadata, downloadURL };
        });
      });

      return { success: true, metadata };

      // // 'file' comes from the Blob or File API
      // uploadBytes(storageRef, file).then((snapshot) => {
      //   console.log("Uploaded a blob or file!");
      // });
    }
  } catch (error) {
    console.log(123, error);
  }
};

export const getStorageDownloadUrl = async (_ref) => {
  try {
    console.log(_ref);
    const _url = await getDownloadURL(ref(storage, _ref));
    return _url;
  } catch (error) {
    console.log(error);
  }
};
