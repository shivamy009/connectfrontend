import React, { useContext, useState } from 'react';
import axios from 'axios';
import {Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { storeInsession } from '../common/Session';
import { UserContext } from '../App';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  let {userAuth:{access_token},setUserAuth}=useContext(UserContext)

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let loadingToast=toast.loading("Please  wait...")
   //  try {

   //      if(!username || !password){
   //          toast.dismiss(loadingToast)
   //          toast.error("Please fill all field")

   //          return;
   //      }
   //    let res=  await axios.post(import.meta.env.VITE_SERVER_DOMAIN+'/login',{  username:username,
   //      password:password
   //    }
   //    )
   // let {data}=res;
   // console.log(data)
   // storeInsession("user",JSON.stringify(data.sendData))
   //       setUserAuth(data.sendData)
   // console.log(data.message)
   // if(data?.success){
   //     toast.dismiss(loadingToast)
   //     navigate('/dashboard')
   //    return toast.success(data?.message)
   //  //    return
   // }
   
      
   //  } catch (err) {
   //      console.log(err)
   //      // let {data}=err;
   //      toast.dismiss(loadingToast)
   //      setError('Failed to register. Please try again.');
   //     return toast.error(err.response.data.message)
   //      // console.log(err.response.data.message)
   //  //   return;
   //  }
    await axios.post(import.meta.env.VITE_SERVER_DOMAIN+'/login',{
    username:username,
    // email:formData.email,
    password:password
    // formData,
   }).then(({data})=>{
    // console.log(data.sendData)
    storeInsession("user",JSON.stringify(data.sendData))
    setUserAuth(data.sendData)
    toast.dismiss(loadingToast)
    toast.success(data.message)
    // console.log(sessionStorage)
    
   })
   .catch(({response})=>{
    // console.log(response)
    toast.dismiss(loadingToast)
    return toast.error(response.data.message)
   })
  };

  return (
    access_token ? navigate('/')
    :
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <Toaster/>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="username">Username</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              type="text"
              id="username"
              placeholder='Enter username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              type="password"
              id="password"
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            className="w-full bg-teal-500 hover:bg-teal-700 text-white py-2 px-4 rounded"
            type="submit"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account? <Link to="/signup" className="text-teal-500">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
