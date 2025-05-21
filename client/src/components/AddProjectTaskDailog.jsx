import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";

export default function AddProjectTaskDialog({
  onClose,
  isOpen,
  owner,
  project,
}) {
  const [data, setData] = useState({
    name: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleCancel = () => {
    setData({ name: "", description: "" });
    onClose();
  };

  const handleSave = async () => {
    setLoading(true);
    const taskData = {
      ownerId: owner,
      projectId: project,
      name: data.name,
      description: data.description,
      status: "New task",
    };
    // You can add your save logic here
    console.log("Task saved:", taskData);
    await axios
      .post(`http://localhost:3000/api/projecttask/add`, taskData, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          setData({ name: "", description: "" });
          toast.success(res.data.message);
          setTimeout(() => {
            window.location.reload();
            onClose();
            setLoading(false);
          }, 2000);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="text-xl font-semibold mb-4 text-gray-800 flex justify-between items-center">
          <p>Create Task</p>
          <RxCross2
            className="text-2xl hover:text-red-600 text-gray-600 "
            onClick={() => {
              setData({ name: "", description: "" });
              onClose();
            }}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 font-medium mb-1"
          >
            Task Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            required
            maxLength={20}
            minLength={6}
            onChange={(e) => handleOnChange(e)}
            value={data.name}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter name here"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-medium mb-1"
          >
            Task Description
          </label>
          <input
            id="description"
            type="text"
            name="description"
            value={data.description}
            onChange={(e) => handleOnChange(e)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter discription here"
          />
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
            disabled={!data.name || !data.description}
            className={`px-4 py-2 rounded-md text-white transition ${
              !data.name || !data.description
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
