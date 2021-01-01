import { useState, useEffect } from "react";
import { portfolioFirestore } from "../config/config";

const useFireStoreToGetDatum = (collection, email) => {
  const [doc, setDoc] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = portfolioFirestore
      .collection(collection)
      .doc(email)
      .onSnapshot(
        (snap) => {
          if (navigator.onLine) {
            setDoc(snap.data());
          } else {
            const err = new Error(
              `Couldn't get ${collection} because you are not connected to the internet`
            );
            setError(err.message);
          }
        },
        (err) => {
          setError(err.message);
          console.log(err);
        }
      );
    return unsubscribe;
  }, [collection, email]);

  return { doc, error };
};

export default useFireStoreToGetDatum;
