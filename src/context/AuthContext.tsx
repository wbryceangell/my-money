import React, { createContext, Reducer, useReducer } from "react";

type Context<State, Action> = Partial<
  State & { dispatch: React.Dispatch<Action> }
>;
type State = {};
type ActionType = "";
type Action = { type: ActionType; payload?: any };

const authReducer: Reducer<State, Action> = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    default:
      return state;
  }
};

export const AuthContext = createContext<Context<State, Action>>({});
export const AuthProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, {});
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
