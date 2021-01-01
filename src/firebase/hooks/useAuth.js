import { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";

export const useAuthToAddAdmin = (email, password) => {
  const [done, setDone] = useState(false);
  const [error, setError] = useState(null);

  const { createAdmin } = useAuthContext();

  useEffect(() => {
    createAdmin(email, password)
      .then(setDone(true))
      .catch((err) => {
        setError(`Failed to add admin because ${err.message}`);
        setDone(true);
      });
  }, [email, password, createAdmin]);

  return { done, error };
};
