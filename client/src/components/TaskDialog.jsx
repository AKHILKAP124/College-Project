import axios from "axios";
import React from "react";
import toast from "react-hot-toast";

const SideDialog = ({ isOpen, onClose, taskId }) => {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState({
    id: "",
    name: "",
    status: "",
    description: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handleSave = async () => {
    setLoading(true);
    console.log(taskId);
    data.id = taskId?._id;
    // You can add your save logic here
    console.log("Task saved:", data);
    await axios
      .post(`http://localhost:3000/api/task/update`, data, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message);
          onClose();
          window.location.reload();
          setData({ name: "", description: "", status: "" });
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0  transition-opacity ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      ></div>

      {/* Side Dialog */}
      <aside
        className={`fixed top-28 right-0 h-screen max-w-2xl w-full bg-white shadow-2xl rounded-tl-md rounded-bl-md transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } flex flex-col`}
        style={{ maxHeight: "660px" }} // max height for mobile requirement
      >
        {/* Header */}
        <header className="flex items-center justify-between p-4 ">
          <h2 className="text-lg font-semibold text-gray-900">Task</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-red-700 focus:outline-none"
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
        </header>

        {/* Content */}
        <div className="p-4 overflow-y-auto flex-1">
          <p className="text-sm text-gray-500">Name</p>
          <input
            type="text"
            name="name"
            id="name"
            onChange={handleOnChange}
            defaultValue={taskId.name}
            className=" text-2xl font-medium px-3 py-2 focus:outline-none"
          />
          <div className="mt-6 flex items-center gap-38 border-t border-gray-200">
            <p className="text-sm text-gray-500">Status</p>
            <select
              className=" rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-200 focus:bg-gray-100 cursor-pointer appearance-none"
              name="status"
              id="status"
              onChange={handleOnChange}
              defaultValue={taskId.status}
            >
              <option value="New task">New task</option>
              <option value="In progress">In progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="mt-1 flex items-center gap-38">
            <p className="text-sm text-gray-500">Created</p>
            <p className="text-normal">{taskId.createdAt}</p>
          </div>
          <div className="mt-3 pt-2  border-t border-gray-200">
            <p className="text-sm text-gray-500">Description</p>
            <textarea
              type="text"
              name="description"
              id="description"
              onChange={handleOnChange}
              placeholder="Enter description here..."
              defaultValue={taskId.description}
              className="w-120 h-40 border border-gray-400 rounded-md text-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-200 focus:bg-gray-100"
            />
          </div>
        </div>
        {/* Footer */}
        <footer className="flex justify-end p-4 border-t border-gray-200">
          <button
            onClick={handleSave}
            disabled={!data.name && !data.description && !data.status}
            className={`px-4 py-2 rounded-md text-white transition ${
              !data.name && !data.description && !data.status
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </footer>
      </aside>
    </>
  );
};

export default SideDialog;
