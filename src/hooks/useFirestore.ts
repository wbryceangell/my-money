import React, { Reducer, useEffect, useReducer, useState } from "react";
import { firestore } from "../firebase/config";

type State = {
  document: firebase.default.firestore.DocumentReference | null;
  error: Error | null;
  isPending: boolean;
  success: boolean;
};
type ActionType = "IS_PENDING" | "ADDED_DOCUMENT" | "ERROR";
type Action = { type: ActionType; payload?: any };

const reducer: Reducer<State, Action> = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "IS_PENDING":
      return {
        isPending: true,
        document: null,
        success: false,
        error: null,
      };
    case "ADDED_DOCUMENT":
      return {
        isPending: false,
        error: null,
        success: true,
        document: payload,
      };
    case "ERROR":
      return {
        isPending: false,
        document: null,
        success: false,
        error: payload,
      };
    default:
      return state;
  }
};

const initialState: State = {
  document: null,
  error: null,
  isPending: false,
  success: false,
};

export const useFirestore = (collectionPath: string) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);
  const collectionRef = firestore.collection(collectionPath);

  const dispatchIfNotCancelled: React.Dispatch<Action> = (action) =>
    !isCancelled && dispatch(action);

  const addDocument = async (
    documentData: firebase.default.firestore.DocumentData
  ) => {
    dispatchIfNotCancelled({ type: "IS_PENDING" });
    try {
      const documentRef = await collectionRef.add(documentData);
      dispatchIfNotCancelled({ type: "ADDED_DOCUMENT", payload: documentRef });
    } catch (e) {
      dispatchIfNotCancelled({ type: "ERROR", payload: e });
    }
  };

  const deleteDocument = async (id: string) => {};

  useEffect(() => () => setIsCancelled(true), []);
  return { addDocument, deleteDocument, state };
};
