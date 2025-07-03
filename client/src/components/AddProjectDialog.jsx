import { Avatar } from "@mui/material";
import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";
import { TiStar } from "react-icons/ti";
import { MultiSelect } from "primereact/multiselect";
import { classNames } from "primereact/utils";

export default function AddProjectDialog({ onClose, isOpen, getProjects }) {
  const user = useSelector((state) => state.user);
  const userMembers = useSelector((state) => state.userMember?.members);

  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState([]);

  if (!isOpen) return null;

  const handleCancel = () => {
    setInputValue("");
    setSelectedMembers([]);
    setLoading(false);
    onClose();
  };

  const handleReset = () => {
    setInputValue("");
    setSelectedMembers([]);
  };

  const handleSave = () => {
    setLoading(true);
    const members = []

    for (const member of selectedMembers) {
      (member.memberId._id === user._id) ? members.push(member.userId._id) : members.push(member.memberId._id)
    }
    const projectData = {
      name: inputValue,
      owner: user?._id,
      members
    };
    axios
      .post(`http://localhost:3000/api/project/add`, projectData, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success(res?.data?.message);
          setTimeout(() => {
            handleCancel();
            getProjects();
            setLoading(false);
          }, 1000);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  const TRANSITIONS = {
    overlay: {
      timeout: 150,
      classNames: {
        enter: "opacity-0 scale-75",
        enterActive:
          "opacity-100 !scale-100 transition-transform transition-opacity duration-150 ease-in",
        exit: "opacity-100",
        exitActive: "!opacity-0 transition-opacity duration-150 ease-linear",
      },
    },
  };

  const Tailwind = {
    multiselect: {
      root: ({ props }) => ({
        className: classNames(
          "inline-flex cursor-pointer select-none",
          "bg-white dark:bg-gray-900 focues:outline-none  dark:border-blue-900/40  transition-colors duration-200 ease-in-out rounded-md",
          "w-full h-10",
          {
            "opacity-60 select-none pointer-events-none cursor-default":
              props.disabled,
          }
        ),
      }),
      labelContainer: "overflow-hidden flex flex-auto cursor-pointer",
      label: ({ props }) => ({
        className: classNames(
          "block overflow-hidden whitespace-nowrap cursor-pointer overflow-ellipsis",
          "text-sky-700 dark:text-white/80",
          "transition duration-200 text-sm p-0",
          {
            "!p-3":
              props.display !== "chip" &&
              (props.value == null || props.value == undefined),
            "!py-1.5 px-3": props.display === "chip" && props.value !== null,
          }
        ),
      }),
      token: {
        className: classNames(
          "py-0 px-2 mr-2 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white/80 rounded-full",
          "cursor-default inline-flex items-center"
        ),
      },
      removeTokenIcon: "ml-2",
      trigger: {
        className: classNames(
          "flex items-center justify-center shrink-0",
          "bg-transparent text-gray-600 dark:text-white/70 w-12 rounded-tr-lg rounded-br-lg"
        ),
      },
      panel: {
        className: classNames(
          "bg-white dark:bg-gray-900 text-gray-700 dark:text-white/80 border-0 rounded-md shadow-lg"
        ),
      },
      header: {
        className: classNames(
          "p-3 border-b border-gray-300 dark:border-blue-900/40 text-gray-700 dark:text-white/80 bg-gray-100 dark:bg-gray-800 rounded-t-lg",
          "flex items-center justify-between"
        ),
      },
      headerCheckboxContainer: {
        className: classNames(
          "inline-flex cursor-pointer select-none align-bottom relative",
          "mr-2",
          "w-6 h-6"
        ),
      },
      headerCheckbox: {
        root: ({ props }) => ({
          className: classNames(
            "flex items-center justify-center",
            "border-2 w-6 h-6 text-gray-600 dark:text-white/70 rounded-lg transition-colors duration-200",
            "hover:border-blue-500 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]",
            {
              "border-gray-300 dark:border-blue-900/40 bg-white dark:bg-gray-900":
                !props?.checked,
              "border-blue-500 bg-sky-500": props?.checked,
            }
          ),
        }),
      },
      headerCheckboxIcon:
        "w-4 h-4 transition-all duration-200 text-white text-base",
      closeButton: {
        className: classNames(
          "flex items-center justify-center overflow-hidden relative",
          "w-8 h-8 text-gray-500 dark:text-white/70 border-0 bg-transparent rounded-full transition duration-200 ease-in-out mr-2 last:mr-0",
          "hover:text-gray-700 dark:hover:text-white/80 hover:border-transparent hover:bg-gray-200 dark:hover:bg-gray-800/80 ",
          "focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]"
        ),
      },
      closeIcon: "w-4 h-4 inline-block",
      wrapper: {
        className: classNames(
          "max-h-[200px] overflow-auto",
          "bg-white text-gray-700 border-0 rounded-md shadow-lg",
          "dark:bg-gray-900 dark:text-white/80"
        ),
      },
      list: "py- list-none m-0",
      item: ({ context }) => ({
        className: classNames(
          "cursor-pointer font-normal overflow-hidden relative whitespace-nowrap",
          "m-0 p-3 border-0  transition-shadow duration-200 rounded-none",
          {
            "text-gray-700 hover:text-gray-800 hover:bg-gray-200 dark:text-white/80 dark:hover:bg-gray-800":
              !context.focused && !context?.selected,
            "bg-gray-300 text-gray-700 dark:text-white/80 dark:bg-gray-800/90 hover:text-gray-700 hover:bg-gray-200 dark:text-white/80 dark:hover:bg-gray-800":
              context.focused && !context?.selected,
            "bg-blue-100 text-blue-700 dark:bg-blue-400 dark:text-white/80":
              context.focused && context?.selected,
            "bg-blue-50 text-blue-700 dark:bg-blue-300 dark:text-white/80":
              !context.focused && context?.selected,
          }
        ),
      }),
      checkboxContainer: {
        className: classNames(
          "inline-flex cursor-pointer select-none align-bottom relative",
          "mr-2",
          "w-6 h-6"
        ),
      },
      checkbox: ({ context }) => ({
        className: classNames(
          "flex items-center justify-center",
          "border-2 w-8 h-8 text-gray-600 dark:text-white/80 rounded-lg transition-colors duration-200",
          "hover:border-blue-500 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]",
          {
            "border-gray-300 dark:border-blue-900/40  bg-white dark:bg-gray-900":
              !context?.selected,
            "border-blue-400 bg-sky-500": context?.selected,
          }
        ),
      }),
      checkboxIcon: "w-4 h-4 transition-all duration-200 text-white text-base",
      itemGroup: {
        className: classNames(
          "m-0 p-3 text-gray-800 bg-white font-bold",
          "dark:bg-gray-900 dark:text-white/80",
          "cursor-auto"
        ),
      },
      filterContainer: "relative",
      filterInput: {
        root: {
          className: classNames(
            "pr-7 -mr-7",
            "w-full",
            "font-sans text-base text-gray-700 bg-white py-3 px-3 border border-gray-300 transition duration-200 rounded-lg appearance-none",
            "dark:bg-gray-900 dark:border-blue-900/40 dark:hover:border-blue-300 dark:text-white/80",
            "hover:border-blue-500 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]"
          ),
        },
      },
      filterIcon: "-mt-2 absolute top-1/2",
      clearIcon: "text-gray-500 right-12 -mt-2 absolute top-1/2",
      transition: TRANSITIONS.overlay,
    },
  };

  return (
    <>
      <div
        className=" fixed inset-0 bg-[#0000005e] bg-opacity-50 z-40"
        onClick={handleCancel}
      ></div>
      <div className=" flex items-center justify-center ">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-xl p-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="text-xl font-medium mb-4 text-gray-800 flex justify-between items-center">
            <p>Create Project</p>
            <RxCross2
              className="text-2xl hover:text-red-600 text-gray-600 "
              onClick={handleCancel}
            />
          </div>
          <div className="mb-4">
            <input
              id="inputField"
              type="text"
              value={inputValue}
              onChange={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setInputValue(e.target.value);
              }}
              className="w-full border text-sm border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Project Name"
              autoFocus
              required
            />
          </div>
          <div className="mb-4">
            <heading className="block text-gray-700 text-sm font-medium mb-1">
              Members
            </heading>
            <div className="flex items-center  px-0 py-2 relative">
              <p className="text-xs text-blue-500 absolute top-0.5 -left-1.5">
                <TiStar />
              </p>
              <Avatar
                src={user?.avatar}
                alt={user?.name}
                sx={{ width: 28, height: 28 }}
              />
              <p className="ml-2 text-sm">{user?.name}</p>
            </div>
            <div className="flex justify-content-center ">
              <MultiSelect
                value={selectedMembers}
                onChange={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedMembers(e.value);
                }}
                options={userMembers}
                optionLabel={userMembers?.member?.memberId?._id === user?._id ? "userId.name" : "memberId.name" }
                placeholder="Select members"
                maxSelectedLabels={3}
                className="w-full md:w-20rem"
                pt={Tailwind.multiselect}
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 text-gray-700 transition"
            >
              Reset
            </button>
            <button
              onClick={handleSave}
              disabled={!inputValue || !selectedMembers || loading}
              className={`px-4 py-2 rounded-md text-white transition cursor-pointer ${
                !inputValue || !selectedMembers
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
