import React, { useState } from 'react';
import axios from 'axios';

const FriendSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`/api/friends/search?query=${query}`, {
        headers: { 'x-auth-token': localStorage.getItem('token') },
      });
      setResults(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <form onSubmit={handleSearch} className="w-full max-w-md">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search users"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 mb-4"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Search
        </button>
      </form>

      <ul className="mt-4 w-full max-w-md">
        {results.map((user) => (
          <li key={user._id} className="p-4 bg-gray-100 border rounded-md mb-2">
            <div className="flex justify-between items-center">
              <span>{user.username}</span>
              <button className="bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600">
                Add Friend
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendSearch;
