import { useState } from "react";
import { auth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState<Error>();
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  const signup = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    setError(undefined);
    setIsPending(true);
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      if (!userCredential.user) throw new Error("Could not complete signup");
      await userCredential.user.updateProfile({ displayName });
      dispatch({ type: "LOGIN", payload: userCredential.user });
    } catch (e) {
      setError(e as Error);
    } finally {
      setIsPending(false);
    }
  };

  return { error, isPending, signup };
};
