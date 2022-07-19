import React, { createContext, Reducer, useEffect, useReducer } from "react";
import { auth } from "../firebase/config";

type Context<State, Action> = State & { dispatch?: React.Dispatch<Action> };
type State = { user: firebase.default.User | null; authIsReady: boolean };
type ActionType = "LOGIN" | "LOGOUT" | "AUTH_IS_READY";
type Action = { type: ActionType; payload?: any };

const authReducer: Reducer<State, Action> = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "LOGIN":
      return { ...state, user: payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "AUTH_IS_READY":
      return { ...state, user: payload, authIsReady: true };
    default:
      return state;
  }
};

const initialState: State = { user: null, authIsReady: false };
export const AuthContext = createContext<Context<State, Action>>(initialState);
export const AuthProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      dispatch({ type: "AUTH_IS_READY", payload: user });
      unsub();
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
