import React, { useEffect, useState } from "react";
import { CgCheckR, CgChevronDown, CgMathPlus, CgNotes } from "react-icons/cg";
import Avatar from "@mui/material/Avatar";
import { FaUser } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { BsChatText } from "react-icons/bs";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "../redux/userSlice";
import toast from "react-hot-toast";
import { RiDeleteBin6Line } from "react-icons/ri";
import ChatDialog from "../components/ChatDialog";
import { useNavigate, useParams } from "react-router-dom";
import AddProjectTaskDialog from "../components/AddProjectTaskDailog";
import ProjectTaskDialog from "../components/ProjectTaskDialog";

const ProjectPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const nagivate = useNavigate();
  const user = useSelector((state) => state.user);
  const [tasks, setTasks] = useState([]);
  const [taskId, setTaskId] = useState("");
  const [projectName, setProjectName] = useState("");
  const [project, setProject] = useState([]);

  // const [messages, setMessages] = useState([]);

  const [isTaskDataOpen, setIsTaskDataOpen] = useState(false);
  const [isTasksShown, setIsTasksShown] = useState(true);

  if (user.name === "") {
    axios
      .get(`https://infra-backend-lx4a.onrender.com/api/user/getUser`, {
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
            window.location.href = "/auth/signin";
          }, 2000);
        }
        console.log(err);
      });
  }

  const getProjectTasks = async () => {
    await axios
      .post(
        `https://infra-backend-lx4a.onrender.com/api/projecttask/get`,
        { projectId: id },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setTasks(res?.data?.tasks);
          return;
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
    setTasks([]);

    getProjectTasks();

    axios
      .post(
        `https://infra-backend-lx4a.onrender.com/api/project/getbyid`,
        { projectId: id },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setProject(res?.data?.project);
          setProjectName(res?.data?.project?.name);
          return;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleLogout = async () => {
    await axios
      .get(`https://infra-backend-lx4a.onrender.com/api/user/logout`, {
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

  const [isTaskOpen, setIsTaskOpen] = React.useState();
  const handleCloseTask = () => {
    setIsTaskDataOpen(false);
    getProjectTasks();
  };

  const handleOpen = () => {
    setIsTaskOpen(true);
  };
  const handleClose = () => {
    setIsTaskOpen(false);
    getProjectTasks();
  };

  const [isChatOpen, setIsChatOpen] = React.useState(false);

  const handleChatOpen = () => {
    setIsChatOpen(true);
  };

  const handleChatClose = () => {
    setIsChatOpen(false);
  };

  const [hidden, setHidden] = React.useState("hidden");
  const handleClick = () => {
    setHidden((prev) => (prev === "hidden" ? "" : "hidden"));
  };

  const handleTaskgetbyId = async (taskId) => {
    await axios
      .post(
        `https://infra-backend-lx4a.onrender.com/api/projecttask/getbyid`,
        { taskId },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setTaskId(res?.data?.task);
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
          <p className="text-sm font-normal ml-1 text- mt-8">Tools</p>
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
          <div
            className={`${
              project?.owner?._id === user?._id ? "h-22" : "h-16"
            } w-full  flex items-center justify-center border-b border-b-slate-200`}
          >
            <div className="w-full h-full flex items-center justify-between px-4">
              <div>
                <p className="text-sm font-medium text-slate-800 ml-2 mt-4">
                  Project:{" "}
                  <span className="text-blue-500 font-semibold">
                    {projectName}
                  </span>
                </p>
                <button
                  className={`${
                    project?.owner?._id === user?._id ? " " : "hidden"
                  } flex items-center text-sm mt-2 mb-4 bg-[#048bec] hover:bg-[#0576c7] text-white py-2 px-4 rounded-3xl ml-4 hover:scale-102 transition-all duration-200 cursor-pointer`}
                  onClick={() => handleOpen()}
                >
                  <CgMathPlus className="text-lg" />
                  Add new
                </button>
              </div>
              <div>
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
          <div className="w-full h-1 bg-blue-50"></div>

          {/* <div className="w-full h-fit  border-t border-t-slate-200 ">

            <div className="w-full h-fit  justify-center ">
              <div
                className=" flex items-center justify-around w-full h-14 bg-white
                border-b border-b-slate-200 "
              >
                <div className="relative w-64 h-12 z-0 text-gray-800 text-[16px] font-medium flex items-center text-wrap">
                  Task name
                  <div className=" absolute left-24 text-[12px] bg-[#e4e6eb] text-gray-600 size-5 rounded-full flex items-center justify-center">
                    {task.length}
                  </div>
                </div>
                <p className="text-sm text-[#9b9ea1] h-12 w-20 flex items-center justify-center">
                  status
                </p>
                <p className="text-sm text-[#9b9ea1]  h-12 w-22 flex items-center justify-center">
                  create on
                </p>
                <p className="text-sm text-[#9b9ea1]  h-12 w-22 flex items-center justify-center">
                  created by
                </p>
                <div className="text-sm text-[#9b9ea1]  h-12 w-6 flex items-center justify-center">
                  {project?.owner?._id === user?._id ? (
                    <div className=" h-12 w-6 flex items-center justify-center"></div>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              {task.length === 0 ? (
                <div className="w-full h-12 flex items-center justify-center">
                  <p className="text-gray-500 font-medium">No tasks found</p>
                </div>
              ) : (
                task.map((task) => (
                  <div
                    key={task._id}
                    className="flex items-center justify-around w-full border-b border-b-slate-200 bg-white"
                  >
                    <div
                      data-id={task._id}
                      className=" w-64 h-12 text-[13px] text-gray-800  flex items-center text-wrap hover:text-blue-500 hover:underline hover:font-medium transition-all duration-200 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTaskgetbyId(e.target.dataset.id);
                        setIsTaskDataOpen(true);
                      }}
                    >
                      {task.name}
                    </div>
                    <div className="text-[13px] text-gray-800  h-12 w-26 flex items-center justify-center">
                      <p
                        className={`${
                          task.status === "New task"
                            ? "bg-gray-200"
                            : task.status === "In progress"
                            ? "bg-sky-200"
                            : "bg-green-200"
                        } px-2.5 py-2 rounded-xl`}
                      >
                        {task.status}
                      </p>
                    </div>
                    <div className="text-[13px] text-gray-800  h-12 w-22 flex items-center justify-center">
                      {task.updatedAt.slice(0, 10)}
                    </div>
                    <div className="text-[13px] text-gray-800  h-12 w-fit flex items-center">
                      <img
                        src={task.ownerId.avatar}
                        alt={task.ownerId.name}
                        className="w-5 h-5 rounded-full"
                      />
                      {task.ownerId.name}
                    </div>
                    <div className=" h-12 w-6 flex items-center justify-center">
                      

                      {project?.owner?._id === user?._id ? (
                        <button
                          className="text-[12px] text-red-500 hover:text-red-600 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            handleDelete(task?._id);
                          }}
                        >
                          delete
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div> */}

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
                    {tasks.length}
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
                        Assigned To
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
                    {tasks.length === 0 && (
                      <div className="w-full h-12 flex items-center justify-center">
                        <p className="text-gray-500 font-medium">
                          No tasks found
                        </p>
                      </div>
                    )}
                    {tasks.length > 0 &&
                      tasks.map((task) => (
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
                              alt={task.assignedTo?.name}
                              src={task.assignedTo?.avatar}
                            />
                            <p className="ml-2">{task.assignedTo?.name}</p>
                          </div>

                          <div className="w-44 text-[12px] text-gray-800 h-12  flex items-center justify-start px-2 border-b border-b-slate-200">
                            {task.estimatedTime?.includes("0")
                              ? "--"
                              : task.estimatedTime}
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
      <AddProjectTaskDialog
        isOpen={isTaskOpen}
        onClose={handleClose}
        owner={user?._id}
        members={project?.members}
        project={id}
        getProjectTasks={getProjectTasks}
      />
      <ProjectTaskDialog
        isOpen={isTaskDataOpen}
        onClose={handleCloseTask}
        taskId={taskId}
        ProjectOwner={project?.owner?._id}
      />

      {/* Chat */}
      <div className="fixed bottom-1/2 right-0 " onClick={handleChatOpen}>
        <div className="flex items-center gap-1 bg-[#048bec] hover:bg-[#0576c7] hover:scale-105 group py-4 pl-6 pr-2 cursor-pointer rounded-l-full transition-all duration-300 ease-in-out">
          <BsChatText className="text-xl text-white group-hover:text-2xl group-hover:font-semibold" />
          {/* <p className="text-sm text-gray-500 font-medium group-hover:text-gray-800 ">
          Chat
        </p> */}
          <span class="absolute -top-8 -left-[50%] -translate-x-[50%] z-20 origin-right scale-0 px-3 rounded-l-xl rounded-tr-xl border border-gray-300 bg-white py-2 text-sm font-bold shadow-md transition-all duration-300 ease-in-out group-hover:scale-100">
            Chat
          </span>
        </div>
      </div>

      {/* Chat Dialog */}
      <ChatDialog
        isOpen={isChatOpen}
        onClose={handleChatClose}
        project={project}
      />
    </>
  );
};

export default ProjectPage;
