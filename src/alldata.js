import React, { useContext } from 'react';
import MyContext from './Mycontext';
import styles from "./App.module.css";

const AllData = () => {
  const ctx = useContext(MyContext);

  const isAdmin = () => {
    return ctx.currentUser.some(user => user.email === "admin" && user.password === "admin");
  };

  const filterAdminUser = () => {
    return ctx.users.filter(user => user.email !== "admin" || user.password !== "admin");
  };

  return (
    <div className={styles.all}>
      {isAdmin() ? (
        <>
          <h1>ALL Data</h1>
          <div className={styles.userDetailsContainer}>
            {filterAdminUser().map((user, i) => (
              <div key={i} className={`${styles.userDetails} ${styles.bouncy}`}>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Balance:</strong> {user.balance}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <h1>Access Denied: Only admin can access this page</h1>
      )}
    </div>
  );
};

export default AllData;
