import React from "react";
import { SimulatedTransaction } from "../../types/portfolio";


interface Props {
  transactions: SimulatedTransaction[];
}

const TransactionList: React.FC<Props> = ({ transactions }) => {
  return (
    <>
      <h3 className="section-heading">Simulated Transactions</h3>
      {transactions.length === 0 && <p>No simulated transactions yet.</p>}
      <ul className="space-y-2">
        {transactions.map((tx) => (
          <li key={tx.id} className="border p-2 rounded">
            <p className="text-gray-800">{tx.description}</p>
            <p className="text-gray-500 text-sm">
              Hash: {tx.txHash.slice(0, 6)}…{tx.txHash.slice(-4)} |{" "}
              {new Date(tx.timestamp).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TransactionList;