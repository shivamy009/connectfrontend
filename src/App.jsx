import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { lookInSession } from './common/Session';
// import SignUp from './components/SignUp';
// import Login from './components/Login';
// import Dashboard from './components/Dashboard';
export const UserContext=createContext({})

function App() {
  const [userAuth,setUserAuth]=useState({})
  // const [theme,setTheme]=useState('light')
  useEffect(()=>{
     let userInSession=lookInSession("user")
    //  let themeInsession=lookInSession("theme")

     userInSession ? setUserAuth(JSON.parse(userInSession)): setUserAuth({access_token:null})

    //  console.log(userAuth)
    // if(themeInsession){
    //   setTheme(()=>{
    //     document.body.setAttribute('data-theme',themeInsession)
    //     return themeInsession

    //   })
    // }else{

    //   document.body.setAttribute('data-theme',theme)
    // }
  },[])
  console.log(userAuth)
  return (
    // <Router>
    <div>
      <UserContext.Provider value={{userAuth,setUserAuth}}> 
        <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    {/* // </Router> */}
      </UserContext.Provider>
    </div>
  );
}

export default App;
