import React, { createContext, Reducer, useReducer } from "react";

type Context<State, Action> = State & { dispatch?: React.Dispatch<Action> };
type State = { user?: firebase.default.User };
type ActionType = "LOGIN" | "LOGOUT";
type Action = { type: ActionType; payload?: any };

const authReducer: Reducer<State, Action> = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "LOGIN":
      return { ...state, user: payload };
    case "LOGOUT":
      return { ...state, user: undefined };
    default:
      return state;
  }
};

export const AuthContext = createContext<Context<State, Action>>({});
export const AuthProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, {});
  console.log(state);
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
