import { Avatar } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { FaPen } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import uploadImage from '../utils/cloudinaryUpload';

const Profile = () => {

  const [profilePic, setProfilePic] = React.useState("")
  const user = useSelector((state) => state.user);

  useEffect(() => {
    setProfilePic(user.avatar)
    
  }, [ ])
  
  const navigate = useNavigate();

  const [data, setData] = React.useState({
    owner: "",
    name: "",
    email: "",
    avatar: ""

  });
  const [loading, setLoading] = React.useState(false)

  console.log(data)
  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleImageChange = async (e) => {
    setLoading(true);
    console.log(data)
      const file = e.target.files[0];
      const res = await uploadImage(file);
    if (res.success) {
        setProfilePic(res.data)
        toast.success(res.message);
        setLoading(false);
      }
      setData({ ...data, avatar: res.data });
    };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true)

    data.owner = user._id

    axios
      .put("http://localhost:3000/api/user/update", data, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message);
          setTimeout(() => {
            navigate("/dashboard/tasks-All-Activities&");
            data.name = ""
            data.email = ""
            setLoading(false)
            window.location.reload();
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.res.data.message);
      });

  };


  return (
    <>
      <div className="h-screen w-full px-6 py-4">
        <h1 className="text-2xl font-medium  ">Profile</h1>
        <div className="size-full py-8 flex items-start flex-col ">
          <div className="flex items-center absolute ">
            <Avatar
              sx={{ width: 200, height: 200 }}
              alt={user.name}
              src={profilePic}
            />
            <div className="absolute w-10 h-10 rounded-full flex items-center justify-center bg-gray-400 bottom-0 right-0 ">
              <FaPen className="text-xl text-gray-800 cursor-pointer absolute " />
              <input
                type="file"
                name="avatar"
                id="avatar"
                onChange={handleImageChange}
                className=" appearance-none w-12 h-12 opacity-0 rounded cursor-pointer px-1 "
              />
            </div>
          </div>
          <div className="flex flex-col gap-3  p-4  mt-60">
            <div>
              <label htmlFor="name" className="flex  items-center gap-8 ">
                <p className="text-gray-600 text-[18px] font-medium">Name:</p>
                <input
                  type="text"
                  name="name"
                  id="name"
                  onChange={handleOnchange}
                  className="appearance-none  py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
                  defaultValue={user.name}
                />
              </label>
            </div>
            <div>
              <label htmlFor="email" className="flex  items-center gap-8">
                <p className="text-gray-600 text-[18px] font-medium">Email:</p>
                <input
                  type="text"
                  name="email"
                  id="email"
                  onChange={handleOnchange}
                  className="appearance-none w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
                  defaultValue={user.email}
                />
              </label>
            </div>
          </div>
          <div className="w-full h-20 flex items-center gap-6  ">
            <button
              className="px-3 py-2 bg-red-400 font-medium rounded-md cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                navigate("/dashboard/tasks-All-Activities&");
              }}
            >
              Cancel
            </button>
            <button
              disabled={!data.name && !data.email && !data.avatar}
              className={`px-4 py-2 rounded-md text-white transition ${
                !data.name && !data.email && !data.avatar
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
              }`}
              onClick={handleOnSubmit}
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
                  <span className="ml-2">Updating...</span>
                </span>
              ) : (
                "Update"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile