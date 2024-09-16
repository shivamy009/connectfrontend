import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../App';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { lookInSession } from '../common/Session';
import toast, { Toaster } from 'react-hot-toast';

const Dashboard = () => {
    let {userAuth:{access_token},setUserAuth,userAuth}=useContext(UserContext)
    console.log(userAuth)
    // const access_oken = lookInSession('access_token');
    // console.log(access_oken)
    // console.log(userAuth)
  // ... (your existing state and functions)
  const [userDetails, setUserDetails] = useState({
    name: userAuth.username,
    // email: 'johndoe@example.com',
    // bio: 'This is a sample bio.',
  });
const [searchReasult,setSearchResult]=useState([])
const [friends,setFriends]=useState(null)
const [friendsrequest,setFriendsrequest]=useState([])
const [RecommnedData,setRecommendData]=useState([])
  const navigate=useNavigate()

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async(e) => {
    setSearchTerm(e.target.value);
    e.preventDefault()
    // Implement search logic here
    try{
    let res =await axios.post(import.meta.env.VITE_SERVER_DOMAIN1+'/searchUser',{
        query:searchTerm
    },{
        headers:{
            'authorization': `${access_token}`
          }
    }
)
setSearchResult(res?.data?.users);
console.log(searchReasult)
//    console.log(res)
    }
    catch(err){
console.log(err)
    }
  };
  const Gett = async() => {
    // setSearchTerm(e.target.value);
    // e.preventDefault()
    // Implement search logic here
    try{
    let res =await axios.get(import.meta.env.VITE_SERVER_DOMAIN1+'/getten')
setRecommendData(res?.data?.users);
// console.log(searchReasult)
   console.log(res)
    }
    catch(err){
console.log(err)
    }
  };
  useEffect(()=>{
    Gett()
  },[])
//   Gett()
//   console.log(searchTerm)
//   console.log(searchReasult)
// let flag=true;
// useEffect(() => {
    
    const getFriendsAndRequest = async () => {
        console.log('Access Token:', access_token); // Check token retrieval

      if (!access_token) {
        console.error('Access token is missing');
        return;
      }
      try {
        const res = await axios.post(
          import.meta.env.VITE_SERVER_DOMAIN1 + '/getfriend',
          { query: searchTerm },
          {
            headers: {
              authorization: `${access_token}`,
            },
          }
        );
        setFriends(res?.data?.friends);
        setFriendsrequest(res?.data?.friendRequests);
        console.log('res', res);
      } catch (err) {
        console.log(err);
      }
    };

    // Call the function inside useEffect so that it only runs on mount or when `searchTerm` changes
    // useEffect(()=>{
        if(friends===null){
            getFriendsAndRequest();
            // flag=false;
        }

    // })
//   }, [flag]); 
const sendRequest=async(e)=>{
    let loadingToast=toast.loading("Please  wait...")
    if (!access_token) {
        console.error('Access token is missing');
        toast.dismiss(loadingToast)
        return;
        // console.log(e)

      }
        try{
            const res = await axios.post(
                import.meta.env.VITE_SERVER_DOMAIN1+`/requist/${e}`, { query: searchTerm },
                {
                  headers: {
                    authorization: `${access_token}`,
                  },
                }
              );
            //   getFriendsAndRequest();
            // console.log(res)
            toast.dismiss(loadingToast)
           return toast.success(res.data.msg)
        }
        catch(err){
            console.log(err)
            toast.dismiss(loadingToast)
           return toast.error(err.response.data.msg)
        }
}
const AcceptFriend=async(e)=>{
    let loadingToast=toast.loading("Please  wait...")
    if (!access_token) {
        console.error('Access token is missing');
        toast.dismiss(loadingToast)
        return;
        // console.log(e)

      }
        try{
            const res = await axios.post(
                import.meta.env.VITE_SERVER_DOMAIN1+`/accept/${e}`, { query: searchTerm },
                {
                  headers: {
                    authorization: `${access_token}`,
                  },
                }
              );
              getFriendsAndRequest();
            // console.log(res)
            toast.dismiss(loadingToast)
           return toast.success(res.data.msg)
        }
        catch(err){
            console.log(err)
            toast.dismiss(loadingToast)
           return toast.error(err.response.data.msg)
        }
}
const RejectFriend=async(e)=>{
    let loadingToast=toast.loading("Please  wait...")
    if (!access_token) {
        console.error('Access token is missing');
        toast.dismiss(loadingToast)
        return;
        // console.log(e)

      }
        try{
            const res = await axios.post(
                import.meta.env.VITE_SERVER_DOMAIN1+`/reject/${e}`, { query: searchTerm },
                {
                  headers: {
                    authorization: `${access_token}`,
                  },
                }
              );
              getFriendsAndRequest();
            // console.log(res)
            toast.dismiss(loadingToast)
           return toast.success(res.data.msg)
        }
        catch(err){
            console.log(err)
            toast.dismiss(loadingToast)
           return toast.error(err.response.data.msg)
        }
}
const Unfriend=async(e)=>{
    let loadingToast=toast.loading("Please  wait...")
    if (!access_token) {
        console.error('Access token is missing');
        toast.dismiss(loadingToast)
        return;
        // console.log(e)

      }
        try{
            const res = await axios.delete(
                import.meta.env.VITE_SERVER_DOMAIN1+`/unfriend/${e}`,
                {
                  headers: {
                    authorization: `${access_token}`,
                  },
                }
              );
              getFriendsAndRequest();
            // console.log(res)
            toast.dismiss(loadingToast)
           return toast.success(res.data.message)
        }
        catch(err){
            console.log(err)
            toast.dismiss(loadingToast)
           return toast.error(err.response.data.message)
        }
}


console.log("first",friends)
console.log("sec",friendsrequest)

  return (
    !access_token ? navigate('/login')
    :
    <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-indigo-200 to-purple-500">
        <Toaster/>
      <h1 className="text-3xl font-bold mb-4 text-white">Connect Dashboard</h1>
      <div className="flex flex-col justify-center items-center md:flex-row space-x-5 space-y-4">
        <div className="w-full sm:w-full xl:w-1/2 lg:w-2/5 lg:flex lg:flex-col bg-white rounded-lg p-4 shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-purple-700">User Details</h2>
          <div className="flex items-center mb-4">
            <img src={userAuth.profile_img}alt="Profile Image" className="w-16 h-16 rounded-full mr-4" />
            <h2 className="text-2xl font-semibold text-purple-700">{ userAuth.username}</h2>
          </div>
          
          <div className='xl:flex xl:flex-row lg:flex lg:flex-col lg:justify-center lg:items-center mt-2 space-y-4 xl:justify-center xl:w-full lg:w-full'>
           <div className='xl:w-5/12 lg:w-4/6 mx-5 '>
           <p className=' text-center text-2xl text-blue-700 bg-green-500 rounded-md'>Friends</p>
           {
            friends !=null?
            friends.map((data,i)=>{
                return<div className=' flex mt-4 items-center justify-center border-gray-400 bg-gray-500 space-y-2 py-1 rounded-sm ' key={i}>
                <img src={data.profile_img} className=' w-10 rounded-full ml-2' alt="" />
                <p className=' underline ml-3 hover:cursor-pointer'>{data.username}</p>
                <button onClick={()=>Unfriend(data._id)} className=' ml-3 bg-red-500 px-1 rounded-md hover:bg-blue-400 py-1'>Unfriend</button>
                
              </div>
            })
           : <p className=' text-center mt-6'>No friend found</p>
           }
               
           </div>

           <div className='xl:w-7/12 lg:w-4/6'>
            <p className=' ml-3 text-center text-2xl text-blue-700 bg-green-500 rounded-md'>Friends Request</p>
            {
            friendsrequest.length>0 ?
            friendsrequest.map((data,i)=>{
                return<div className=' ml-3 flex mt-4 items-center border-gray-400 bg-gray-500 space-y-2 py-1 rounded-sm ' key={i}>
                <img src={data._id.profile_img} className=' w-10 rounded-full ml-2' alt="" />
                <p className=' underline ml-3 hover:cursor-pointer'>{data._id.username}</p>
                <div className=' ml-2'>
                <button onClick={()=>AcceptFriend(data._id._id)} className=' ml-3 bg-green-500 px-1 rounded-md hover:bg-blue-400 py-1'>Accept</button>
                <button onClick={()=>RejectFriend(data._id._id)} className=' ml-3 bg-red-500 px-1 rounded-md hover:bg-blue-400 py-1'>Reject</button>

                </div>
               
              </div>
            })
           : <p className=' text-center mt-6'>No friend found</p>
           }
           </div>
          </div>
          
        </div>
        <div className="w-full sm:w-full xl:w-1/2 lg:w-3/5 bg-white rounded-lg lg:grid lg:grid-cols-2 p-4 shadow-md">
        <div>
        <h2 className="text-2xl font-semibold mb-4 text-pink-500">Recommended</h2>
        {
            RecommnedData.map((data,i)=>{
             return   <div className=' flex mt-4 items-center border-gray-400 space-y-2' key={i}>
            <img src={data.profile_img} className=' w-10 rounded-full' alt="" />
            <p className=' ml-3'>{data.username}</p>
            <button onClick={()=>sendRequest(data._id)} className=' ml-3 bg-blue-500 px-3 rounded-md hover:bg-blue-400 py-2'>Connect</button>
            {/* {data.username} */}
          </div>
            })
        }
            
        </div>
         <div>

          
          <h2 className="text-2xl font-semibold mb-4 text-pink-500">Find Friends</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search friends"
            //   value={searchTerm}
              onChange={handleSearch}
            // onChange={(e)=>setSearchTerm(e.target.value)}
              className="border rounded-md px-3 py-2 w-full"
            />
            {/* <button className="absolute top-0 right-0 p-2 bg-gray-200 rounded-r-md" onClick={handleSearch}>
              <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0 1 14 0z"></path>
              </svg>
            </button> */}
          </div>
          {
            searchReasult.length >0 ?
            searchReasult.map((data,i)=>{

         return <div className=' flex mt-4 items-center border-gray-400 space-y-2' key={i}>
            <img src={data.profile_img} className=' w-10 rounded-full' alt="" />
            <p className=' ml-3'>{data.username}</p>
            <button onClick={()=>sendRequest(data._id)} className=' ml-3 bg-blue-500 px-3 rounded-md hover:bg-blue-400 py-2'>Connect</button>
            {/* {data.username} */}
          </div>
        // console.log(data,"ty")
            })
          : <p className=' text-center mt-4'>No data found</p>
          }
          {/* Display search results here */}
        </div>
        </div>
        {/* <div>

        </div> */}
      </div>
    </div>
//     <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-indigo-200 to-purple-500">
//   <Toaster />
//   <h1 className="text-3xl font-bold mb-4 text-white text-center">Connect Dashboard</h1>
  
//   <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-5">
//     {/* User Details */}
//     <div className="w-full md:w-1/2 bg-white rounded-lg p-4 shadow-md">
//       <h2 className="text-2xl font-semibold mb-4 text-purple-700 text-center md:text-left">User Details</h2>
//       <div className="flex items-center mb-4 justify-center md:justify-start">
//         <img src={userAuth.profile_img} alt="Profile Image" className="w-16 h-16 rounded-full mr-4" />
//         <h2 className="text-2xl font-semibold text-purple-700">{userAuth.username}</h2>
//       </div>

//       <div className="flex flex-col md:flex-row justify-center md:justify-start w-full space-y-4 md:space-y-0 md:space-x-5">
//         {/* Friends Section */}
//         <div className="w-full md:w-5/12">
//           <p className="text-center text-2xl text-blue-700 bg-green-500 rounded-md">Friends</p>
//           {friends != null ? (
//             friends.map((data, i) => (
//               <div className="flex mt-4 items-center bg-gray-500 py-2 px-3 rounded-sm" key={i}>
//                 <img src={data.profile_img} className="w-10 rounded-full ml-2" alt="" />
//                 <p className="underline ml-3 hover:cursor-pointer">{data.username}</p>
//                 <button
//                   onClick={() => Unfriend(data._id)}
//                   className="ml-3 bg-red-500 px-3 py-1 rounded-md hover:bg-blue-400"
//                 >
//                   Unfriend
//                 </button>
//               </div>
//             ))
//           ) : (
//             <p className="text-center mt-6">No friend found</p>
//           )}
//         </div>

//         {/* Friends Requests Section */}
//         <div className="w-full md:w-7/12">
//           <p className="text-center text-2xl text-blue-700 bg-green-500 rounded-md">Friends Request</p>
//           {friendsrequest.length > 0 ? (
//             friendsrequest.map((data, i) => (
//               <div className="flex mt-4 items-center bg-gray-500 py-2 px-3 rounded-sm" key={i}>
//                 <img src={data._id.profile_img} className="w-10 rounded-full ml-2" alt="" />
//                 <p className="underline ml-3 hover:cursor-pointer">{data._id.username}</p>
//                 <div className="ml-2">
//                   <button
//                     onClick={() => AcceptFriend(data._id._id)}
//                     className="ml-3 bg-green-500 px-3 py-1 rounded-md hover:bg-blue-400"
//                   >
//                     Accept
//                   </button>
//                   <button
//                     onClick={() => RejectFriend(data._id._id)}
//                     className="ml-3 bg-red-500 px-3 py-1 rounded-md hover:bg-blue-400"
//                   >
//                     Reject
//                   </button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-center mt-6">No friend requests found</p>
//           )}
//         </div>
//       </div>
//     </div>

//     {/* Right Panel: Recommended Friends and Search */}
//     <div className="w-full md:w-1/2 bg-white rounded-lg p-4 shadow-md grid grid-cols-1 md:grid-cols-2 gap-4">
//       {/* Recommended Friends */}
//       <div>
//         <h2 className="text-2xl font-semibold mb-4 text-pink-500">Recommended</h2>
//         {RecommnedData.map((data, i) => (
//           <div className="flex mt-4 items-center space-x-3" key={i}>
//             <img src={data.profile_img} className="w-10 rounded-full" alt="" />
//             <p>{data.username}</p>
//             <button
//               onClick={() => sendRequest(data._id)}
//               className="bg-blue-500 px-3 py-2 rounded-md hover:bg-blue-400"
//             >
//               Connect
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Search Friends */}
//       <div>
//         <h2 className="text-2xl font-semibold mb-4 text-pink-500">Find Friends</h2>
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Search friends"
//             onChange={handleSearch}
//             className="border rounded-md px-3 py-2 w-full"
//           />
//         </div>

//         {searchReasult.length > 0 ? (
//           searchReasult.map((data, i) => (
//             <div className="flex mt-4 items-center space-x-3" key={i}>
//               <img src={data.profile_img} className="w-10 rounded-full" alt="" />
//               <p>{data.username}</p>
//               <button
//                 onClick={() => sendRequest(data._id)}
//                 className="bg-blue-500 px-3 py-2 rounded-md hover:bg-blue-400"
//               >
//                 Connect
//               </button>
//             </div>
//           ))
//         ) : (
//           <p className="text-center mt-4">No data found</p>
//         )}
//       </div>
//     </div>
//   </div>
// </div>

    
  );
};

export default Dashboard;