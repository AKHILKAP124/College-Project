import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

const SearchMember = ({ isOpen, onClose, title = "Search User's" }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const user = useSelector((state) => state?.user);

  const handleGetAllUsers = async () => {
    await axios
      .get(`https://infra-backend-one.vercel.app/api/user/getallusers`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          setAllUsers(res?.data?.users);
          return;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleGetAllUsers();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredResults([]);
      allUsers.filter((item) => console.log(item.name));
    } else {
      const filtered = allUsers.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredResults(filtered);
    }
  }, [searchTerm, allUsers]);

  const handleInviteMember = (item) => {
    const data = {
      userId: user?._id,
      memberId: item?._id,
    };

    console.log(data, "add member");

    axios
      .post(`https://infra-backend-one.vercel.app/api/member/add`, data, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 201) {
          toast.success(res?.data?.message);
          setTimeout(() => {
            onClose();
            window.location.reload();
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className=" fixed inset-0 bg-[#0000005e] bg-opacity-50 z-40"
        onClick={onClose}
      ></div>

      <div className=" flex items-center justify-center ">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-b-slate-200 px-4 py-3">
            <h3 className="text-xl font-medium text-gray-900">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
              aria-label="Close dialog"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Search Input */}
          <div className="p-4">
            <input
              type="text"
              placeholder="Type to search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          </div>

          {/* Result Box */}
          <div className="px-4 pb-4 overflow-y-auto flex-1">
            {searchTerm.trim() === "" ? (
              <p className="text-gray-500 italic">
                Enter a search term to see results.
              </p>
            ) : filteredResults.length === 0 ? (
              <p className="text-gray-500 italic">No results found.</p>
            ) : (
              <ul className="divide-y divide-gray-200 max-h-60 overflow-y-auto">
                {filteredResults.map(
                  (item, index) =>
                    item._id !== user?._id && (
                      <li
                        key={index}
                        className="py-2 flex items-center justify-between cursor-pointer hover:bg-gray-100 "
                      >
                        <div className="flex items-center gap-2">
                          <img
                            src={item.avatar}
                            alt={item.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <p>{item.name}</p>
                        </div>

                        <button
                          className="  hover:text-white rounded-sm px-2 py-1  gap-1 transition-all duration-200 hover:bg-blue-400"
                          onClick={() => {
                            handleInviteMember(item);
                          }}
                        >
                          Invite
                        </button>
                      </li>
                    )
                )}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchMember;
