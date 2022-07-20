import { useAuthContext } from "../../hooks/useAuthContext";
import styles from "./Home.module.css";
import TransactionForm from "./TransactionForm";

const Home: React.FC = () => {
  const { container, content, sidebar } = styles;
  const { user } = useAuthContext();
  return (
    <div className={container}>
      <div className={content}>transaction list</div>
      <div className={sidebar}>
        <TransactionForm uid={(user as firebase.default.User).uid} />
      </div>
    </div>
  );
};

export default Home;
