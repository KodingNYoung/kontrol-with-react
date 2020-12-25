import { useState, useEffect } from 'react';
import { portfolioFirestore } from '../config/config';


const useFireStoreToDelete = (itemId, collection) => {
  // const [docs, setDocs] = useState([]);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    portfolioFirestore.collection(collection).doc(itemId).delete()
    .then(() => {
      setDone(true)
    })
    .catch((err) => {
      setError(err)
    })
    
  }, [collection, itemId])

  return { done, error }
}

export default useFireStoreToDelete;

