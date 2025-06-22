import React, { useState } from "react";
import { SiInfracost } from "react-icons/si";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { useState } from "react";

const VerifyUser = () => {

  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  if (user.name === " ") {
    navigate("/signin");
  }
  const handleOnClick = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/dashboard/tasks-All-Activities&");
    }, 2000);
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="p-6 max-w-xl w-full text-center">
          <div className="flex items-center justify-center mb-4">
            <SiInfracost className="text-3xl text-[var(--primary)]" />
            <h1 className="text-3xl font-semibold text-gray-700 ml-2">
              INFRA.
            </h1>
          </div>
          <h1 className="text-2xl text-slate-800 font-semibold mb-2">
            User Confirmation
          </h1>
          <p className="text-gray-600 mb-6">Sign in to continue to INFRA.</p>
          <div className="flex flex-col justify-center bg-white shadow-md border-2 border-slate-100 rounded-lg p-16 max-w-xl w-full text-center mb-10">
            <div className="flex flex-col items-center justify-center w-full">
              <img
                className="size-40 rounded-full"
                src={user.avatar}
                alt={user.name}
              />
            </div>
            <h1 className="text-2xl text-slate-800 font-medium mb-2 mt-4">
              {user.name}
            </h1>
            <div className="flex flex-col justify-center gap-2 mt-4">
              <button
                onClick={() => handleOnClick()}
                className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] cursor-pointer text-white font-semibold py-2 px-4 rounded w-full"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 text-white "
                      viewBox="3 3 18 18"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 3v2a9 9 0 1 0 9 9h2a11 11 0 1 1-11-11z"
                        fill="currentColor"
                      />
                    </svg>
                    <span className="ml-2">Loading...</span>
                  </span>
                ) : (
                  "Continue"
                )}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  localStorage.clear("token")
                  localStorage.clear("user")
                  navigate("/signin");
                }}
                className=" border border-[var(--primary)] hover:b-[var(--primary-dark)] cursor-pointer text-[#212121] font-semibold py-2 px-4 rounded w-full"
              >
                Back
              </button>
            </div>
          </div>
          <p>© 2025 INFRA. Created by ❤️Akhil Thakur</p>
        </div>
      </div>
    </>
  );
};

export default VerifyUser;
