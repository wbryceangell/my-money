export type TransactionData = {
  uid: string;
  createdAt: firebase.default.firestore.Timestamp;
  name: string;
  amount: string;
};
