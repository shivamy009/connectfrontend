import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { UserContext } from '../App';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  let {userAuth:{access_token},setUserAuth}=useContext(UserContext)

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let loadingToast=toast.loading("Please  wait...")
    try {

        if(!username || !password){
            toast.dismiss(loadingToast)
            toast.error("Please fill all field")

            return;
        }
      let res=  await axios.post(import.meta.env.VITE_SERVER_DOMAIN+'/signup',{  username:username,
        password:password
      }
      )
   let {data}=res;
   console.log(data)
   console.log(data.message)
   if(data?.success){
       toast.dismiss(loadingToast)
       navigate('/login')
      return toast.success(data?.message)
    //    return
   }
   
      
    } catch (err) {
        console.log(err)
        // let {data}=err;
        toast.dismiss(loadingToast)
        toast.error(err.response.data.message)
        // console.log(err.response.data.message)
      setError('Failed to register. Please try again.');
    //   return;
    }
  };

  return (
  access_token ? navigate('/')
  :
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <Toaster/>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="username">Username</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              type="text"
                  placeholder='Enter username'
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder='Enter password'
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            className="w-full bg-teal-500 hover:bg-teal-700 text-white py-2 px-4 rounded"
            type="submit"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account? <a href="/login" className="text-teal-500">Login</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
