import { Avatar } from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const MemberProfile = () => {
  const id = useParams().id;

  const navigate = useNavigate();

  const userdetail = useSelector((state) => state.user._id);

  const [user, setUser] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [userloading, setUserloading] = React.useState(false);

  useEffect(() => {
    setUserloading(true);
    axios
      .post(
        `http://localhost:3000/api/user/getUserById`,
        { id },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setUser(res?.data?.user);
          console.log(res?.data?.user, "member");
          setUserloading(false);

          return;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleOnRemove = async () => {
    setLoading(true);

    const data = {
      userId: userdetail,
      memberId: id,
    };

    console.log(data);

    axios
      .post(`http://localhost:3000/api/member/delete`, data, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success(res?.data?.message);
          setTimeout(() => {
            navigate("/dashboard/tasks-All-Activities&");
            window.location.reload();
            setLoading(false);
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="h-screen w-full px-6 py-4">
        <h1 className="text-2xl font-medium border-b pb-2 border-b-gray-300  ">
          Member Profile
        </h1>
        {userloading ? (
          <div className="flex items-center justify-center h-screen">
            Loading...
          </div>
        ) : (
          <div className="size-full py-8 flex items-start flex-col ">
            <div className="flex items-center">
              <Avatar
                sx={{ width: 200, height: 200 }}
                alt={user.name}
                src={user.avatar}
              />
            </div>
            <div className="flex flex-col gap-3  p-4  mt-6">
              <div className="flex items-center gap-8">
                <p className="text-gray-500 text-[18px] font-medium">Name:</p>
                <p>{user?.name}</p>
              </div>

              <div className="flex items-center gap-9">
                <p className="text-gray-500 text-[18px] font-medium">Email:</p>
                <p>{user?.email}</p>
              </div>
              <div className="flex items-center gap-6">
                <p className="text-gray-500 text-[18px] font-medium">Joined:</p>
                <p>{user?.createdAt?.slice(0, 10)}</p>
              </div>
            </div>
            <div className="w-full h-20 flex items-center gap-6  ">
              {/* <button
                className="px-3 py-2 bg-red-400 font-medium rounded-md cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  navigate("/dashboard/tasks-All-Activities&");
                }}
              >
                Back
              </button> */}
              <button
                className={`px-4 py-2 rounded-md text-white transition bg-blue-600 hover:bg-blue-700 cursor-pointer ${
                  loading && "cursor-not-allowed pointer-events-none"
                }`}
                onClick={handleOnRemove}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      viewBox="3 3 18 18"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 3v2a9 9 0 1 0 9 9h2a11 11 0 1 1-11-11z"
                        fill="currentColor"
                      />
                    </svg>
                    <span className="ml-2">Removing...</span>
                  </span>
                ) : (
                  "Remove Member"
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MemberProfile;
