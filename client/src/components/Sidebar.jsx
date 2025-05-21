import React from "react";
import Avatar from "@mui/material/Avatar";
import Dialog from "./Dialog";
import { useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { HiOutlinePlusSmall } from "react-icons/hi2";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import AddProjectDialog from "./AddProjectDialog";
import { useDispatch, useSelector } from "react-redux";
import SearchMember from "./SearchMember";
import ProjectSideDialog from "./ProjectSideDialog";
import { useEffect } from "react";
import axios from "axios";
import { setUserMember } from "../redux/memberSlice";
import { use } from "react";
import { PiDotsThreeOutlineVerticalThin } from "react-icons/pi";
import UpdateProjectDialog from "./UpdateProjectDialog";


const Sidebar = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [workspaceName, setWorkspaceName] = useState("My Workspace");
  const [changedName, setChangedName] = useState("My Workspace");
  const [isTeamOpen, setIsTeamOpen] = useState(false);
  const [teamDialogOpen, setTeamDialogOpen] = useState(false);
  const [isProjectOpen, setIsProjectOpen] = useState(false);
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);
  const [isProjectSideDialogOpen, setIsProjectSideDialogOpen] = useState(false)
  const [isUpdateProjectDialogOpen, setIsUpdateProjectDialogOpen] = useState(false)
  const [sendProject, setSendProject] = useState({});
  const [projectData, setProjectData] = useState([]);
  const [members, setMembers] = useState([]);

  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .post("http://localhost:3000/api/member/get", { userId: user._id }, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          setMembers(res?.data?.members);
          dispatch(setUserMember(res?.data?.members));
          console.log(members, "members");
        }
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .post(
        "http://localhost:3000/api/project/getuserallprojects",
        { id: user?._id },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          console.log(res?.data?.projects);
          setProjectData(res?.data?.projects);
          console.log(members, "members");
        }
      })
      .catch((err) => {
        console.log(err);
      });
      
  }, [user]);

use
  return (
    <>
      <div className="h-screen w-64 dark:bg-[var(--sidebar-bg)] bg-[#0f1d40]  flex flex-col justify-start">
        <div className=" w-full h-14 border-b border-b-slate-700 flex items-center">
          <div className="flex items-center justify-center w-fit gap-1.5 cursor-pointer group ml-4">
            <Avatar
              alt={user.name}
              src={user.avatar}
              sx={{ width: 26, height: 26 }}
            />
            <p
              className=" text-sm font-[400] text-white group-hover:text-blue-500 group-hover:font-normal transition-all duration-200"
              onClick={() => setIsDialogOpen(true)}
            >
              {workspaceName}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-start justify-center border-b border-b-slate-700 w-full h-16 px-2">
          <NavLink
            className={({ isActive }) =>
              `${
                isActive ? "bg-[#2d4071]" : ""
              } flex items-center justify-start w-full gap-1 cursor-pointer grouphover:border px-4 py-1.5 rounded-md border-slate-700 hover:bg-[#2d4071] transition-all duration-200`
            }
            to="/dashboard/tasks-All-Activities&"
          >
            <Avatar
              alt={user.name}
              src={user.avatar}
              sx={{ width: 24, height: 24 }}
            />
            <p className=" text-sm font-[400] text-white ">My All Activties</p>
          </NavLink>
        </div>

        {/* Team Section */}
        <div
          className="w-full px-2 my-4"
          onClick={() => {
            setIsTeamOpen((prev) => !prev);
          }}
        >
          <div className="flex items-center justify-start text-xl text-[#89909d] w-full gap-1 hover:bg-[#2a426a5d] transition-all duration-200 cursor-pointer px-2 py-1.5 rounded-md">
            <div className="flex items-center justify-start text-xl text-[#89909d] w-full gap-1">
              <MdOutlineKeyboardArrowDown
                className={isTeamOpen ? "hidden" : ""}
              />
              <MdOutlineKeyboardArrowUp
                className={isTeamOpen ? "" : "hidden"}
              />
              <p className="text-sm font-[400] ">Team Member's</p>
            </div>
            <div className="flex items-center justify-center group transition-all duration-200 cursor-pointer px-2 py-1.5">
              <HiOutlinePlusSmall
                className="text-[#89909d] text-xl group-hover:text-blue-500"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setTeamDialogOpen(true);
                }}
              />
            </div>
          </div>
          <div
            className={`flex flex-col items-start justify-center w-full gap-1.5 mt-2 ${
              isTeamOpen ? "" : "hidden"
            }`}
          >
            {members.map((member, index) => (
              <NavLink
                className={({ isActive }) =>
                  `${
                    isActive ? "bg-[#2d4071]" : ""
                  } flex items-center  w-full gap-2 cursor-pointer grouphover:border px-4 py-1.5 rounded-md border-slate-700 hover:bg-[#2d4071] transition-all duration-200`
                }
                to={`/members/profile/${
                  member?.memberId._id === user._id
                    ? member?.userId._id
                    : member?.memberId._id
                }`}
                key={index}
              >
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
                  sx={{ width: 24, height: 24 }}
                />
                <p className=" text-sm font-[400] text-white ">
                  {
                    member?.memberId._id === user?._id
                      ? member?.userId.name
                      : member?.memberId.name
                  }
                </p>
              </NavLink>
            ))}
          </div>
        </div>

        {/* Projects Section */}
        <div
          className="w-full px-2"
          onClick={() => {
            setIsProjectOpen((prev) => !prev);
          }}
        >
          <div className="flex items-center justify-start text-xl text-[#89909d] w-full gap-1 hover:bg-[#2a426a5d] transition-all duration-200 cursor-pointer px-2 py-1.5 rounded-md">
            <div className="flex items-center justify-start text-xl text-[#89909d] w-full gap-1">
              <MdOutlineKeyboardArrowDown
                className={isProjectOpen ? "hidden" : ""}
              />
              <MdOutlineKeyboardArrowUp
                className={isProjectOpen ? "" : "hidden"}
              />
              <p className="text-sm font-[400] ">Projects</p>
            </div>
            <div className="flex items-center justify-center group transition-all duration-200 cursor-pointer px-2 py-1.5">
              <HiOutlinePlusSmall
                className="text-[#89909d] text-xl group-hover:text-blue-500"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setIsProjectDialogOpen(true);
                }}
              />
            </div>
          </div>
          <div
            className={`flex flex-col items-start justify-center w-full gap-1.5 mt-2 ${
              isProjectOpen ? "" : "hidden"
            }`}
          >
            {projectData?.map((item, index) => (
              <NavLink
                key={index}
                className={({ isActive }) =>
                  `${
                    isActive ? "bg-[#2d4071]" : ""
                  } flex items-center justify-between w-full gap-1 cursor-pointer grouphover:border px-4 py-1.5 rounded-md border-slate-700 hover:bg-[#2d4071] transition-all duration-200`
                }
                to={`/dashboard/Projects-&/${item?._id}`}
              >
                <p className=" text-sm font-[400] text-white ">{item.name}</p>
                <PiDotsThreeOutlineVerticalThin className="text-white text-lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setSendProject(item);
                    setIsUpdateProjectDialogOpen(true);
                  }}
                />
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      {/* Dialog Section */}

      {/* Workspace Dialog  */}
      <Dialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title="Workspace Settings"
      >
        <div>
          <div className="flex flex-col gap-2">
            <label htmlFor="workspace-name" className="text-sm text-gray-700">
              Workspace Name
            </label>
            <input
              type="text"
              id="workspace-name"
              defaultValue={workspaceName}
              maxLength={16}
              onChange={(e) => setChangedName(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={() => {
              setWorkspaceName(changedName);
              setChangedName("");
              setIsDialogOpen(false);
            }}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all duration-200"
          >
            Save
          </button>
        </div>
      </Dialog>

      {/*AddProjectDialog */}
      <AddProjectDialog
        onClose={() => {
          setIsProjectDialogOpen(false);
        }}
        isOpen={isProjectDialogOpen}
      />
      {/* Members Dialog */}
      <SearchMember
        isOpen={teamDialogOpen}
        onClose={() => setTeamDialogOpen(false)}
      />
      {/* Projects Dialog */}
      <ProjectSideDialog
        isOpen={isProjectSideDialogOpen}
        onClose={() => setIsProjectSideDialogOpen(false)}
      />
      <UpdateProjectDialog 
        isOpen={isUpdateProjectDialogOpen}
        onClose={() => setIsUpdateProjectDialogOpen(false)}
        project={sendProject}
      />
    </>
  );
};

export default Sidebar;
