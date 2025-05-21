import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";

export default function AddProjectDialog({ onClose, isOpen }) {
  
  const [inputValue, setInputValue] = useState("");
  const [selectValue, setSelectValue] = useState("");

  if (!isOpen) return null;
  
  const handleCancel = () => {
    setInputValue("");
    setSelectValue("");
  };

  const handleSave = () => {
    // You can add your save logic here
    alert(`Saved:\nInput: ${inputValue}\nSelection: ${selectValue}`);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="text-xl font-semibold mb-4 text-gray-800 flex justify-between items-center">
          <p>Profile</p>
          <RxCross2
            className="text-2xl hover:text-red-600 text-gray-600 "
            onClick={() => {
              setInputValue("");
              setSelectValue("");
              onClose();
            }}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="inputField"
            className="block text-gray-700 font-medium mb-1"
          >
            Input Field
          </label>
          <input
            id="inputField"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter text here"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="dropdown"
            className="block text-gray-700 font-medium mb-1"
          >
            Select Option
          </label>
          <select
            id="dropdown"
            value={selectValue}
            onChange={(e) => setSelectValue(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Choose an option
            </option>
            <option value="option1">Option One</option>
            <option value="option2">Option Two</option>
            <option value="option3">Option Three</option>
          </select>
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
            disabled={!inputValue || !selectValue}
            className={`px-4 py-2 rounded-md text-white transition ${
              !inputValue || !selectValue
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
