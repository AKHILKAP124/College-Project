import { Avatar } from "@mui/material";
import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function AddProjectDialog({ onClose, isOpen }) {
  const user = useSelector((state) => state.user);
  const userMembers = useSelector((state) => state.userMember?.members);

  const [inputValue, setInputValue] = useState("");
  var [members, setMembers] = useState([]);

  if (!isOpen) return null;

  const handleCancel = () => {
    setInputValue("");
    setMembers("");
    onClose();
  };

  const handleReset = () => {
    setInputValue("");
    setMembers([]);
  };

  const handleMultipleSelect = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const selectedOptions = Array.from(event.target.selectedOptions).map(
      (option) => option.value
    );
    setMembers(selectedOptions);
  };

  const handleSave = () => {
    const projectData = {
      name: inputValue,
      owner: user?._id,
      members,
    };

    axios
      .post(
        `https://infra-backend-one.vercel.app/api/project/add`,
        projectData,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          toast.success(res?.data?.message);
          setTimeout(() => {
            handleCancel();
            window.location.href = "/dashboard/tasks-All-Activities&";
            window.location.reload();
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  return (
    <>
      <div
        className=" fixed inset-0 bg-[#0000005e] bg-opacity-50 z-40"
        onClick={handleCancel}
      ></div>
      <div className=" flex items-center justify-center ">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="text-xl font-semibold mb-4 text-gray-800 flex justify-between items-center">
            <p>Add Project</p>
            <RxCross2
              className="text-2xl hover:text-red-600 text-gray-600 "
              onClick={() => {
                setInputValue("");
                setMembers("");
                onClose();
              }}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="inputField"
              className="block text-gray-700 font-medium mb-1"
            >
              Project Name
            </label>
            <input
              id="inputField"
              type="text"
              value={inputValue}
              onChange={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setInputValue(e.target.value);
              }}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter text here"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="inputField"
              className="block text-gray-700 font-medium mb-1"
            >
              Project Admin
            </label>
            <div className="flex items-center  px-3 py-2">
              ⭐
              <input
                id="inputField"
                type="text"
                value={user?.name}
                className="w-full px-3 py-2 text-sky-400 "
                readOnly
              />
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="dropdown"
              className="block text-gray-700 font-medium mb-1"
            >
              Select Member's
              <p className="text-xs text-purple-500">
                (You can select multiple, Use Ctrl+Click)
              </p>
            </label>
            <select
              id="dropdown"
              onChange={handleMultipleSelect}
              multiple
              className="w-full border border-gray-300 rounded-md px-3 py-2 "
            >
              {userMembers?.map((member, index) => (
                <option
                  key={index}
                  value={
                    member.memberId?._id === user?._id
                      ? member.userId?._id
                      : member.memberId?._id
                  }
                  className="px-4 py-1 rounded-md mb-1  font-medium hover:bg-gray-200"
                >
                  {member.memberId?._id === user?._id
                    ? member.userId?.name
                    : member.memberId?.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 text-gray-700 transition"
            >
              Reset
            </button>
            <button
              onClick={handleSave}
              disabled={!inputValue || !members}
              className={`px-4 py-2 rounded-md text-white transition cursor-pointer ${
                !inputValue || !members
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
