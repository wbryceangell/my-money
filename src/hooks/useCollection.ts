import type firebase from "firebase";
import { useEffect, useRef, useState } from "react";
import { firestore } from "../firebase/config";

export const useCollection = (
  collection: string,
  _orderBy?: [
    string | firebase.firestore.FieldPath,
    firebase.firestore.OrderByDirection
  ],
  _query?: [
    string | firebase.firestore.FieldPath,
    firebase.firestore.WhereFilterOp,
    any
  ]
) => {
  const [documents, setDocuments] = useState<Array<any> | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const orderBy = useRef(_orderBy).current;
  const query = useRef(_query).current;

  useEffect(() => {
    let collectionRef = firestore.collection(collection);

    if (orderBy)
      collectionRef = collectionRef.orderBy(
        ...orderBy
      ) as firebase.firestore.CollectionReference;

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
