import styles from "./TransactionList.module.css";
import { TransactionData } from "../../../types";

type Props = {
  transactions: Array<TransactionData>;
};

const TransactionList: React.FC<Props> = ({ transactions }) => {
  const { transactionList, name, amount } = styles;
  return <ul className={transactionList}>
	{transactions.map((transaction) => (
		<li key={transaction.id}>
			<p className={name}>{transaction.name}</p>
			<p className={amount}>${transaction.amount}</p>
		</li>
	))}
  </ul>;
};

export default TransactionList;
