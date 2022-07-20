export type TransactionData = {
  id: string;
  uid: string;
  createdAt: firebase.default.firestore.Timestamp;
  name: string;
  amount: string;
};
