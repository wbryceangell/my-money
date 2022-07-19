import styles from "./Home.module.css";
import TransactionForm from "./TransactionForm";

const Home: React.FC = () => {
  const { container, content, sidebar } = styles;
  return (
    <div className={container}>
      <div className={content}>transaction list</div>
      <div className={sidebar}>
        <TransactionForm />
      </div>
    </div>
  );
};

export default Home;
