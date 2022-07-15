import { useState } from "react";
import { auth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const [error, setError] = useState<Error>();
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  const logout = async () => {
    setError(undefined);
    setIsPending(true);
    try {
      await auth.signOut();
      dispatch({ type: "LOGOUT" });
    } catch (e) {
      setError(e as Error);
    } finally {
      setIsPending(false);
    }
  };

  return { error, isPending, logout };
};
