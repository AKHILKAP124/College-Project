import React from "react";
import { SiInfracost } from "react-icons/si";
import { useState } from "react";
import axios from "axios";
import uploadImage from "../utils/cloudinaryUpload";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleImageChange = async (e) => {
    setLoading(true);
    const file = e.target.files[0];
    const res = await uploadImage(file);
    if (res.success) {
      setLoading(false);
    }
    setData({ ...data, avatar: res.data });
  };
  const handleOnSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    axios
      .post(`https://infra-backend-one.vercel.app/api/user/signup`, data, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 201) {
          toast.success(res.data.message);
          setTimeout(() => {
            navigate("/signin");
          }, 2000);
          setTimeout(() => {
            setLoading(false);
          }, 4000);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

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
            Register
          </h1>
          <p className="text-gray-600 mb-6">Get your INFRA account now.</p>
          <div className="flex justify-center bg-white shadow-md border-2 border-slate-100 rounded-lg p-10 max-w-xl w-full text-center mb-10">
            <form action="submit" onSubmit={handleOnSubmit} className="w-full">
              <div className="mb-4 flex flex-col items-start">
                <label
                  htmlFor="name"
                  className="mb-2 text-slate-600 font-semibold"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  onChange={handleOnchange}
                  placeholder="name"
                  className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring focus:ring-blue-400"
                />
              </div>
              <div className="mb-4 flex flex-col items-start">
                <label
                  htmlFor="email"
                  className="mb-2 text-slate-600 font-semibold"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={handleOnchange}
                  placeholder="Email"
                  className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring focus:ring-blue-400"
                />
              </div>

              <div className="w-full mb-4 flex flex-col items-start">
                <label
                  htmlFor="password"
                  className="mb-2 text-slate-600 font-semibold"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  onChange={handleOnchange}
                  placeholder="Password"
                  className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring focus:ring-blue-400"
                />
              </div>

              <div className="w-full mb-4 flex flex-col items-start">
                <label
                  htmlFor="avatar"
                  className="mb-2 text-slate-600 font-semibold"
                >
                  Avatar
                </label>
                <input
                  type="file"
                  name="avatar"
                  onChange={handleImageChange}
                  placeholder="Avatar URL"
                  className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring focus:ring-blue-400"
                />
              </div>

              <button
                type="submit"
                className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] cursor-pointer text-white font-semibold py-2 px-4 mb-4 mt-2 rounded w-full"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
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
                  "Register"
                )}
              </button>
              <div className="flex items-center space-x-1 mb-4">
                <p className="text-gray-600">
                  By registering you agree to the INFRA.{" "}
                </p>
                <a href="#" className=" text-blue-500 hover:text-blue-700">
                  Terms of Use
                </a>
              </div>
            </form>
          </div>
          <p className="text-gray-600 mb-6">
            Always have an account ?
            <a
              href="/signin"
              className="text-[var(--primary)] hover:text-[var(--primary-dark)] ml-2"
            >
              Sign In
            </a>
          </p>
          <p>© 2025 INFRA. Created by ❤️Akhil Thakur</p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
