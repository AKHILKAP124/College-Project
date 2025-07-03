import React, { useState } from "react";
import { Editor } from "primereact/editor";
import { NavLink, useNavigate } from "react-router-dom";
import { CgCheckR, CgMathPlus, CgNotes } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import { setUser } from "../redux/userSlice";
import { Avatar, AvatarGroup } from "@mui/material";
import { FaUser } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import NotesEditor from "../components/NotesEditor";
import { GoTrash } from "react-icons/go";
import { convert } from "html-to-text";

const Notes = () => {
  const [hidden, setHidden] = useState("hidden");
  const [note, setNote] = useState([]);
  const [openEditor, setOpenEditor] = useState(false);
  const [selectedNote, setSelectedNote] = useState([]);

  const user = useSelector((state) => state.user);
  const members = useSelector((state) => state.userMember.members);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const convertOptions = {
    wordwrap: 130,
    // ...
  };

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

  const handleClick = () => {
    setHidden((prev) => (prev === "hidden" ? "" : "hidden"));
  };

  const getNotes = async () => {
    await axios
      .post(
        `http://localhost:3000/api/note/get`,
        { owner: user?._id },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setNote(res.data.notes);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    getNotes();
  }, []);

  const handleCreateNote = async () => {
    await axios
      .post(
        `http://localhost:3000/api/note/create`,
        { owner: user?._id, title: "", content: "" },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.status === 201) {
          toast.success(res.data.message);
          setNote((prev) => [...prev, res.data.note]);
          getNotes();
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  return (
    <>
      <div className="w-full h-full flex ">
        {/* Tools */}
        <div className="w-40 h-screen shadow-md shadow-blue-100 bg-blue-50 p-2 border-r border-r-slate-200">
          <p className="text-sm font-normal ml-1 text-gray-600 mt-8">Tools</p>
          <NavLink
            className={({ isActive }) =>
              `${
                isActive
                  ? "shadow-md shadow-slate-300 text-blue-400 border bg-white"
                  : "text-gray-600"
              } flex items-center  font-medium mt-4 px-2 py-2 rounded-md  gap-2 `
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
                  ? "shadow-md shadow-slate-300 text-blue-400 bg-white "
                  : "text-gray-600"
              } flex items-center  font-medium mt-2  px-2 py-2 rounded-md  gap-2 `
            }
            to="/dashboard/notes"
          >
            <CgNotes className="text-2xl " />
            <span className="text-[14px]">Notes</span>
          </NavLink>
        </div>

        <div className="w-full h-screen ">
          <div className="w-full bg-white h-18 flex items-center justify-center border-b border-b-slate-200">
            <div className="w-full h-10 flex items-center justify-between px-4">
              <button
                className="flex  items-center gap- text-sm bg-[#048bec] hover:bg-[#0576c7] text-white py-2 px-4 rounded-3xl ml-4 hover:scale-102 transition-all duration-200 cursor-pointer"
                onClick={() => handleCreateNote()}
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
                            alt={member?.memberId?.name}
                            src={member?.memberId?.avatar}
                            sx={{ width: 32, height: 32 }}
                            title={member?.memberId?.name}
                            className="cursor-pointer hover:scale-105 transition-all duration-200"
                            onClick={() =>
                              navigate(
                                "/members/profile/" + member.memberId._id
                              )
                            }
                          />
                        );
                    })}
                  </AvatarGroup>
                )}
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 relative">
                    <div className="h-10 border-l border-l-slate-300"></div>
                    {/* <div
                    onClick={() => {
                      handleNotification();
                    }}
                  >
                    <Notification_Bell notification={notification} />
                  </div>
                  {isNotificationOpen && (
                    <div className="absolute top-full right-0  w-50 h-40 rounded-md bg-sky-50 border border-sky-100"></div>
                  )} */}
                  </div>
                  <Avatar
                    alt={user?.name}
                    src={user?.avatar}
                    sx={{ width: 40, height: 40 }}
                    onClick={() => handleClick()}
                    title={user?.name}
                    className="cursor-pointer hover:scale-105 transition-all duration-200"
                  />
                </div>

                <div
                  className={`absolute w-44 py-2 bg-white border border-slate-200 rounded-sm top-18 right-4 ${hidden}`}
                >
                  <div className="flex items-center gap-1 w-full h-12 border-b border-b-slate-200 px-4">
                    <Avatar
                      alt={user?.name}
                      src={user?.avatar}
                      sx={{ width: 28, height: 28 }}
                    />
                    <p className="text-sm">{user?.name}</p>
                  </div>
                  <div className="w-full h-fit p-2 ">
                    <div
                      className="text-sm px-3 py-2 rounded-md flex items-center gap-1 hover:bg-gray-100 transition-all duration-200 cursor-pointer "
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        navigate("/user/profile");
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
          {/* Divider */}
          <div className="w-full h-1 bg-blue-50 "></div>

          {/* Notes Section */}
          <div className="w-full h-[calc(100vh-78px)] flex ">
            {/* All User Notes */}
            <div className="h-full w-62 bg-white border-r border-r-slate-200">
              {note.length > 0 ? (
                <div className="h-full w-full">
                  {note.map((note) => (
                    <div
                      key={note._id}
                      className="h-20 w-full bg px-3 py-2 bg-sky-50 hover:bg-sky-100 transition-all duration-200 cursor-pointer border-b border-b-slate-200 flex items-center gap-2 relative group"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        // Close the editor if it's open

                        setOpenEditor(false);
                        setSelectedNote([]);
                        setTimeout(() => {
                          setSelectedNote(note);
                          setOpenEditor(true);
                        }, 500);
                      }}
                    >
                      <div className="h-full w-1 bg-sky-600"></div>
                      <div className=" absolute top-8 right-4 hidden group-hover:block">
                        <GoTrash
                          className=" text-red-500 cursor-pointer hover:scale-105 transition-all duration-200"
                          onClick={async (e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            try {
                              await axios
                                .post(
                                  `http://localhost:3000/api/note/delete`,
                                  { id: note._id },
                                  {
                                    withCredentials: true,
                                  }
                                )
                                .then((res) => {
                                  if (res.status === 200) {
                                    toast.success(res.data.message);
                                    setNote((prev) =>
                                      prev.filter((n) => n._id !== note._id)
                                    );
                                    // Close the editor if it's open
                                    setOpenEditor(false);
                                    setSelectedNote([]);
                                  }
                                })
                                .catch((err) => {
                                  console.log(err);
                                  toast.error(err.response.data.message);
                                });
                            } catch (error) {
                              console.error("Error deleting note:", error);
                            }
                          }}
                        />
                      </div>
                      <div className="h-full overflow-hidden text-nowrap">
                        <p className="text-sm font-normal">{note.title}</p>
                        <p className="text-xs text-gray-500">
                          {note?.content === "no text yet"
                            ? "no text yet"
                            : note?.content === "" || note?.content === null
                              ? "no text yet"
                              : convert(note?.content, convertOptions).slice(0, 30)}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          {note.updatedAt.slice(0, 10)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-20 w-full flex items-center justify-center">
                  <h1 className="text-sm italic text-gray-400">No Notes yet</h1>
                </div>
              )}
            </div>

            {openEditor && (
              <div className="h-full w-full bg-white">
                <NotesEditor note={selectedNote} getNotes={getNotes} />
              </div>
            )}
          </div>

          {/* Notes Section */}
        </div>
      </div>
    </>
  );
};

export default Notes;
