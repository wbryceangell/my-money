import { useState } from "react";
import { auth } from "../firebase/config";

export const useSignup = () => {
  const [error, setError] = useState<Error>();
  const [isPending, setIsPending] = useState(false);
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
    } catch (e) {
      setError(e as Error);
    } finally {
      setIsPending(false);
    }
  };

  return { error, isPending, signup };
};
