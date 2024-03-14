import React, { useState } from 'react';

const usersData = [
  { id: 1, username: 'admin', password: 'adminpassword', name: 'Admin', isAdmin: true },
  { id: 2, username: 'user1', password: 'password1', name: 'User One', balance: 100 },
  { id: 3, username: 'user2', password: 'password2', name: 'User Two', balance: 200 },
  // Add more users as needed
];



  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newUser = { id: usersData.length + 1, username, password, name, balance: 0 };
    onCreateAccount(newUser);
    setUsername('');
    setPassword('');
    setName('');
  };

  return (
    <div>
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = usersData.find(u => u.username === username && u.password === password);
    if (user) {
      onLogin(user);
      setError('');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

const AdminDashboard = ({ users }) => {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Name</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.name}</td>
              <td>{user.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const UserDashboard = ({ user }) => {
  return (
    <div>
      <h2>User Dashboard</h2>
      <p>Welcome, {user.name}!</p>
      <p>Your balance: {user.balance}</p>
    </div>
  );
};

const App1 = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState(usersData);

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleCreateAccount = (newUser) => {
    setUsers([...users, newUser]);
  };

  return (
    <div>
      {!currentUser ? (
        <>
          <LoginForm onLogin={handleLogin} />
          <CreateAccountForm onCreateAccount={handleCreateAccount} />
        </>
      ) : (
        currentUser.isAdmin ? (
          <AdminDashboard users={users} />
        ) : (
          <UserDashboard user={currentUser} />
        )
      )}
    </div>
  );
};

export default App1;
