import React, { useContext } from 'react';
import { UserContext } from '../App';
import { Link, useNavigate } from 'react-router-dom';
import { removeFromSession } from '../common/Session';

const Navbar = () => {
    const navigate=useNavigate();
    let {userAuth:{access_token},setUserAuth}=useContext(UserContext)
    const signOut=()=>{
        removeFromSession("user");
        setUserAuth({access_token:null})
        navigate('/login')
       }
  return (
    <nav className="bg-white border-b-2 border-gray-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex justify-center items-center space-x-4 w-full">
            <Link to="/" className="text-blue-500 font-bold text-center">Connect App</Link>
            {/* <a href="/features" className="hover:text-gray-700">Features</a>
            <a href="/pricing" className="hover:text-gray-700">Pricing</a> */}
          </div>
          {
            access_token ?
          <div className="flex mr-[40px] ">
             {/* <a href="/login" className="hover:text-gray-700 mr-[30px]">Login</a> */}
            <Link to={'/dashboard'} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-4 rounded mr-7">Dashboard</Link>
            <button onClick={signOut} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-4 rounded">Logout</button>
          </div>
          
          :<Link to={'/login'} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-4 rounded">Login</Link>
          }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
