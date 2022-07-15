import { useState, useEffect } from "react";
import { auth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState<Error>();
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  const login = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    !isCancelled && setError(undefined);
    !isCancelled && setIsPending(true);
    try {
      const userCredential = await auth.signInWithEmailAndPassword(
        email,
        password
      );
      if (!userCredential.user) throw new Error("Could not complete login");
      await userCredential.user.updateProfile({ displayName });
      dispatch({ type: "LOGIN", payload: userCredential.user });
    } catch (e) {
      !isCancelled && setError(e as Error);
    } finally {
      !isCancelled && setIsPending(false);
    }
  };

  useEffect(() => () => setIsCancelled(true), []);
  return { error, isPending, login };
};
