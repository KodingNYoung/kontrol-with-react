import { useEffect } from 'react';
import { portfolioFirestore } from '../config/config';

const useFirestoreToEdit = (actionItemId, collection, updateObject) => {
  useEffect(() => {
    // firestore reference
    const firestoreRef = portfolioFirestore.collection(collection);

    // go ahead to firestore and edit
    firestoreRef.doc(actionItemId).update(updateObject)
  
  }, [actionItemId, collection, updateObject])

  return
}

export default useFirestoreToEdit;