import React, { useEffect, useState } from "react";
import { CgCheckR, CgMathPlus, CgNotes } from "react-icons/cg";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import { FaUser } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "../redux/userSlice";
import toast from "react-hot-toast";
import AddTaskDialog from "../components/AddTaskDailog";
import SideDialog from "../components/TaskDialog";
import { NavLink, useNavigate } from "react-router-dom";
import Notification_Bell from "../components/Notification_Bell";
import { CgChevronDown } from "react-icons/cg";

const Dashboard = () => {
  const dispatch = useDispatch();
  const nagivate = useNavigate();
  const [task, setTask] = useState([]);
  const [completedTask, setCompletedTask] = useState([]);
  const [taskId, setTaskId] = useState("");
  // const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isTaskDataOpen, setIsTaskDataOpen] = useState(false);
  const [isTaskOpen, setIsTaskOpen] = useState();
  const [hidden, setHidden] = useState("hidden");
  const [isTasksShown, setIsTasksShown] = useState(false);
  const [isCompletedTasksShown, setIsCompletedTasksShown] = useState(false);

  const user = useSelector((state) => state.user);
  const members = useSelector((state) => state.userMember?.members);

  const navigate = useNavigate();

  if (user?.name === "") {
    const token = localStorage.getItem("token");
    console.log(token);
    axios
      .post(
        `http://localhost:3000/api/user/getUser`,
        {
          token: token,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          dispatch(setUser(res.data.user));
          localStorage.setItem("user", JSON.stringify(res.data.user));
          localStorage.setItem("token", res.data.user.accessToken);
          return;
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          toast.error("Session expired, please login again");
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setTimeout(() => {
            window.location.href = "/auth/signin";
          }, 2000);
        }
        console.log(err);
      });
  }

  const getTasks = async () => {
    await axios
      .post(
        `http://localhost:3000/api/task/get`,
        { owner: user?._id },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setTask([]);
          setCompletedTask([]);
          res.data.tasks.map((task) => {
            if (task.status === "Completed") {
              setCompletedTask((prev) => [...prev, task]);
              console.log("Completed Task", completedTask);
            } else {
              setTask((prev) => [...prev, task]);
            }
          });
        }
      })
      .catch((err) => {
        if (err.response.status === 404) {
          return [];
        }
        console.log(err);
      });
  };

  useEffect(() => {
    getTasks();
  }, [user?._id]);

  const handleLogout = async () => {
    await axios
      .get(`http://localhost:3000/api/user/logout`, {
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
            window.location.href = "/auth/signin";
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = async (taskId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task? This action cannot be undone."
    );
    if (!confirmDelete) {
      return;
    }
    await axios
      .post(
        `http://localhost:3000/api/task/delete`,
        { taskId },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message);
          getTasks();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCloseTask = () => {
    setIsTaskDataOpen(false);
    getTasks();
  };

  const handleOpen = () => {
    setIsTaskOpen(true);
  };
  const handleClose = () => {
    setIsTaskOpen(false);
    getTasks();
  };

  const handleClick = () => {
    setHidden((prev) => (prev === "hidden" ? "" : "hidden"));
  };

  const handleTaskgetbyId = async (taskId) => {
    await axios
      .post(
        `http://localhost:3000/api/task/getbyid`,
        { taskId },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.status === 200) {
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
        <div className="w-40 h-screen shadow-md shadow-blue-100 bg-blue-50 p-2">
          <p className="text-sm font-normal ml-1 text-gray-600 mt-8">Tools</p>
          <NavLink
            className={({ isActive }) =>
              `${
                isActive
                  ? "shadow-md shadow-slate-300 text-blue-400 bg-white "
                  : "text-gray-600"
              } flex items-center  font-medium mt-4 px-2 py-2 rounded-md gap-2 `
            }
            to="/dashboard/tasks-All-Activities&"
          >
            <CgCheckR className="text-2xl " />
            <span className="text-[14px] ">Tasks</span>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `${
                isActive
                  ? "shadow-md shadow-slate-300 text-blue-400"
                  : "text-gray-600"
              } flex items-center  font-medium mt-2 px-2 py-2 rounded-md gap-2 `
            }
            to="/dashboard/notes"
          >
            <CgNotes className="text-2xl " />
            <span className="text-[14px]">Notes</span>
          </NavLink>
        </div>

        <div className="w-full h-screen bg-white">
          {/* header */}
          <div className="w-full h-18 flex items-center justify-center border-b bg-sky-50 border-b-slate-200">
            <div className="w-full h-10 flex items-center justify-between px-4">
              <button
                className="flex  items-center gap- text-sm bg-[#048bec] hover:bg-[#0576c7] text-white py-2 px-4 rounded-3xl ml-4 hover:scale-102 transition-all duration-200 cursor-pointer"
                onClick={() => handleOpen()}
              >
                {" "}
                <CgMathPlus className="text-lg" />
                Add new
              </button>
              <div className=" flex items-center gap-4">
                {members && (
                  <AvatarGroup
                    sx={{ width: 32, height: 32 }}
                    max={4}
                    spacing={22}
                  >
                    {members.map((member, index) => {
                      while (index < members.length)
                        return (
                          <Avatar
                            alt={
                              member?.memberId._id === user?._id
                                ? member?.userId.name
                                : member?.memberId.name
                            }
                            src={
                              member?.memberId._id === user?._id
                                ? member?.userId.avatar
                                : member?.memberId.avatar
                            }
                            sx={{ width: 32, height: 32 }}
                            title={
                              member?.memberId._id === user?._id
                                ? member?.userId.name
                                : member?.memberId.name
                            }
                            className="cursor-pointer hover:scale-105 transition-all duration-200"
                            onClick={() =>
                              navigate(
                                `/members/profile/${
                                  member?.memberId._id === user._id
                                    ? member?.userId._id
                                    : member?.memberId._id
                                }`
                              )
                            }
                          />
                        );
                    })}
                  </AvatarGroup>
                )}
                <div className="flex items-center gap-6">
                  {/* notification */}
                  {/* <div className="flex items-center gap-2 relative">
                    <div className="h-10 border-l border-l-slate-300"></div>
                    <div
                      onClick={() => {
                        handleNotification();
                      }}
                    >
                      <Notification_Bell  />
                    </div>
                    {isNotificationOpen && (
                      <div className="absolute top-full right-0  w-50 h-40 rounded-md bg-sky-50 border border-sky-100"></div>
                    )}
                  </div> */}
                  <div className="h-10 border-l border-l-slate-300"></div>
                  <Avatar
                    alt={user.name}
                    src={user.avatar}
                    sx={{ width: 40, height: 40 }}
                    onClick={() => handleClick()}
                    title={user.name}
                    className="cursor-pointer hover:scale-105 transition-all duration-200"
                  />
                </div>

                <div
                  className={`absolute z-10 w-44 py-2 bg-white border border-slate-200 rounded-sm top-18 right-4 ${hidden}`}
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
          {/* header */}

          <div className="w-full h-1 bg-blue-100 "></div>

          {/* Tasks */}
          <div className="w-full h-fit  border-t border-t-slate-200 ">
            <div className="w-full h-fit  justify-center ">
              <div
                className=" flex items-center w-full h-14 bg-white 
                border-b border-b-slate-200 relative "
              >
                <div className="absolute left-6">
                  <CgChevronDown
                    className={`text-gray-500 text-2xl cursor-pointer transition-all duration-200 ${
                      isTasksShown ? "rotate-180" : ""
                    }`}
                  />
                </div>
                <div
                  className="relative w-64 h-12 text-gray-800 text-[15px] font-medium flex items-center text-wrap ml-14 cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsTasksShown(!isTasksShown);
                  }}
                >
                  Active Tasks
                  <div className=" absolute left-26 text-[14px] bg-gray-200 text-gray-500 w-6 h-5 rounded-full flex items-center justify-center">
                    {task.length}
                  </div>
                </div>
                <div className=" h-12 w-6 flex items-center justify-center"></div>
              </div>
              {isTasksShown && (
                <>
                  <div className="w-full flex transition-all duration-200">
                    <div className="w-96 ml-14"></div>
                    <div className="w-44 relative">
                      <div className="absolute left-4 -top-8 text-gray-500 text-sm">
                        Status
                      </div>
                    </div>
                    <div className="w-44 relative">
                      <div className="absolute left-4 -top-8 text-gray-500 text-sm">
                        Type
                      </div>
                    </div>
                    <div className="w-44 relative">
                      <div className="absolute left-4 -top-8 text-gray-500 text-sm">
                        Due Date
                      </div>
                    </div>
                    <div className="w-44 relative">
                      <div className="absolute left-4 -top-8 text-gray-500 text-sm">
                        Priority
                      </div>
                    </div>
                    <div className="w-44 relative">
                      <div className="absolute left-4 -top-8 text-gray-500 text-sm">
                        Assignee
                      </div>
                    </div>
                    <div className="w-44 relative">
                      <div className="absolute left-4 -top-8 text-gray-500 text-sm">
                        Estimated Time
                      </div>
                    </div>
                  </div>

                  {/* All Tasks  */}
                  <div className="h-full w-full overflow-y-scroll bg-white transition-all duration-200">
                    {task.length === 0 && (
                      <div className="w-full h-12 flex items-center justify-center">
                        <p className="text-gray-500 font-medium">
                          No tasks found
                        </p>
                      </div>
                    )}
                    {task.length > 0 &&
                      task.map((task) => (
                        <div
                          key={task._id}
                          className=" flex items-center w-full  hover:bg-gray-100 bg-white"
                        >
                          <div
                            data-id={task._id}
                            className="w-96 h-12 text-[13px] text-gray-800 overflow-hidden text-nowrap  flex items-center border-r border-r-slate-200 hover: hover:font-medium transition-all duration-200 cursor-pointer ml-14 border-b border-b-slate-200"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleTaskgetbyId(e.target.dataset.id);
                              setIsTaskDataOpen(true);
                            }}
                          >
                            {task.name}
                          </div>

                          <div
                            className={`
                          w-44 text-[14px] text-gray-800 border-r border-r-slate-200 h-12 flex items-center justify-start px-2 border-b border-b-slate-200`}
                          >
                            <p className={` px-2.5 py-2 rounded-xl`}>
                              {task.status}
                            </p>
                          </div>
                          <div
                            className={`
                          w-44 text-[14px] text-gray-800 border-r border-r-slate-200 h-12 flex items-center justify-start px-2 border-b border-b-slate-200`}
                          >
                            <p className={` px-2.5 py-2 rounded-xl`}>
                              {task.type}
                            </p>
                          </div>
                          <div className="w-44 text-[12px] text-gray-800 h-12 border-r border-r-slate-200 flex items-center justify-start px-2 border-b border-b-slate-200">
                            {task.dueDate?.slice(0, 10) || "--"}
                          </div>

                          <div
                            className={`
                          w-44 text-[14px] text-gray-800 border-r border-r-slate-200 h-12 flex items-center justify-start px-2 border-b border-b-slate-200`}
                          >
                            <p className={` px-2.5 py-2 rounded-xl`}>
                              {task?.priority === "None" ? "--" : task.priority}
                            </p>
                          </div>

                          <div
                            className={`
                          w-44 text-[14px] text-gray-800 border-r border-r-slate-200 h-12 flex items-center justify-start px-2 border-b border-b-slate-200`}
                          >
                            <Avatar
                              sx={{ width: 28, height: 28 }}
                              alt={user.name}
                              src={user?.avatar}
                            />
                            <p className="ml-2">Me</p>
                          </div>

                          <div className="w-36 text-[12px] text-gray-800 h-12 border-r border-r-slate-200 flex items-center justify-start px-2 border-b border-b-slate-200">
                            {task.estimatedTime.includes("0")
                              ? "--"
                              : task.estimatedTime}
                          </div>

                          <div className="w-12 h-12 flex items-center justify-center border-b border-b-slate-200">
                            <button
                              className="flex text-[12px] text-red-500 hover:text-red-600 transition-all duration-200 cursor-pointer"
                              onClick={() => handleDelete(task?._id)}
                            >
                              delete
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                  {/*All Tasks  */}
                </>
              )}
            </div>
          </div>

          {/* Completed Tasks */}
          <div className="w-full h-fit  pb-10">
            <div className="w-full h-fit  justify-center ">
              <div
                className=" flex items-center w-full h-14 bg-white 
                border-b border-b-slate-200 relative "
              >
                <div className="absolute left-6">
                  <CgChevronDown
                    className={`text-gray-500 text-2xl cursor-pointer transition-all duration-200 ${
                      isCompletedTasksShown ? "rotate-180" : ""
                    }`}
                  />
                </div>
                <div
                  className="relative w-64 h-12 text-gray-800 text-[15px] font-medium flex items-center text-wrap ml-14 cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsCompletedTasksShown(!isCompletedTasksShown);
                  }}
                >
                  Completed Tasks
                  <div className=" absolute left-36 text-[14px] bg-gray-200 text-gray-500 w-6 h-5 rounded-full flex items-center justify-center">
                    {completedTask?.length}
                  </div>
                </div>
                <div className=" h-12 w-6 flex items-center justify-center"></div>
              </div>
              {isCompletedTasksShown && (
                <>
                  <div className="w-full flex transition-all duration-200">
                    <div className="w-96 ml-14"></div>
                    <div className="w-44 relative">
                      <div className="absolute left-4 -top-8 text-gray-500 text-sm">
                        Status
                      </div>
                    </div>
                    <div className="w-44 relative">
                      <div className="absolute left-4 -top-8 text-gray-500 text-sm">
                        Type
                      </div>
                    </div>
                    <div className="w-44 relative">
                      <div className="absolute left-4 -top-8 text-gray-500 text-sm">
                        Due Date
                      </div>
                    </div>
                    <div className="w-44 relative">
                      <div className="absolute left-4 -top-8 text-gray-500 text-sm">
                        Priority
                      </div>
                    </div>
                    <div className="w-44 relative">
                      <div className="absolute left-4 -top-8 text-gray-500 text-sm">
                        Assignee
                      </div>
                    </div>
                    <div className="w-44 relative">
                      <div className="absolute left-4 -top-8 text-gray-500 text-sm">
                        Estimated Time
                      </div>
                    </div>
                  </div>

                  {/* All Tasks  */}
                  <div className="h-full w-full overflow-y-scroll bg-white transition-all duration-200">
                    {completedTask.length === 0 && (
                      <div className="w-full h-12 flex items-center justify-center">
                        <p className="text-gray-500 font-medium">
                          No tasks found
                        </p>
                      </div>
                    )}
                    {completedTask.length > 0 &&
                      completedTask.map((task) => (
                        <div
                          key={task._id}
                          className=" flex items-center w-full  hover:bg-gray-100 bg-white"
                        >
                          <div
                            data-id={task._id}
                            className="w-96 h-12 text-[13px] text-gray-800 overflow-hidden text-nowrap  flex items-center border-r border-r-slate-200 hover: hover:font-medium transition-all duration-200 cursor-pointer ml-14 border-b border-b-slate-200"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleTaskgetbyId(e.target.dataset.id);
                              setIsTaskDataOpen(true);
                            }}
                          >
                            {task.name}
                          </div>

                          <div
                            className={`
                          w-44 text-[14px] text-gray-800 border-r border-r-slate-200 h-12 flex items-center justify-start px-2 border-b border-b-slate-200`}
                          >
                            <p className={` px-2.5 py-2 rounded-xl`}>
                              {task.status}
                            </p>
                          </div>
                          <div
                            className={`
                          w-44 text-[14px] text-gray-800 border-r border-r-slate-200 h-12 flex items-center justify-start px-2 border-b border-b-slate-200`}
                          >
                            <p className={` px-2.5 py-2 rounded-xl`}>
                              {task.type}
                            </p>
                          </div>
                          <div className="w-44 text-[12px] text-gray-800 h-12 border-r border-r-slate-200 flex items-center justify-start px-2 border-b border-b-slate-200">
                            {task.dueDate?.slice(0, 10) || "--"}
                          </div>

                          <div
                            className={`
                          w-44 text-[14px] text-gray-800 border-r border-r-slate-200 h-12 flex items-center justify-start px-2 border-b border-b-slate-200`}
                          >
                            <p className={` px-2.5 py-2 rounded-xl`}>
                              {task?.priority === "None" ? "--" : task.priority}
                            </p>
                          </div>

                          <div
                            className={`
                          w-44 text-[14px] text-gray-800 border-r border-r-slate-200 h-12 flex items-center justify-start px-2 border-b border-b-slate-200`}
                          >
                            <Avatar
                              sx={{ width: 28, height: 28 }}
                              alt={user.name}
                              src={user?.avatar}
                            />
                            <p className="ml-2">Me</p>
                          </div>

                          <div className="w-36 text-[12px] text-gray-800 h-12 border-r border-r-slate-200 flex items-center justify-start px-2 border-b border-b-slate-200">
                            {task?.estimatedTime?.includes("0")
                              ? "--"
                              : task.estimatedTime}
                          </div>

                          <div className="w-12 h-12 flex items-center justify-center border-b border-b-slate-200">
                            <button
                              className="flex text-[12px] text-red-500 hover:text-red-600 transition-all duration-200 cursor-pointer"
                              onClick={() => handleDelete(task?._id)}
                            >
                              delete
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                  {/*All Tasks  */}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <AddTaskDialog
        isOpen={isTaskOpen}
        onClose={handleClose}
        owner={user._id}
        getTasksfxn={getTasks}
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
