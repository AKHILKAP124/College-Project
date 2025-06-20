import { Avatar } from "@mui/material";
import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

export default function UpdateProjectDialog({
  onClose,
  isOpen,
  project,
  getProjects,
}) {
  const projectMembers = project?.members;
  const user = useSelector((state) => state.user);
  const userMembers = useSelector((state) => state.userMember?.members);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [openMembers, setOpenMembers] = useState(false);
  const [admin, setAdmin] = useState(true);
  const [selectedMembers, setSelectedMembers] = useState([]);

  if (!isOpen) return null;

  const handleReset = () => {
    document.getElementById("projectName").value = project?.name;
    setInputValue("");
    setSelectedMembers([]);
    setLoading(false);
    setOpenMembers(false);
    setAdmin(true);
  };

  const handleSave = () => {
    setLoading(true);
    const projectData = {
      id: project?._id,
      name: inputValue,
    };

    if (projectData.name) {
      axios
        .put(
          `https://infra-backend-one.vercel.app/api/project/update`,
          projectData,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          if (res.status === 200) {
            toast.success(res?.data?.message);
            setTimeout(() => {
              onClose();
              getProjects();
              setLoading(false);
            }, 1000);
            return;
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data.message);
          setLoading(false);
          return;
        });
    } else {
      axios
        .post(
          `https://infra-backend-one.vercel.app/api/project/addmember`,
          {
            projectId: project?._id,
            members: selectedMembers,
          },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.status === 200) {
            toast.success(res?.data?.message);
            setTimeout(() => {
              onClose();
              window.location.reload();
              setLoading(false);
            }, 2000);
            return;
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data.message);
          setLoading(false);
          return;
        });
    }
  };

  const handleRemoveMember = (member) => {
    const memberId = member?._id;

    axios
      .post(
        `https://infra-backend-one.vercel.app/api/project/removemember`,
        { projectId: project?._id, memberId },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.status === 200) {
          toast.success(res?.data?.message);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const result = prompt(
      "Are you sure you want to delete this project? Type 'DELETE' to confirm."
    );

    if (result === "DELETE") {
      axios
        .post(
          `https://infra-backend-one.vercel.app/api/project/delete`,
          { projectId: project?._id },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          if (res.status === 200) {
            toast.success(res?.data?.message);
            setTimeout(() => {
              onClose();
              window.location.href = "/dashboard/Tasks-All-Activities&";
              window.location.reload();
            }, 2000);
            return;
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data.message);
        });
    } else {
      toast.error("Project deletion cancelled.");
      return;
    }
  };

  const handleClose = () => {
    setInputValue("");
    setLoading(false);
    setOpenMembers(false);
    setAdmin(true);
    setSelectedMembers([]);
    onClose();
  };

  // const handleAddMember = (member) => {
  //   const memberId = member?._id;

  //   if (!memberId) {
  //     toast.error("Member ID is required.");
  //     return;
  //   }

  //   axios
  //     .post(
  //       `https://infra-backend-one.vercel.app/api/project/addmember`,
  //       { projectId: project?._id, memberId },
  //       { withCredentials: true }
  //     )
  //     .then((res) => {
  //       if (res.status === 201) {
  //         toast.success(res?.data?.message);
  //         setTimeout(() => {
  //           window.location.reload();
  //         }, 2000);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       toast.error(err.response.data.message);
  //     });
  // };

  return (
    <>
      <div
        className=" fixed inset-0 bg-[#0000005e] bg-opacity-50 z-40"
        onClick={handleClose}
      ></div>
      <div className=" flex items-center justify-center ">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="text-xl font-semibold mb-4 text-gray-800 flex justify-between items-center">
            {user?._id === project?.owner?._id ? (
              <span>Update Project</span>
            ) : (
              <span>View Project</span>
            )}
            <RxCross2
              className="text-2xl hover:text-red-600 text-gray-600 "
              onClick={handleClose}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="inputField"
              className="block text-gray-700 font-medium mb-1"
            >
              Project Name
            </label>
            <input
              id="projectName"
              type="text"
              disabled={user?._id === project?.owner?._id ? false : true}
              defaultValue={project?.name}
              onChange={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setInputValue(e.target.value);
              }}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter text here"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="inputField"
              className="block text-gray-700 font-medium mb-1"
            >
              Project Admin
            </label>
            <div className="flex items-center px-3 py-1 ">
              ⭐
              <input
                id="inputField"
                type="text"
                defaultValue={project?.owner?.name}
                className="w-full px-3 py-2 text-sky-400 appearance-none focus:outline-none"
                readOnly
              />
            </div>
          </div>
          <div className="mb-4">
            Project Member's
            <ul className=" text-gray-700 font-medium mt-3 flex flex-col gap-1">
              {projectMembers?.map((member, index) => (
                <li key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 px-3 py-1 ">
                    <Avatar
                      sx={{ width: 32, height: 32 }}
                      alt={member?.name}
                      src={member?.avatar}
                    />
                    <span>{member?.name}</span>
                  </div>
                  {user?._id === project?.owner?._id && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleRemoveMember(member);
                      }}
                      className="text-red-400 hover:text-red-600 text-sm cursor-pointer"
                    >
                      remove
                    </button>
                  )}
                </li>
              ))}
              {user?._id === project?.owner?._id && (
                <li
                  className={`flex flex-col mt-2  rounded-sm border-slate-300 px-2 ${
                    openMembers ? "border" : ""
                  }`}
                >
                  <button
                    onClick={() => {
                      user?._id === project?.owner?._id
                        ? setOpenMembers(!openMembers)
                        : setAdmin(false);
                    }}
                    className={`px-4 py-1.5 text-sm text-sky-500 hover:text-sky-600 cursor-pointer ${
                      openMembers ? "hidden" : ""
                    }`}
                  >
                    {admin ? (
                      "+add Member's"
                    ) : (
                      <span className=" text-xs text-red-400">
                        Only Admin can Add Members
                      </span>
                    )}
                  </button>
                  {/* results */}
                  {openMembers && (
                    <ul className="divide-y divide-gray-200 max-h-60 overflow-y-scroll w-full">
                      {userMembers.map((member, index) => (
                        <li
                          key={index}
                          className="py-2 flex items-center justify-between cursor-pointer hover:bg-gray-100 "
                        >
                          <div className="flex items-center gap-2">
                            <img
                              src={
                                member.memberId?._id === user?._id
                                  ? member?.userId?.avatar
                                  : member?.memberId?.avatar
                              }
                              alt={
                                member.memberId?._id === user?._id
                                  ? member?.userId?.name
                                  : member?.memberId?.name
                              }
                              className="w-8 h-8 rounded-full"
                            />
                            <p>
                              {member.memberId?._id === user?._id
                                ? member?.userId?.name
                                : member?.memberId?.name}
                            </p>
                          </div>

                          <button
                            className={`" text-sm px-2 py-1  gap-1 transition-all duration-200 
                          ${
                            projectMembers
                              .map((member) => member?._id)
                              .includes(
                                member?.memberId?._id === user?._id
                                  ? member?.userId?._id
                                  : member?.memberId?._id
                              ) ||
                            selectedMembers.includes(
                              member?.memberId?._id === user?._id
                                ? member?.userId?._id
                                : member?.memberId?._id
                            )
                              ? " text-gray-500  cursor-not-allowed"
                              : "hover:bg-blue-500 text-blue-400 rounded-sm hover:text-white"
                          }`}
                            disabled={
                              projectMembers
                                .map((member) => member?._id)
                                .includes(
                                  member?.memberId?._id === user?._id
                                    ? member?.userId?._id
                                    : member?.memberId?._id
                                ) ||
                              selectedMembers.includes(
                                member?.memberId?._id === user?._id
                                  ? member?.userId?._id
                                  : member?.memberId?._id
                              )
                                ? true
                                : false
                            }
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();

                              if (
                                projectMembers.length === 1 &&
                                selectedMembers.length === 2
                              ) {
                                toast.error(
                                  "You can only add 3 members in a project"
                                );
                                return;
                              }

                              if (
                                projectMembers.length === 2 &&
                                selectedMembers.length === 1
                              ) {
                                toast.error(
                                  "You can only add 3 members in a project"
                                );
                                return;
                              }

                              if (selectedMembers.length === 3) {
                                toast.error("You have already added 3 members");
                                return;
                              }

                              setSelectedMembers((prev) => [
                                ...prev,
                                member?.memberId?._id === user?._id
                                  ? member?.userId?._id
                                  : member?.memberId?._id,
                              ]);
                            }}
                          >
                            {projectMembers
                              .map((member) => member?._id)
                              .includes(
                                member?.memberId?._id === user?._id
                                  ? member?.userId?._id
                                  : member?.memberId?._id
                              ) ||
                            selectedMembers.includes(
                              member?.memberId?._id === user?._id
                                ? member?.userId?._id
                                : member?.memberId?._id
                            )
                              ? "Added"
                              : "Add"}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              )}
            </ul>
          </div>
          {user?._id === project?.owner?._id && (
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 rounded-md bg-red-300 hover:bg-red-500 text-white cursor-pointer text-sm mr-27"
                onClick={handleDelete}
              >
                Delete Project
              </button>

              <button
                onClick={handleReset}
                className="px-4 rounded-md text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 cursor-pointer  transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={!inputValue && selectedMembers.length === 0}
                className={`px-4 py-2 text-sm rounded-md text-white transition ${
                  !inputValue && selectedMembers.length === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Saving...</span>
                  </div>
                ) : (
                  <span>Save</span>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
