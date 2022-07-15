import { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState<Error>();
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  const signup = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    !isCancelled && setError(undefined);
    !isCancelled && setIsPending(true);
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      if (!userCredential.user) throw new Error("Could not complete signup");
      await userCredential.user.updateProfile({ displayName });
      dispatch({ type: "LOGIN", payload: userCredential.user });
    } catch (e) {
      !isCancelled && setError(e as Error);
    } finally {
      !isCancelled && setIsPending(false);
    }
  };

  useEffect(() => () => setIsCancelled(true), []);
  return { error, isPending, signup };
};
