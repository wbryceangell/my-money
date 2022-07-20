import { useEffect, useState } from "react";
import { firestore } from "../firebase/config";

export const useCollection = (collection: string) => {
  const [documents, setDocuments] = useState<Array<any> | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    return firestore.collection(collection).onSnapshot(
      (snapshot) => {
        const documents: Array<any> = [];
        snapshot.docs.forEach(({ id, data }) =>
          documents.push({ id, ...data() })
        );
        setDocuments(documents);
        setError(null);
      },
      (error) => setError(error)
    );
  }, [collection]);

  return { documents, error };
};
