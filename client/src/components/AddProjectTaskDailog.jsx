import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Editor } from "primereact/editor";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { CheckIcon } from "@heroicons/react/20/solid";
import Avatar from "@mui/material/Avatar";
import { Calendar } from "primereact/calendar";
import { DatePicker, Space } from "antd";
import {
  TypeOptions,
  StatusOptions,
  PriorityOptions,
  EstimateOptions,
} from "../utils/index ";

export default function AddProjectTaskDialog({
  onClose,
  isOpen,
  owner,
  members,
  project,
  getProjectTasks,
}) {
  const [data, setData] = useState({
    name: "",
    description: "",
    status: "New task",
    type: "Operational",
    priority: "None",
    estimatedTime: "0s",
    dueDate: "",
    assignedTo: [],
  });
  const [loading, setLoading] = useState(false);
  const [projectManager, setProjectManager] = useState("");

  useEffect(() => {
    axios
      .post(
        `https://infra-backend-lx4a.onrender.com/api/project/getprojectmanager`,
        { projectId: project },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.status === 200) {
          setProjectManager(res?.data?.projectManager);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  }, []);

  // Close the dialog if isOpen is false
  if (!isOpen) return null;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleCancel = () => {
    setData({
      name: "",
      description: "",
      status: "New task",
      type: "Operational",
      priority: "None",
      estimatedTime: "0s",
      dueDate: "",
      assignedTo: [],
    });
    onClose();
  };

  const handleSave = async () => {
    setLoading(true);
    const taskData = {
      ownerId: owner,
      projectId: project,
      name: data.name,
      description: data.description,
      status: data.status,
      type: data.type,
      priority: data.priority,
      dueDate: data.dueDate,
      estimatedTime: data.estimatedTime,
      assignedTo: data.assignedTo,
    };

    // You can add your save logic here
    await axios
      .post(
        `https://infra-backend-lx4a.onrender.com/api/projecttask/add`,
        taskData,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message);
          setTimeout(() => {
            getProjectTasks();
            handleCancel();
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

  return (
    <>
      {/* <div
        className=" fixed inset-0 bg-[#0000005e] bg-opacity-50 z-40"
        onClick={handleCancel}
      ></div>
      <div className=" flex items-center justify-center ">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="text-xl font-semibold mb-4 text-gray-800 flex justify-between items-center">
            <p>Create Task</p>
            <RxCross2
              className="text-2xl hover:text-red-600 text-gray-600 "
              onClick={() => {
                setData({ name:"", description: "" });
                onClose();
              }}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-1"
            >
              Task Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              required
              maxLength={20}
              minLength={6}
              onChange={(e) => handleOnChange(e)}
              value={data.name}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter name here"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 font-medium mb-1"
            >
              Task Description
            </label>
            <input
              id="description"
              type="text"
              name="description"
              value={data.description}
              onChange={(e) => handleOnChange(e)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter discription here"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={handleCancel}
              className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 text-gray-700 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!data.name || !data.description}
              className={`px-4 py-2 rounded-md text-white transition ${
                !data.name || !data.description
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </div>
      </div> */}
      <div
        className=" fixed inset-0 bg-[#0000005e] bg-opacity-50 z-40"
        onClick={handleCancel}
      ></div>
      <div className=" flex items-center justify-center  ">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl h-3/5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 flex">
          <div className="w-full flex flex-col justify-between">
            <div className="p-6 w-full">
              <div className="text-xl font-semibold mb-4 text-gray-800 flex justify-between items-center">
                <p>Create Task</p>
              </div>

              <div className="mb-4">
                <input
                  id="name"
                  type="text"
                  name="name"
                  required
                  onChange={(e) => handleOnChange(e)}
                  value={data.name}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Task name"
                  autoFocus
                />
              </div>
              <div className="mb-4">
                <Editor
                  value={data.description}
                  onTextChange={(e) =>
                    setData({ ...data, description: e.htmlValue })
                  }
                  placeholder="Task description"
                  className="w-full h-52 rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            {/* Buttons */}
            <div
              className="flex justify-end space-x-3 pr-10
                   py-6 border-t border-sky-100 "
            >
              <button
                onClick={handleCancel}
                className="px-4 py-2 rounded-md text-sm hover:bg-gray-100 text-gray-400 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={!data.name}
                className={`px-3 py-3 text-sm rounded-md text-white transition cursor-pointer ${
                  !data.name
                    ? "bg-sky-300 cursor-not-allowed"
                    : "bg-sky-500 hover:bg-sky-600"
                }`}
              >
                {loading ? "Creating..." : "Create task"}
              </button>
            </div>
          </div>
          <div className=" w-76 border-l border-sky-100 bg-sky-50 rounded-tr-lg rounded-br-lg px-4 py-6">
            {/* Project Manager */}
            <div className="mb-4 space-y-1">
              <label
                htmlFor="assignee"
                className="block text-xs  text-gray-400 pl-2"
              >
                Project Manager
              </label>
              <div className="flex items-center">
                <Avatar
                  src={projectManager?.avatar}
                  alt={projectManager?.name}
                  sx={{ width: 32, height: 32 }}
                  className="rounded-full ml-2"
                />
                <span className="text-sm text-gray-700 ml-2">
                  {projectManager?.name}
                </span>
              </div>
            </div>

            {/* Type */}
            <div className="mb-4">
              <Listbox
                value={data.type}
                onChange={(e) => setData({ ...data, type: e?.value })}
              >
                <Label className="block text-xs  text-gray-400 pl-2">
                  Type
                </Label>
                <div className="relative mt-">
                  <ListboxButton className="grid w-full  grid-cols-1 rounded-md  py-1.5 pr-2 pl-3 text-left text-gray-800 outline-none hover:bg-sky-100 cursor-pointer appearance-none ">
                    <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
                      <span className="block truncate">{data.type}</span>
                    </span>
                    {/* <ChevronUpDownIcon
                            aria-hidden="true"
                            className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                          /> */}
                  </ListboxButton>

                  <ListboxOptions
                    transition
                    className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
                  >
                    {TypeOptions.map((person, i) => (
                      <ListboxOption
                        key={i}
                        value={person}
                        className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
                      >
                        <div className="flex items-center">
                          <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">
                            {person.name}
                          </span>
                        </div>

                        <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white">
                          <CheckIcon aria-hidden="true" className="size-5" />
                        </span>
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </div>
              </Listbox>
            </div>

            {/* Status */}
            <div className="mb-4">
              <Listbox
                value={data.status}
                onChange={(e) => setData({ ...data, status: e?.value })}
              >
                <Label className="block text-xs  text-gray-400 pl-2">
                  Status
                </Label>
                <div className="relative">
                  <ListboxButton className="grid w-full  grid-cols-1 rounded-md  py-1.5 pr-2 pl-3 text-left text-gray-800 outline-none hover:bg-sky-100 cursor-pointer appearance-none ">
                    <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
                      <span className="block truncate">{data.status}</span>
                    </span>
                    {/* <ChevronUpDownIcon
                            aria-hidden="true"
                            className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                          /> */}
                  </ListboxButton>

                  <ListboxOptions
                    transition
                    className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
                  >
                    {StatusOptions.map((person, i) => (
                      <ListboxOption
                        key={i}
                        value={person}
                        className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
                      >
                        <div className="flex items-center">
                          <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">
                            {person.name}
                          </span>
                        </div>

                        <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white">
                          <CheckIcon aria-hidden="true" className="size-5" />
                        </span>
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </div>
              </Listbox>
            </div>

            {/* AssignedTo */}
            <div className="mb-4">
              <Listbox
                value={data.assignedTo || "No one"}
                onChange={(e) => setData({ ...data, assignedTo: e })}
              >
                <Label className="block text-xs  text-gray-400 pl-2">
                  Assigned To
                </Label>
                <div className="relative">
                  <ListboxButton className="grid w-full  grid-cols-1 rounded-md  py-1.5 pr-2 pl-3 text-left text-gray-800 outline-none hover:bg-sky-100 cursor-pointer appearance-none ">
                    <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
                      <Avatar
                        src={data.assignedTo?.avatar}
                        alt={data.assignedTo?.name}
                        sx={{ width: 24, height: 24 }}
                        className="flex-shrink-0 rounded-full"
                      />
                      <span className="block truncate">
                        {data.assignedTo?.name}
                      </span>
                    </span>
                    {/* <ChevronUpDownIcon
                            aria-hidden="true"
                            className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                          /> */}
                  </ListboxButton>

                  <ListboxOptions
                    transition
                    className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
                  >
                    {members.map((person, i) => (
                      <ListboxOption
                        key={i}
                        value={person}
                        className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
                      >
                        <div className="flex items-center">
                          <Avatar
                            src={person?.avatar}
                            alt={person?.name}
                            sx={{ width: 34, height: 34 }}
                            className="flex-shrink-0 border border-sky-500 rounded-full"
                          />
                          <span className="ml-1 block truncate font-normal group-data-selected:font-semibold">
                            {person.name}
                          </span>
                        </div>

                        <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white">
                          <CheckIcon aria-hidden="true" className="size-5" />
                        </span>
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </div>
              </Listbox>
            </div>

            {/* Estimated Time */}
            <div className="mb-4 ">
              <Listbox
                value={data.estimatedTime}
                onChange={(e) => setData({ ...data, estimatedTime: e?.value })}
              >
                <Label className="block text-xs  text-gray-400 pl-2">
                  Estimated Time
                </Label>
                <div className="relative flex">
                  <ListboxButton className=" w-full rounded-md  py-1.5 pr-2 pl-3 text-left text-gray-800 outline-none hover:bg-sky-100 cursor-pointer appearance-none flex gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="#99a1af"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
                      <span className="block truncate text-sm">
                        {data.estimatedTime}
                      </span>
                    </span>
                    {/* <ChevronUpDownIcon
                            aria-hidden="true"
                            className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                          /> */}
                  </ListboxButton>

                  <ListboxOptions
                    transition
                    className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
                  >
                    {EstimateOptions.map((person, i) => (
                      <ListboxOption
                        key={i}
                        value={person}
                        className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
                      >
                        <div className="flex items-center">
                          <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">
                            {person.name}
                          </span>
                        </div>

                        <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white">
                          <CheckIcon aria-hidden="true" className="size-5" />
                        </span>
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </div>
              </Listbox>
            </div>

            {/* Due Date */}
            <div className="mb-4">
              <label
                htmlFor="dueDate"
                className="block text-xs  text-gray-400 pl-2"
              >
                Due Date
              </label>
              <Space direction="vertical" style={{ width: "100%" }}>
                <DatePicker
                  style={{
                    width: "100%",
                    border: "none",
                    background: "none",
                    color: "black",
                  }}
                  placeholder="No due date"
                  onChange={(date, dateString) =>
                    setData({ ...data, dueDate: dateString })
                  }
                />
              </Space>
            </div>

            {/* Priority */}
            <div className="mb-4">
              <Listbox
                value={data.priority}
                onChange={(e) => setData({ ...data, priority: e?.value })}
              >
                <Label className="block text-xs  text-gray-400 pl-2">
                  Priority
                </Label>
                <div className="relative">
                  <ListboxButton className="grid w-full  grid-cols-1 rounded-md  py-1.5 pr-2 pl-3 text-left text-gray-800 outline-none hover:bg-sky-100 cursor-pointer appearance-none ">
                    <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
                      <span className="block truncate text-sm">
                        {data.priority}
                      </span>
                    </span>
                    {/* <ChevronUpDownIcon
                            aria-hidden="true"
                            className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                          /> */}
                  </ListboxButton>

                  <ListboxOptions
                    transition
                    className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
                  >
                    {PriorityOptions.map((person, i) => (
                      <ListboxOption
                        key={i}
                        value={person}
                        className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
                      >
                        <div className="flex items-center">
                          <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">
                            {person.name}
                          </span>
                        </div>

                        <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white">
                          <CheckIcon aria-hidden="true" className="size-5" />
                        </span>
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </div>
              </Listbox>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
