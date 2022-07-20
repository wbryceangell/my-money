import { useEffect, useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";

type Props = {
  uid: string;
};

const TransactionForm: React.FC<Props> = ({ uid }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const {
    addDocument,
    state: { success },
  } = useFirestore("transactions");

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    addDocument({ uid, name, amount });
  };

  useEffect(() => {
    if (!success) return;
    setName("");
    setAmount("");
  }, [success]);

  return (
    <>
      <h3>Add a Transaction</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Transaction name:</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          <span>Amount ($):</span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </label>
        <button>Add Transaction</button>
      </form>
    </>
  );
};

export default TransactionForm;
