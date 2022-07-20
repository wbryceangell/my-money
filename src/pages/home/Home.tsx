import type firebase from "firebase";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";
import styles from "./Home.module.css";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";

const Home: React.FC = () => {
  const { container, content, sidebar } = styles;
  const { user } = useAuthContext();
  const { documents, error } = useCollection(
    "transactions",
    ["createdAt", "desc"],
    ["uid", "==", (user as firebase.User).uid]
  );

  return (
    <div className={container}>
      <div className={content}>
        {error && <p>{error.message}</p>}
        {documents && <TransactionList transactions={documents} />}
      </div>
      <div className={sidebar}>
        <TransactionForm uid={(user as firebase.User).uid} />
      </div>
    </div>
  );
};

export default Home;
