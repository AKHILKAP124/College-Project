import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const ProjectSideDialog = ({ isOpen, onClose, taskId }) => {
  const [messages, setMessages] = useState([
    { id: 1, sender: "A", text: "Hi there!" },
    { id: 2, sender: "B", text: "Hello! How are you?" },
  ]);
  const [inputA, setInputA] = useState("");
  const [inputB, setInputB] = useState("");
  const messagesEndRef = useRef(null);

  // Scroll to the bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (sender) => {
    const input = sender === "A" ? inputA.trim() : inputB.trim();
    if (input === "") return;

    setMessages((prev) => [...prev, { id: Date.now(), sender, text: input }]);

    if (sender === "A") setInputA("");
    else setInputB("");
  };

  const handleKeyDown = (e, sender) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(sender);
    }
  };

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
      .post(
        `https://college-project-backend-six.vercel.app/api/task/update`,
        data,
        {
          withCredentials: true,
        }
      )
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
        className={`fixed top-12 right-0 h-screen max-w-4xl w-full bg-white border border-gray-200 shadow-2xl rounded-tl-md rounded-bl-md transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } flex flex-col`}
        style={{ maxHeight: "800px" }} // max height for mobile requirement
      >
        {/* Header */}
        <header className="flex items-center justify-between px-4 py-2 border-b border-b-gray-200 ">
          <h2 className="text-lg font-semibold text-gray-900">Task</h2>
          <h2 className="text-lg font-semibold text-gray-900 ml-16">Chat</h2>
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
        <div className="flex h-full ">
          <div className="p-4 overflow-y-full flex-1">
            <p className="text-sm text-gray-500">Name</p>
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleOnChange}
              defaultValue=""
              className=" text-2xl font-medium px-3 py-2 focus:outline-none"
            />
            <div className="mt-6 flex items-center gap-38 border-t border-gray-200">
              <p className="text-sm text-gray-500">Status</p>
              <select
                className=" rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-200 focus:bg-gray-100 cursor-pointer appearance-none"
                name="status"
                id="status"
                onChange={handleOnChange}
                defaultValue=""
              >
                <option value="New task">New task</option>
                <option value="In progress">In progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="mt-1 flex items-center gap-38">
              <p className="text-sm text-gray-500">Created</p>
              <p className="text-normal"></p>
            </div>
            <div className="mt-3 pt-2  border-t border-gray-200">
              <p className="text-sm text-gray-500">Description</p>
              <textarea
                type="text"
                name="description"
                id="description"
                onChange={handleOnChange}
                placeholder="Enter description here..."
                defaultValue=""
                className="w-98 h-38 border border-gray-300 rounded-md text-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-200 focus:bg-gray-100"
              />
            </div>
          </div>
          <div className="overflow-y-auto flex-1 bg-blue-50">
            <div className="max-w-4xl mx-auto my-6 p-4 border rounded-lg shadow-lg bg-white">
              <h2 className="text-2xl font-bold text-center mb-4">
                Two Person Chat
              </h2>
              <div className="flex flex-col h-[500px] border rounded-lg overflow-hidden">
                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-3">
                  {messages.map(({ id, sender, text }) => (
                    <div
                      key={id}
                      className={`flex ${
                        sender === "A" ? "justify-start" : "justify-end"
                      }`}
                    >
                      <div
                        className={`max-w-[70%] px-4 py-2 rounded-lg whitespace-pre-wrap ${
                          sender === "A"
                            ? "bg-green-200 text-green-900 rounded-bl-none"
                            : "bg-blue-500 text-white rounded-br-none"
                        }`}
                      >
                        <span className="font-semibold">Person {sender}:</span>{" "}
                        {text}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Inputs */}
                <div className="grid grid-cols-2 gap-4 border-t p-4 bg-white">
                  {/* Person A input */}
                  <div className="flex flex-col">
                    <label className="mb-1 font-semibold text-green-700">
                      Person A
                    </label>
                    <textarea
                      rows={2}
                      value={inputA}
                      onChange={(e) => setInputA(e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, "A")}
                      placeholder="Type a message..."
                      className="resize-none border border-green-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button
                      onClick={() => sendMessage("A")}
                      disabled={inputA.trim() === ""}
                      className="mt-2 bg-green-500 text-white rounded px-3 py-1 disabled:bg-green-200 hover:bg-green-600 transition"
                    >
                      Send Person A
                    </button>
                  </div>

                  {/* Person B input */}
                  <div className="flex flex-col">
                    <label className="mb-1 font-semibold text-blue-700">
                      Person B
                    </label>
                    <textarea
                      rows={2}
                      value={inputB}
                      onChange={(e) => setInputB(e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, "B")}
                      placeholder="Type a message..."
                      className="resize-none border border-blue-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={() => sendMessage("B")}
                      disabled={inputB.trim() === ""}
                      className="mt-2 bg-blue-600 text-white rounded px-3 py-1 disabled:bg-blue-300 hover:bg-blue-700 transition"
                    >
                      Send Person B
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Footer */}
        <footer className="flex justify-start p-4 border-t border-gray-200">
          <button
            onClick={handleSave}
            disabled={!data.name && !data.description && !data.status}
            className={`px-4 py-2 rounded-md text-white transition ${
              !data.name && !data.description && !data.status
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </footer>
      </aside>
    </>
  );
};

export default ProjectSideDialog;
