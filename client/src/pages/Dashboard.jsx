import React, { useEffect, useState } from "react";
import { CgCheckR, CgMathPlus, CgNotes } from "react-icons/cg";
import Avatar from "@mui/material/Avatar";
import { FaUser } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "../redux/userSlice";
import toast from "react-hot-toast";
import AddTaskDialog from "../components/AddTaskDailog";
import { RiDeleteBin6Line } from "react-icons/ri";
import SideDialog from "../components/TaskDialog";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

const Dashboard = () => {
  const dispatch = useDispatch();
  const nagivate = useNavigate();
  const user = useSelector((state) => state.user);
  const [task, setTask] = useState([]);
  const [taskId, setTaskId] = useState("");

  const [isTaskDataOpen, setIsTaskDataOpen] = useState(false);
  const handleCloseTask = () => {
    setIsTaskDataOpen(false);
  };

  setTimeout(() => {
    window.location.reload();
  }, 900000);

  if (user.name === "") {
    axios
      .get(`${import.meta.env.BACKEND_URL}/api/user/getUser`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res?.data?.user);
        if (res.status === 200) {
          dispatch(setUser(res.data.user));
          localStorage.setItem("user", JSON.stringify(res.data.user));
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          toast.error("Session expired, please login again");
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setTimeout(() => {
            window.location.href = "/signin";
          }, 2000);
        }
        console.log(err);
      });
  }

  useEffect(() => {
    axios
      .post(
        `${import.meta.env.BACKEND_URL}/api/task/get`,
        { owner: user?._id },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          toast.success("Tasks fetched successfully");
          setTask(res.data.tasks, "task data");
          return;
        }
      })
      .catch((err) => {
        if (err.response.status === 404) {
          toast.error("No tasks found");
          return [];
        }
        console.log(err);
      });
  }, [user?._id]);

  useEffect(() => {
    const socket = io(`${import.meta.env.BACKEND_URL}`, {
      withCredentials: true,
      auth: {
        token: localStorage.getItem("token"),
      },
    });
    socket.on("connect", () => {
      console.log("Connected to server");
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleLogout = async () => {
    await axios
      .get(`${import.meta.env.BACKEND_URL}/api/user/logout`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch(setUser({}));
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          toast.success(res.data.message);
          // Redirect to sign-in page
          setTimeout(() => {
            window.location.href = "/signin";
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = async (taskId) => {
    await axios
      .post(
        `${import.meta.env.BACKEND_URL}/api/task/delete`,
        { taskId },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [isTaskOpen, setIsTaskOpen] = React.useState();

  const handleOpen = () => {
    setIsTaskOpen(true);
  };
  const handleClose = () => {
    setIsTaskOpen(false);
  };

  const [hidden, setHidden] = React.useState("hidden");
  const handleClick = () => {
    setHidden((prev) => (prev === "hidden" ? "" : "hidden"));
  };

  const handleTaskgetbyId = async (taskId) => {
    await axios
      .post(
        `${import.meta.env.BACKEND_URL}/api/task/getbyid`,
        { taskId },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data.task);
          setTaskId(res.data.task);
          return;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-40 h-screen shadow-md shadow-blue-100 bg-blue-50 p-2 border-r border-r-slate-300">
          <p className="text-sm font-normal ml-1 text-white mt-8">Tools</p>
          <div className=" flex items-center  font-medium mt-4 px-2 py-2 rounded-md bg-white gap-2 shadow-md shadow-slate-100">
            <CgCheckR className="text-2xl text-blue-400" />
            <span className="text-[14px] text-blue-400">Tasks</span>
          </div>
          <div className=" relative flex items-center  font-medium mt-2 px-2 py-2 rounded-md bg-white gap-2 shadow-md shadow-slate-100">
            <FaRegCalendarCheck className="text-2xl text-blue-400" />
            <span className="text-[14px] text-blue-400">Calender</span>
            <div className="absolute backdrop-blur-[1px] h-10 w-32 flex items-start text-[12px] text-gray-500 justify-center  rounded-md top-0 left-0 cursor-pointer">
              comming soon...
            </div>
          </div>
          <div className=" relative flex items-center  font-medium mt-2 px-2 py-2 rounded-md bg-white gap-2 shadow-md shadow-slate-100">
            <CgNotes className="text-2xl text-blue-400" />
            <span className="text-[14px] text-blue-400">Notes</span>
            <div className="absolute backdrop-blur-[1px] h-10 w-32 flex items-start text-[12px] text-gray-500 justify-center  rounded-md top-0 left-0 cursor-pointer">
              comming soon...
            </div>
          </div>
        </div>

        <div className="w-full h-screen bg-white">
          <div className="w-full bg-blue-100 h-18 flex items-center justify-center border-b border-b-slate-200">
            <div className="w-full h-10 flex items-center justify-between px-4">
              <button
                className="flex  items-center gap-1 bg-blue-500 text-white pl-2 pr-4 py-2 rounded-md ml-4 hover:bg-blue-600 transition-all duration-200"
                onClick={() => handleOpen()}
              >
                {" "}
                <CgMathPlus className="text-xl" />
                Add new
              </button>
              <div className="">
                <Avatar
                  alt={user.name}
                  src={user.avatar}
                  sx={{ width: 40, height: 40 }}
                  onClick={() => handleClick()}
                  className="cursor-pointer hover:scale-105 transition-all duration-200"
                />

                <div
                  className={`absolute w-44 py-2 bg-white border border-slate-200 rounded-sm top-18 right-4 ${hidden}`}
                >
                  <div className="flex items-center gap-1 w-full h-12 border-b border-b-slate-200 px-4">
                    <Avatar
                      alt={user.name}
                      src={user.avatar}
                      sx={{ width: 28, height: 28 }}
                    />
                    <p className="text-sm">{user.name}</p>
                  </div>
                  <div className="w-full h-fit p-2 ">
                    <div
                      className="text-sm px-3 py-2 rounded-md flex items-center gap-1 hover:bg-gray-100 transition-all duration-200 cursor-pointer "
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        nagivate("/user/profile");
                      }}
                    >
                      {" "}
                      <FaUser className="text-lg" /> View Porfile
                    </div>
                    {/* <div className="text-sm px-3 py-2 rounded-md flex items-center gap-1 hover:bg-blue-100 transition-all duration-200 cursor-pointer ">
                      {" "}
                      <FaUser className="text-lg" /> Settings
                    </div> */}
                    <div className="border-b my-1 border-b-slate-200"></div>
                    <div
                      className="text-sm px-3 py-2 rounded-md flex items-center gap-1 hover:bg-red-100 transition-all duration-200 cursor-pointer "
                      onClick={() => handleLogout()}
                    >
                      {" "}
                      <CiLogout className="text-lg" /> Logout
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="w-full h-1 bg-blue-50"></div> */}
          <div className="w-full h-fit  border-t border-t-slate-200 ">
            <div className="w-full h-fit  justify-center ">
              <div
                className=" flex items-center justify-around w-full bg-[#0f1d40]
                border-b border-b-slate-200 "
              >
                <div className="relative w-64 h-12 text-white text-normal font-medium flex items-center text-wrap">
                  Task name
                  <div className=" absolute left-24 text-[12px] bg-[#3c61c1] text-gray-100 size-5 rounded-full flex items-center justify-center">
                    {task.length}
                  </div>
                </div>
                <p className="text-sm text-[#a7aeb4] h-12 w-20 flex items-center justify-center">
                  status
                </p>
                <p className="text-sm text-[#a7aeb4]  h-12 w-22 flex items-center justify-center">
                  Create on
                </p>
                <div className=" h-12 w-6 flex items-center justify-center"></div>
              </div>

              {task.map((task) => (
                <div
                  key={task._id}
                  className="flex items-center justify-around w-full border-b border-b-slate-200 bg-white"
                >
                  <div
                    data-id={task._id}
                    className=" w-64 h-12 text-sm  flex items-center text-wrap hover:text-blue-500 hover:underline hover:font-medium transition-all duration-200 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTaskgetbyId(e.target.dataset.id);
                      setIsTaskDataOpen(true);
                    }}
                  >
                    {task.name}
                  </div>
                  <div className="text-sm   h-12 w-20 flex items-center justify-center">
                    {task.status}
                  </div>
                  <div className="text-sm  h-12 w-22 flex items-center justify-center">
                    {task.updatedAt.slice(0, 10)}
                  </div>
                  <div className=" h-12 w-6 flex items-center justify-center">
                    <RiDeleteBin6Line
                      className="text-red-500 cursor-pointer"
                      onClick={() => handleDelete(task._id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <AddTaskDialog
        isOpen={isTaskOpen}
        onClose={handleClose}
        owner={user._id}
      />
      <SideDialog
        isOpen={isTaskDataOpen}
        onClose={handleCloseTask}
        taskId={taskId}
      />
    </>
  );
};

export default Dashboard;
