import type firebase from "firebase";
import { useEffect, useRef, useState } from "react";
import { firestore } from "../firebase/config";

export const useCollection = (
  collection: string,
  _query?: [
    string | firebase.firestore.FieldPath,
    firebase.firestore.WhereFilterOp,
    any
  ]
) => {
  const [documents, setDocuments] = useState<Array<any> | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const query = useRef(_query).current;

  useEffect(() => {
    let collectionRef = firestore.collection(collection);
    if (query)
      collectionRef = collectionRef.where(
        ...query
      ) as firebase.firestore.CollectionReference;
    return collectionRef.onSnapshot(
      (snapshot) => {
        const documents: Array<any> = [];
        snapshot.docs.forEach((doc) =>
          documents.push({ id: doc.id, ...doc.data() })
        );
        setDocuments(documents);
        setError(null);
      },
      (error) => setError(error)
    );
  }, [collection, query]);

  return { documents, error };
};
