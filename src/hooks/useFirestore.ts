import { Reducer, useEffect, useReducer, useState } from "react";
import { firestore } from "../firebase/config";

type State = {
  document: firebase.default.firestore.DocumentData | null;
  error: Error | null;
  isPending: boolean;
  success: boolean | null;
};
type ActionType = "";
type Action = { type: ActionType; payload?: any };

const reducer: Reducer<State, Action> = (state, action) => {
  const { type } = action;
  switch (type) {
    default:
      return state;
  }
};

const initialState: State = {
  document: null,
  error: null,
  isPending: false,
  success: null,
};

export const useFirestore = (collection: string) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);
  const collectionRef = firestore.collection(collection);
  collectionRef;
  const addDocument = (document: firebase.default.firestore.DocumentData) => {};
  const deleteDocument = (id: string) => {};

  useEffect(() => () => setIsCancelled(true), []);
  return { addDocument, deleteDocument, state };
};
