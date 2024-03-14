import React, { useState, useContext } from "react";
import styles from './App.module.css';
import MyContext from "./Mycontext";

export default function Withdraw() {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const ctx = useContext(MyContext);
  const currentUser = ctx.currentUser[0];

  if (!currentUser) {
    alert("Please login to make a withdrawal.");
    return null; 
  }

  const index = ctx.users.findIndex(user => user.email === currentUser.email);
  const userBalance = currentUser.balance;

  const handleTransactions = (e) => {
    e.preventDefault();

    if (isNaN(amount) || amount <= 0) {
      setError("Please enter a valid amount to withdraw");
      return;
    }

    if (amount > userBalance) {
      setError(`Insufficient balance. Your balance is ${userBalance}`);
      return;
    }

    const newBalance = userBalance - Number(amount);
    ctx.users[index].balance = newBalance;
    setError(`Successfully withdrew ${amount}. Your new balance is $${newBalance}`);
    setAmount("");
  };

  return (
    <>
      <div className={styles.withdraw}>
        <div className={styles['balance-message']} >Account Balance: ${userBalance}</div>
        <input
          className={styles.input}
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
        />
        <button className={styles.btn} type="submit" onClick={handleTransactions}>
          Withdraw
        </button>
      </div>
      <div className={styles.withdraws}>
        <p>{error}</p>
      </div>
    </>
  );
}
