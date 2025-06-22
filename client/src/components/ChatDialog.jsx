import { Avatar } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSelector } from "react-redux";
import axios from "axios";
import { BsChatText } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { TbMessages } from "react-icons/tb";
import socket from "../utils/socket";

const ChatDialog = ({ isOpen, onClose }) => {
  const { id } = useParams();
  var [project, setProject] = useState([]);
  const [messages, setMessages] = useState([]);
  // const [messageReceived, setMessageReceived] = useState("");
  const [messageLoading, setMessageLoading] = useState(false);
  const [sending, setSending] = useState(false);

  const user = useSelector((state) => state?.user);

  const [input, setInput] = useState("");
  const [members, setMembers] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  // Fetch project details when dialog opens or id changes
  const fetchProjectDetails = () => {
    // Fetch project details by ID
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
          setMessageLoading(false);
          return;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setMessageLoading(true);
    // Fetch project details
    fetchProjectDetails();
  }, [isOpen, id]);

  // Scroll to the bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Function to receive a message
  useEffect(() => {
    // Listen for incoming messages
    if (socket) {
      socket.on("received message", ({ sender, message }) => {
        axios
          .post(
            "https://infra-backend-lx4a.onrender.com/api/user/getbyid",
            { userId: sender },
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            if (res.status === 200) {
              setMessages((prevMessages) => [
                ...prevMessages,
                { sender: res?.data?.user, content: message },
              ]);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return; // Prevent sending empty messages
    setSending(true);
    const chatData = {
      content: input,
      sender: user?._id,
      receiver: project?._id,
    };

    axios
      .post(
        "https://infra-backend-lx4a.onrender.com/api/message/new",
        chatData,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          socket.emit("new message", {
            projectId: project?._id,
            sender: user?._id,
            message: input,
          });
          setInput("");
          setSending(false);
        }
      });
  };

  useEffect(() => {
    setMessageLoading(true);
    axios
      .post(
        "https://infra-backend-lx4a.onrender.com/api/message/get",
        { projectId: project?._id },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.status === 200) {
          setMessages(res?.data?.messages);
          setMessageLoading(false);
        }
      });

    if (socket) {
      socket.emit("join project", project?._id);
    }
  }, [project]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const adjustHeight = () => {
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = "auto"; // reset height
      ta.style.height = ta.scrollHeight + "px"; // set to scrollHeight to auto grow
    }
  };
  // Adjust height on message change
  useEffect(() => {
    adjustHeight();
  }, [input]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0  transition-opacity backdrop-blur-[2px] ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      ></div>

      {/* Side Dialog */}
      <aside
        className={`fixed top-12 right-0 h-screen max-w-xl w-full  border border-gray-400 shadow-2xl rounded-tl-md rounded-bl-md transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } flex flex-col`}
        style={{ maxHeight: "700px" }} // max height for mobile requirement
      >
        {/* Header */}
        <header className="flex items-center justify-between px-4 py-2 bg-[#0f0f0f] text-blue-100 rounded-tl-md border-b border-b-gray-900 ">
          <h2 className="text-lg font-medium  ">
            {project?.name}{" "}
            <span className="font-normal text-[14px]">Chat</span>
          </h2>
          <div className=" flex items-center gap-4 relative ">
            {!members && (
              <BsThreeDotsVertical
                className="text-gray-400 cursor-pointer hover:text-blue-600"
                onClick={() => {
                  setMembers(!members);
                  setTimeout(() => {
                    setMembers(false);
                  }, 5000);
                }}
              />
            )}
            {members && (
              <div className="min-w-38 w-fit min-h-14 h-fit px-2 py-2 overflow-hidden absolute top-4 right-10 z-10 rounded-md bg-[#1c1b1b]">
                <div className="text-[14px] text-gray-200 mb-2 border-b border-b-[#282828]">
                  Members
                </div>
                <div className=" w-fit flex items-center gap-1 mb-1">
                  <Avatar
                    alt={project?.owner?.name}
                    src={project?.owner?.avatar}
                    sx={{ width: 22, height: 22 }}
                  />
                  <p
                    className={`text-[14px] text-nowrap  flex items-center ${
                      project?.owner?.name === user?.name
                        ? "font-semibold text-blue-500"
                        : "text-gray-400"
                    }`}
                  >
                    {project?.owner?.name === user?.name
                      ? "You"
                      : project?.owner?.name}
                    <span className="text-xs text-gray-500 ml-3">(Admin)</span>
                  </p>
                </div>

                {project?.members?.map((member) => {
                  return (
                    <div
                      className=" w-fit flex items-center gap-1 mb-1"
                      key={member?._id}
                    >
                      <Avatar
                        alt={member?.name}
                        src={member?.avatar}
                        sx={{ width: 22, height: 22 }}
                      />
                      <p
                        className={`text-[14px] text-nowrap  flex items-center ${
                          member?.name === user?.name
                            ? "font-semibold text-blue-500"
                            : "text-gray-400"
                        }`}
                      >
                        {member?.name === user?.name ? "You" : member?.name}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-red-700 focus:outline-none"
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
          </div>
        </header>

        {/* Content */}
        <div className="overflow-y-auto flex-1">
          <div className="flex flex-col h-full rounded-bl-md overflow-hidden">
            {/* Messages */}
            <div
              className="flex-1 p-4 noscrollbar overflow-y-auto bg-white  space-y-3"
              style={{
                backgroundImage:
                  "url('https://i.ibb.co/hJwZCLBV/Pretty-Wallpapers.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundBlendMode: "mix",
              }}
            >
              {messageLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-200"></div>
                </div>
              ) : messages.length === 0 ? (
                <div className=" text-gray-500 text-center mt-4">
                  <TbMessages className="inline-block mb-2 text-4xl" />
                  <p className="text-sm">Start chatting with your team!</p>
                </div>
              ) : (
                messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex flex-col ${
                      message?.sender?._id === user._id
                        ? "items-end"
                        : "items-start"
                    }`}
                  >
                    <div className=" w-fit flex items-center mb-0.5">
                      <Avatar
                        alt={message?.sender?.name}
                        src={message?.sender?.avatar}
                        sx={{ width: 22, height: 22 }}
                      />
                    </div>

                    <div
                      className={`max-w-[70%]  py-2 flex gap-3  text-sm relative rounded-lg whitespace-pre-wrap ${
                        message?.sender?._id != user?._id
                          ? "bg-[#414141f9] text-gray-200 rounded-tl-none flex-row-reverse pr-4 pl-3 ml-8"
                          : "bg-blue-500 text-gray-200 rounded-tr-none mr-8 pr-3 pl-4 "
                      }`}
                    >
                      <div
                        className={`"text-gray-300 text-[9px] absolute bottom-0 mt-3 ${
                          message?.sender?._id != user?._id
                            ? "-right-12 "
                            : "-left-12"
                        }`}
                      >
                        {message?.createdAt ||
                          new Date().toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })}
                      </div>

                      {message?.content}
                    </div>
                    {/* <div className="animate-pulse bg-gray-300 h-1 w-1 rounded-full mt-1" /> */}

                    {sending && (
                      <div
                        className={`text-white text-[9px] ${
                          message?.sender?._id === user?._id ? "mr-4" : "hidden"
                        }`}
                      >
                        sending...
                      </div>
                    )}
                  </div>
                ))
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Inputs */}
            <div
              className=" p-4 "
              style={{
                backgroundImage:
                  "url('https://i.ibb.co/hJwZCLBV/Pretty-Wallpapers.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundBlendMode: "mix",
              }}
            >
              {/* Person input */}
              <div
                className="flex bg-[#212121e8] py-3 px-4 rounded-2xl
               "
              >
                <textarea
                  rows={1}
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e?.target?.value)}
                  onKeyDown={(e) => handleKeyDown(e)}
                  placeholder="Type a message..."
                  className="w-full text-sm max-h-32 resize-none placeholder:text-gray-400  text-white focus:outline-none "
                  style={{ lineHeight: "1.3rem" }}
                />
                <button
                  onClick={sendMessage}
                  disabled={input.trim() === ""}
                  className={`px-2 text- font-medium text-blue-500 disabled:text-blue-200 hover:text-blue-600 transition cursor-pointer ${
                    input.trim() === "" ? "hidden" : " block "
                  }`}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default ChatDialog;
