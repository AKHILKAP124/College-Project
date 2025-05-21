import { Avatar } from "@mui/material";
import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

export default function UpdateProjectDialog({ onClose, isOpen, project }) {
  const projectMembers = project?.members;
  const user = useSelector((state) => state.user);

  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleCancel = () => {
    setInputValue("");
  };

  const handleSave = () => {
    setLoading(true);
    const projectData = {
      id: project?._id,
      name: inputValue,
    };

    axios
      .put(
        `https://college-project-backend-six.vercel.app/api/project/update`,
        projectData,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          toast.success(res?.data?.message);
          setTimeout(() => {
            onClose();
            window.location.reload();
            setLoading(false);
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="text-xl font-semibold mb-4 text-gray-800 flex justify-between items-center">
          <p>Update Project</p>
          <RxCross2
            className="text-2xl hover:text-red-600 text-gray-600 "
            onClick={() => {
              setInputValue("");
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
          {user?._id === project?.owner?._id ? (
            ""
          ) : (
            <span className=" text-xs text-red-400">
              Only Admin can Change Project Name
            </span>
          )}
          <input
            id="inputField"
            type="text"
            disabled={user?._id === project?.owner?._id ? false : true}
            defaultValue={project?.name}
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
          <input
            id="inputField"
            type="text"
            defaultValue={project?.owner?.name}
            className="w-full px-3 py-2 text-sky-400 "
            readOnly
          />
        </div>
        <div className="mb-6">
          <ul className=" text-gray-700 font-medium mb-1 flex flex-col gap-1">
            Project Member's
            {projectMembers?.map((member, index) => (
              <li key={index}>
                <div className="flex items-center space-x-2 px-3 py-1 hover:bg-sky-200 hover:border border-sky-300 rounded-md">
                  <Avatar
                    sx={{ width: 32, height: 32 }}
                    alt={member?.name}
                    src={member?.avatar}
                  />
                  <span>{member?.name}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-end space-x-3">
          <button
            onClick={handleCancel}
            className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 text-gray-700 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!inputValue}
            className={`px-4 py-2 rounded-md text-white transition ${
              !inputValue
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Saving...</span>
              </div>
            ) : (
              <span>Save</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
