import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import {
  TypeOptions,
  StatusOptions,
  PriorityOptions,
  EstimateOptions,
} from "../utils/index ";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { DatePicker, Space } from "antd";
import { CheckIcon } from "@heroicons/react/20/solid";
import Avatar from "@mui/material/Avatar";
import { Editor } from "primereact/editor";
import { useSelector } from "react-redux";

const ProjectTaskDialog = ({ isOpen, onClose, taskId, ProjectOwner }) => {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState({
    id: "",
    name: "",
    status: "",
    description: "",
    type: "",
    priority: "",
    estimatedTime: "",
    dueDate: "",
  });

  const user = useSelector((state) => state?.user);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleCloseTask = () => {
    setData({
      id: "",
      name: "",
      status: "",
      description: "",
      type: "",
      priority: "",
      estimatedTime: "",
      dueDate: "",
    });
    onClose();
  };
  const handleSave = async () => {
    setLoading(true);
    data.id = taskId?._id;
    // You can add your save logic here
    await axios
      .post(
        `https://infra-backend-lx4a.onrender.com/api/projecttask/update`,
        data,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message);
          handleCloseTask();
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleDeleteTask = async () => {
    axios
      .post(
        `https://infra-backend-lx4a.onrender.com/api/projecttask/delete`,
        { taskId: taskId?._id },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message);
          handleCloseTask();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    // <>
    //   {/* Overlay */}
    //   <div
    //     className={`fixed inset-0  transition-opacity ${
    //       isOpen
    //         ? "opacity-100 pointer-events-auto"
    //         : "opacity-0 pointer-events-none"
    //     }`}
    //     onClick={onClose}
    //   ></div>

    //   {/* Side Dialog */}
    //   <aside
    //     className={`fixed top-28 right-0 h-screen max-w-2xl w-full bg-white shadow-2xl rounded-tl-md rounded-bl-md transform transition-transform duration-300 ease-in-out ${
    //       isOpen ? "translate-x-0" : "translate-x-full"
    //     } flex flex-col`}
    //     style={{ maxHeight: "660px" }} // max height for mobile requirement
    //   >
    //     {/* Header */}
    //     <header className="flex items-center justify-between p-4 ">
    //       <h2 className="text-lg font-semibold text-gray-900">Task</h2>
    //       <button
    //         onClick={onClose}
    //         className="text-gray-600 hover:text-red-700 focus:outline-none"
    //         aria-label="Close dialog"
    //       >
    //         <svg
    //           className="h-6 w-6"
    //           fill="none"
    //           stroke="currentColor"
    //           viewBox="0 0 24 24"
    //           xmlns="http://www.w3.org/2000/svg"
    //         >
    //           <path
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             strokeWidth={2}
    //             d="M6 18L18 6M6 6l12 12"
    //           />
    //         </svg>
    //       </button>
    //     </header>

    //     {/* Content */}
    //     <div className="p-4 overflow-y-auto flex-1">
    //       <p className="text-sm text-gray-500">Name</p>
    //       <input
    //         type="text"
    //         name="name"
    //         id="name"
    //         onChange={handleOnChange}
    //         defaultValue={taskId.name}
    //         className=" text-2xl font-medium px-3 py-2 focus:outline-none"
    //       />
    //       <div className="mt-6 flex items-center gap-38 border-t border-gray-200">
    //         <p className="text-sm text-gray-500">Status</p>
    //         <select
    //           className=" rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-200 focus:bg-gray-100 cursor-pointer appearance-none"
    //           name="status"
    //           id="status"
    //           onChange={handleOnChange}
    //           defaultValue={taskId.status}
    //         >
    //           <option value="New task">New task</option>
    //           <option value="In progress">In progress</option>
    //           <option value="Completed">Completed</option>
    //         </select>
    //       </div>
    //       <div className="mt-1 flex items-center gap-38">
    //         <p className="text-sm text-gray-500">Created</p>
    //         <p className="text-normal">{taskId.createdAt}</p>
    //       </div>
    //       <div className="mt-3 pt-2  border-t border-gray-200">
    //         <p className="text-sm text-gray-500">Description</p>
    //         <textarea
    //           type="text"
    //           name="description"
    //           id="description"
    //           onChange={handleOnChange}
    //           placeholder="Enter description here..."
    //           defaultValue={taskId.description}
    //           className="w-120 h-40 border border-gray-400 rounded-md text-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-200 focus:bg-gray-100"
    //         />
    //       </div>
    //     </div>
    //     {/* Footer */}
    //     <footer className="flex justify-end p-4 border-t border-gray-200">
    //       <button
    //         onClick={handleSave}
    //         disabled={!data.name && !data.description && !data.status}
    //         className={`px-4 py-2 rounded-md text-white transition ${
    //           !data.name && !data.description && !data.status
    //             ? "bg-blue-300 cursor-not-allowed"
    //             : "bg-blue-600 hover:bg-blue-700"
    //         }`}
    //       >
    //         {loading ? "Saving..." : "Save"}
    //       </button>
    //     </footer>
    //   </aside>
    // </>
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0  bg-[#0000005e] bg-opacity-50 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={handleCloseTask}
      ></div>

      {/* Side Dialog */}
      <aside
        className={`fixed top-16 right-0 h-screen max-w-2xl w-full bg-white shadow-2xl rounded-tl-md rounded-bl-md transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } flex flex-col`}
        style={{ maxHeight: "820px" }} // max height for mobile requirement
      >
        {/* Header */}
        <header className="flex items-center justify-between p-4 ">
          <h2 className="font-medium text-gray-500">Task Details</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-red-700 focus:outline-none"
            aria-label="Close dialog"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </header>

        {/* Content */}
        <div className="p-4 overflow-y-auto flex-1">
          <input
            type="text"
            name="name"
            id="name"
            autoFocus={true}
            onChange={handleOnChange}
            defaultValue={taskId.name}
            className=" text-2xl font-medium px-3 py-2 w-full focus:outline-none"
          />
          {/* <div className="mt-6 flex items-center gap-38 border-t border-gray-200">
                <p className="text-sm text-gray-500">Status</p>
                <select
                  className=" rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-200 focus:bg-gray-100 cursor-pointer appearance-none"
                  name="status"
                  id="status"
                  onChange={handleOnChange}
                  defaultValue={taskId.status}
                >
                  <option value="New task">New task</option>
                  <option value="In progress">In progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div className="mt-1 flex items-center gap-38">
                <p className="text-sm text-gray-500">Created</p>
                <p className="text-normal">{taskId.createdAt}</p>
              </div> */}

          <div className=" w-full px-4 py-6 border-t border-sky-100">
            {/* Type */}
            <div className="mb-4 flex gap-28 items-center">
              <Listbox
                value={taskId.type}
                onChange={(e) => setData({ ...data, type: e?.value })}
                disabled={ProjectOwner !== user._id ? true : false}
              >
                <Label className="block text-sm text-gray-400 pl-2">Type</Label>
                <div className="relative mt-">
                  <ListboxButton className="grid w-full  grid-cols-1 rounded-md  py-1.5 pr-2 pl-3 text-left text-gray-800 outline-none hover:bg-sky-100 cursor-pointer appearance-none ">
                    <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
                      <span className="block truncate">
                        {data.type === "" ? taskId.type : data.type}
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
            <div className="mb-4 flex gap-26 items-center">
              <Listbox
                value={taskId.status}
                onChange={(e) => setData({ ...data, status: e?.value })}
                disabled={ProjectOwner !== user._id ? true : false}
              >
                <Label className="block text-sm text-gray-400 pl-2">
                  Status
                </Label>
                <div className="relative">
                  <ListboxButton className="grid w-full  grid-cols-1 rounded-md  py-1.5 pr-2 pl-3 text-left text-gray-800 outline-none hover:bg-sky-100 cursor-pointer appearance-none ">
                    <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
                      <span className="block truncate">
                        {data.status === "" ? taskId.status : data.status}
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

            {/* Assignee */}
            <div className="mb-4 flex gap-22 items-center">
              <label
                htmlFor="assignee"
                className="block text-sm text-gray-400 pl-2"
              >
                Assignee
              </label>
              <div className="flex items-center">
                <Avatar
                  src={taskId?.assignedTo?.avatar}
                  alt={taskId?.assignedTo?.name}
                  sx={{ width: 32, height: 32 }}
                  className="rounded-full ml-2"
                />
                <span className="ml-2">{taskId?.assignedTo?.name}</span>
              </div>
            </div>

            {/* Estimated Time */}
            <div className="mb-4 flex gap-10 items-center ">
              <Listbox
                value={taskId.estimatedTime}
                onChange={(e) => setData({ ...data, estimatedTime: e?.value })}
                disabled={ProjectOwner !== user._id ? true : false}
              >
                <Label className="block text-sm text-gray-400 pl-2">
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
                        {data.estimatedTime === ""
                          ? taskId.estimatedTime
                          : data.estimatedTime}
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
            <div
              className="mb-4 flex gap-21 items-center"
              disabled={ProjectOwner !== user._id ? true : false}
            >
              <label
                htmlFor="dueDate"
                className="block text-sm w-26 text-gray-400 pl-2"
              >
                Due Date
              </label>
              <Space direction="vertical" style={{ width: "100%" }}>
                <DatePicker
                  id="dueDate"
                  disabled={ProjectOwner !== user._id ? true : false}
                  style={{
                    width: "30%",
                    border: "none",
                    background: "none",
                    color: "black",
                  }}
                  placeholder="No due date"
                  format="DD/MM/YYYY"
                  onChange={(date, dateString) =>
                    setData({ ...data, dueDate: dateString })
                  }
                />
              </Space>
            </div>

            {/* Priority */}
            <div className="mb-4 flex gap-27 items-center">
              <Listbox
                value={taskId.priority}
                onChange={(e) => setData({ ...data, priority: e?.value })}
                disabled={ProjectOwner !== user._id ? true : false}
              >
                <Label className="block text-sm text-gray-400 pl-2">
                  Priority
                </Label>
                <div className="relative">
                  <ListboxButton className="grid w-full  grid-cols-1 rounded-md  py-1.5 pr-2 pl-3 text-left text-gray-800 outline-none hover:bg-sky-100 cursor-pointer appearance-none ">
                    <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
                      <span className="block truncate text-sm">
                        {data.priority === "" ? taskId.priority : data.priority}
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

          {/* Description */}
          <div className="mt-3 pt-2  border-t border-sky-100">
            <p className="text-sm text-gray-400">Description</p>
            <Editor
              value={taskId.description}
              onTextChange={(e) =>
                setData({ ...data, description: e.htmlValue })
              }
              placeholder="Task description"
              disabled={ProjectOwner !== user._id ? true : false}
              className="w-full h-52 rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        {/* Footer */}
        <footer
          className={`${
            ProjectOwner === user._id ? "" : "hidden"
          } flex justify-end gap-4 p-4 border-t border-gray-200`}
        >
          <button
            onClick={handleDeleteTask}
            className="px-4 text-sm rounded-md text-red-500 bg-red-300 cursor-pointer"
          >
            Delete
          </button>
          <button
            onClick={handleSave}
            disabled={
              !data.name &&
              !data.description &&
              !data.status &&
              !data.type &&
              !data.priority &&
              !data.estimatedTime &&
              !data.dueDate
            }
            className={`px-4 py-2 text-sm rounded-md text-white transition ${
              !data.name &&
              !data.description &&
              !data.status &&
              !data.type &&
              !data.priority &&
              !data.estimatedTime &&
              !data.dueDate
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </footer>
      </aside>
    </>
  );
};

export default ProjectTaskDialog;
