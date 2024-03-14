import './app.css'; 
import MyContext from './Mycontext';
import Navbar from './navbar';
import Deposite1 from './deposite';
import Footer from './footer';
import Withdraw from './withdraw';
import { Route, Routes, HashRouter, Navigate } from "react-router-dom";
import SignUpForm from './home';
import AllData from './alldata';
import Login from './login';
import CreateAccount from './createaccount';
import UserDetails from './userdetails';

export default function banking() {
  return (
    <>
      <HashRouter>
        <Navbar />
        <MyContext.Provider value={{
          users: [{
            name: "msccs",
            email: "admin",
            password: "admin",
            balance: 0
          }, {
            name: "suresh",
            email: "suresh@gmail.com",
            password: "1234",
            balance: 2000
          }],
          currentUser: []
        }}>
          <Routes>
            <Route path='/' element={<SignUpForm />} />
            <Route path='/createaccount' element={<CreateAccount />} />
            <Route path='/deposit' element={<Deposite1 />} />
            <Route path='/withdraw' element={<Withdraw />} />
            <Route path='/alldata' element={<AllData />} />
            <Route path='/login' element={<Login />} />
            <Route path='/*' element={<Navigate to="/" />} /> 
            <Route path="/userdetails" element={<UserDetails />}/>
          </Routes>
        </MyContext.Provider>
        <Footer />
      </HashRouter>
    </>
  )
}
