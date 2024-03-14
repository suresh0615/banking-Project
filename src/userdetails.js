import { useContext, useEffect, useState } from 'react';
import MyContext from './Mycontext';
import styles from './App.module.css';

const UserDetails = () => {
  const ctx = useContext(MyContext);
  const [showDetails, setShowDetails] = useState(true); 

  const getCurrentUserDetails = () => {
    const currentUser = ctx.users.find(user => user.email === ctx.currentUser[0].email);
    return currentUser;
  };

  const logout = (e) => {
    e.preventDefault();
    ctx.currentUser.pop(); 
    alert('Logged out');
    console.log('After delete:', ctx.currentUser);
    setShowDetails(false); 
  };

  useEffect(() => {
    console.log('Users:', ctx.users);
    console.log('Current User:', ctx.currentUser);
  }, [ctx.users, ctx.currentUser]);

  return (
    <div className={showDetails ? styles.userDetails : styles.hidden}>
      <h1>User Details</h1>
      {ctx.currentUser.length > 0 && (
        <div>
          <p>Name: {getCurrentUserDetails().name}</p>
          <p>Email: {getCurrentUserDetails().email}</p>
          <p>Balance: {getCurrentUserDetails().balance}</p>
          <button id="logout" onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
