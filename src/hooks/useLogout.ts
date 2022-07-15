import { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState<Error>();
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  const logout = async () => {
    !isCancelled && setError(undefined);
    !isCancelled && setIsPending(true);
    try {
      await auth.signOut();
      dispatch({ type: "LOGOUT" });
    } catch (e) {
      !isCancelled && setError(e as Error);
    } finally {
      !isCancelled && setIsPending(false);
    }
  };

  useEffect(() => () => setIsCancelled(true), []);
  return { error, isPending, logout };
};
