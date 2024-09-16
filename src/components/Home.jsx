import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';

const Home = () => {
    let {userAuth:{access_token},setUserAuth}=useContext(UserContext)
  return (
    <section className="h-screen bg-gradient-to-b from-blue-500 to-purple-700 text-white flex items-center justify-center">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold mb-4">Connect with People</h1>
        <p className="text-lg mb-8">Discover new friends and build meaningful connections.</p>
        {/* <button className="bg-white text-blue-500 px-4 py-2 rounded-full hover:bg-blue-100 hover:text-white">Join Now</button> */}
        <Link  className="bg-white text-blue-500 px-4 py-2 rounded-full hover:bg-blue-100 hover:text-white" to={!access_token ? '/login' :'/dashboard'}>
        Join Now
        </Link>
      </div>
    </section>
  );
};

export default Home;
