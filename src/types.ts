import type firebase from "firebase";

export type TransactionData = {
  id: string;
  uid: string;
  createdAt: firebase.firestore.Timestamp;
  name: string;
  amount: string;
};
