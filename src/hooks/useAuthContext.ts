import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context || !context.dispatch)
    throw new Error("useAuthContext must be inside an AuthProvider");
  return context as typeof context & { dispatch: typeof context.dispatch };
};
