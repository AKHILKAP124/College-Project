import React from "react";
import { SiInfracost } from "react-icons/si";
import { LuUser } from "react-icons/lu";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../redux/userSlice";

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    email: "demo@gmail.com",
    password: "Demo123",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(`https://infra-backend-lx4a.onrender.com/api/user/signin`, data, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message);
          dispatch(setToken(res.data.Token));
          localStorage.setItem("token", res.data.Token);
          dispatch(setUser(res?.data?.user));
          setTimeout(() => {
            navigate("/signin/verify-user");
          }, 2000);
          setTimeout(() => {
            setLoading(false);
          }, 4000);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="p-6 max-w-xl w-full text-center">
          <div className="flex items-center justify-center mb-4">
            <SiInfracost className="text-3xl text-[var(--primary)]" />
            <h1 className="text-3xl font-semibold text-gray-700 ml-2">INFRA</h1>
          </div>
          <h1 className="text-2xl text-slate-800 font-semibold mb-2">
            Sign In
          </h1>
          <p className="text-gray-600 mb-6">Sign in to continue to INFRA.</p>
          <div className="flex justify-center bg-white shadow-md border-2 border-slate-100 rounded-lg p-16 max-w-xl w-full text-center mb-10">
            <form action="submit" onSubmit={handleOnSubmit} className="w-full">
              <div className="mb-4 flex flex-col items-start">
                <label
                  htmlFor="email"
                  className="mb-2 text-slate-600 font-semibold"
                >
                  Username / Email
                </label>
                <input
                  type="email"
                  name="email"
                  defaultValue={data.email}
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
                  defaultValue={data.password}
                  onChange={handleOnchange}
                  placeholder="Password"
                  className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring focus:ring-blue-400"
                />
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <input type="checkbox" id="remember" className="mr-2" />
                  <label htmlFor="remember" className="text-gray-600">
                    Remember me
                  </label>
                </div>
                <a href="#" className=" text-slate-500 hover:text-slate-700">
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] cursor-pointer text-white font-semibold py-2 px-4 rounded w-full"
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
                  "Sign In"
                )}
              </button>
            </form>
          </div>
          <p className="text-gray-600 mb-6">
            Don't have an account ?
            <a
              href="/signup"
              className="text-[var(--primary)] hover:text-[var(--primary-dark)] ml-2"
            >
              SignUp now
            </a>
          </p>
          <p>© 2025 INFRA. Created by ❤️Akhil Thakur</p>
        </div>
      </div>
    </>
  );
};

export default SignIn;
