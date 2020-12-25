import { useState, useEffect } from 'react';
import { portfolioFirestore } from '../config/config';


const useFireStoreToGet = (collection) => {
  const [docs, setDocs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = portfolioFirestore.collection(collection)
    .orderBy('createdAt', 'desc')
    .onSnapshot((snap) => {
        if (navigator.onLine){
          const documents = [];
          snap.forEach((doc) => {
            documents.push({...doc.data(), id: doc.id})
          })
          setDocs(documents);
        }else {
          const err =new Error(`Couldn't get ${collection} because you are not connected to the internet`)
          setError(err.message);
        }
      }, err => {
        setError(err.message);
      }
    )
    return unsubscribe;
  }, [collection])

  return { docs, error }
}

export default useFireStoreToGet;

