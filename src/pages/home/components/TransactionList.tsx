import styles from "./TransactionList.module.css";
import { TransactionData } from "../../../types";
import { useFirestore } from "../../../hooks/useFirestore";

type Props = {
  transactions: Array<TransactionData>;
};

const TransactionList: React.FC<Props> = ({ transactions }) => {
  const { transactionList, name, amount } = styles;
  const { deleteDocument } = useFirestore("transactions");

  return (
    <ul className={transactionList}>
      {transactions.map((transaction) => (
        <li key={transaction.id}>
          <p className={name}>{transaction.name}</p>
          <p className={amount}>${transaction.amount}</p>
          <button onClick={() => deleteDocument(transaction.id)}>x</button>
        </li>
      ))}
    </ul>
  );
};

export default TransactionList;
