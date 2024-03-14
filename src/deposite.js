import React, { useState, useContext } from "react";
import styles from './App.module.css';
import MyContext from "./Mycontext";

export default function Deposite1() {
    const [amount, setAmount] = useState("");
    const [error, setError] = useState('');
    const ctx = useContext(MyContext);

    const handleTransactions = (e) => {
        e.preventDefault();

        if (ctx.currentUser.length === 0) {
            alert("You are not logged in.");
            return;
        }

        if (!amount) { 
            alert("Please enter the amount.");
            return;
        }

        const amountValue = Number(amount);
        if (amountValue <= 0 || isNaN(amountValue)) { 
            alert("Please enter a valid amount.");
            return;
        }

        const index = ctx.users.findIndex(user => user.email === ctx.currentUser[0].email);
        const userBalance = ctx.users[index].balance;
        const newBalance = userBalance + amountValue;

        ctx.users[index].balance = newBalance;
        setAmount("");
        setError(`Successfully deposited $${amountValue}. Current balance: $${newBalance}`);
    };

    return (
        <>
            <div className={styles.withdraw}>
                <div className={styles['balance-message']}>Account Balance: ${ctx.currentUser.length > 0 ? ctx.currentUser[0].balance : 0}</div>
                <input
                    className={styles.input}
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                />
                <button className={styles.btn} type="submit" onClick={(e) => handleTransactions(e)}>Deposit</button>
            </div>
            <div className={styles.withdraws}>
                <p className={styles['error-message']}>{error}</p>
            </div>
        </>
    )
}
