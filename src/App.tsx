import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import { Book } from './components/book/Book';
import { BrowserRouter, Route, Routes } from 'react-router';
import { Staff } from './components/staff/Staff';
import { Member } from './components/member/Member';
import { Lending } from './components/lending/Lending';
import { SignIn } from './components/auth/SignIn';
import { SignUp } from './components/auth/SignUp';
import { AuthProvider } from './components/auth/AuthProvider';


function App() {
  return (
    <>
      <BrowserRouter>
      <AuthProvider>
        <NavBar/>
          <Routes>
             <Route path="/" element={<Book/>}/>
             <Route path="/book" element={<Book/>}/>
             <Route path="/staff" element={<Staff/>}/>
             <Route path="/members" element={<Member/>}/>
             <Route path="/lending" element={<Lending/>}/>
             <Route path="/signin" element={<SignIn/>}/>
             <Route path="/signup" element={<SignUp/>}/>
          </Routes>
          </AuthProvider>
      </BrowserRouter>
      </>
   
  );
}

export default App;
