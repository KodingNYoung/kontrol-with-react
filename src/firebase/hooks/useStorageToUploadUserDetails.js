import { useState, useEffect } from "react";
import { portfolioFirestore, portfolioStorage } from "../config/config";

const useStorageToUploadUserDetails = ({ resume, avatar }, userdetails) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [done, setDone] = useState(false);

  const handleFilesUploadAdPromise = (files, storageRef) => {
    const promises = [];

    for (const file in files) {
      promises.push(
        new Promise((resolve, reject) => {
          if (file === null) {
            reject(`no ${file} seen`);
          } else {
            const fileRef = storageRef.child(file);

            fileRef.put(files[file]).on(
              "state_changed",
              (snap) => {
                // get the percentage
                let percent = (snap.bytesTransferred / snap.totalBytes) * 100;
                // set the percentage
                setProgress(percent);
              },
              (error) => {
                reject(error);
              },
              async () => {
                const url = await fileRef.getDownloadURL();

                setProgress(0);

                resolve({ [`${file}_link`]: url });
              }
            );
          }
        })
      );
    }

    return promises;
  };
  const handleFirestoreUpdate = (updateObj, firestoreRef) => {
    firestoreRef.doc("anybody@anywhere.com").update(updateObj);
    setDone(true);
  };
  useEffect(() => {
    const files = { resume, avatar };
    // storage reference
    const storageRef = portfolioStorage.ref();
    // firestore reference
    const firestoreRef = portfolioFirestore.collection("dashboard");

    if (resume || avatar) {
      Promise.all(handleFilesUploadAdPromise(files, storageRef))
        .then((links) => {
          let link_obj = {};

          links.forEach((link) => {
            link_obj = { ...link_obj, ...link };
          });

          return link_obj;
        })
        .then((link_obj) => {
          handleFirestoreUpdate({ ...userdetails, ...link_obj }, firestoreRef);
        })
        .catch((error) => setError(error));
    } else {
      handleFirestoreUpdate(userdetails, firestoreRef);
    }
  }, [resume, avatar, userdetails]);

  return { progress, error, done };
};

export default useStorageToUploadUserDetails;
