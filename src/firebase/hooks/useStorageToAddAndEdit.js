import { useState, useEffect } from 'react';
import { portfolioFirestore, portfolioStorage, timestamp } from '../config/config';

const useStorageToAddAndEdit = (project, image, action, actionProjectId) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    // storage reference
    const storageRef = portfolioStorage.ref();
    // firestore reference
    const firestoreRef = portfolioFirestore.collection('projects');

    // image reference
    const imageRef = storageRef.child(project.title);
    
    if (image === null) {
      // if image is not available then it is an edit action w/o an image
      const createdAt = timestamp();
      // go ahead to firestore and edit
      firestoreRef.doc(actionProjectId).update({ project, createdAt })
      // set the progress to 100
      setProgress(100);
    }else {
      // upload image 
      imageRef.put(image).on('state_changed', snap => {
        // get the percentage
        let percent = (snap.bytesTransferred / snap.totalBytes) * 100;
        // set the percentage
        setProgress(percent);
      }, err => {
        // if there's an error
        setError(err)
      }, async () => {
        // when the upload is done
        // get the image url
        const url = await imageRef.getDownloadURL();
        // get the timestamp
        const createdAt = timestamp();

        if (action === 'add') {
          // and add to firestore
          firestoreRef.add({ url, project, createdAt })
        }else {
          // or it's a edit action
          firestoreRef.doc(actionProjectId).update({ url, project, createdAt })
        }
      })
     
    }
  }, [image, action, actionProjectId, project])

  return { progress, error };
}

export default useStorageToAddAndEdit;