import { Search } from "lucide-react";
import React, { useState } from "react";
import UserCard from "../components/UserCard";
import { dummyConnectionsData } from "../assets/vibes-assets/assets/assets";

const Discover = () => {
  // const [loading, setLoading] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const handleSearch = (e) => {
    // setSearch(e.target.value);
   

    if (!e.target.value) return setFilteredUsers([]);
    const filtered = dummyConnectionsData.filter((user) => {
     
      return (
        user.username.includes(e.target.value) ||
        user.full_name.includes(e.target.value) ||
        user.bio.includes(e.target.value) ||
        user.location.includes(e.target.value)
      );
    });
    setFilteredUsers(filtered);
  
  };

  return (
    <div className="p-5 space-y-6 mt-10 md:mt-0">
      <h1 className="font-bold text-3xl ">Descover People</h1>
      <p className="text-gray-500">
        Connect with amazing people and grow your network
      </p>
      <div className="relative  bg-white shadow-sm p-5 rounded-md mx-auto md:mx-0">
        <input
          type="text"
          placeholder="Search people by name, username ,bio, or location... "
          autoFocus
          className=" rounded-md px-10 py-2 w-full border-2 border-gray-200 shadow-md "
          onChange={handleSearch}
        />
        <Search className="absolute left-7 top-7 text-gray-400" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {filteredUsers.length === 0 && (
          <p className="text-gray-500 text-4xl text-center col-span-3">
            No users found
          </p>
        )}
        {filteredUsers.length > 0 &&
          filteredUsers.map((user) => <UserCard key={user._id} user={user} />)}
      </div>
    </div>
  );
};

export default Discover;
