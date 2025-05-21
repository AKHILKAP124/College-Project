import React from "react";

const Dialog = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center border backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
    >
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full border border-slate-200 mx-4">
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-900" id="dialog-title">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold focus:outline-none"
            aria-label="Close dialog"
          >
            &times;
          </button>
        </div>
        <div className="p-6 text-gray-700">{children}</div>
        {/* <div className="flex justify-end border-t px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Close
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Dialog;