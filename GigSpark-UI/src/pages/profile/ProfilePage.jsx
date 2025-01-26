import React, { useEffect, useState } from "react";
import { newRequest } from "../../services/newRequest";
import { User } from "../../services/api";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { FaUser } from "react-icons/fa6";
import ProfileSkeleton from "../../components/ui/shimmerUI/UserProfileSkeleton";

const ProfilePage = () => {
  const { userId } = useParams();

  const [userDetails, setUserDetails] = useState(null);
  const [showMore, setShowMore] = useState(false);

  const fetchUserDetails = async () => {
    const { VIEW_USER_PROFILE } = User;
    toast.dismiss();
    const response = await newRequest("get", VIEW_USER_PROFILE(userId), null);

    if (typeof response === "string") {
      toast.error(response);
    }

    if (response?.success) {
      toast.success(response?.message);
      setUserDetails(response?.data);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  if (!userDetails) return <ProfileSkeleton/>;

  return (
    <section className="sm:p-6">
      <div className="max-w-screen-xl mx-auto p-6 ">
        <div className="sm:p-8 bg-white sm:shadow-lg mt-24 rounded-md">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="flex max-sm:flex-wrap gap-3 text-center order-last md:order-first sm:mt-20 mt-10 md:mt-0">
              <div className="bg-gray-50 border rounded-md py-4 px-2 flex-1">
                <p className="font-bold text-gray-700 text-xl">22</p>
                <p className="text-gray-400">Rating</p>
              </div>
              <div className="bg-gray-50 border rounded-md py-4 px-2 flex-1">
                <p className="font-bold text-gray-700 text-xl">10</p>
                <p className="text-gray-400">Share Gigs</p>
              </div>
              <div className="bg-gray-50 border rounded-md py-4 px-2 flex-1">
                <p className="font-bold text-gray-700 text-xl">89</p>
                <p className="text-gray-400">Orders</p>
              </div>
            </div>

            <div className="relative">
              <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full overflow-hidden shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                {!userDetails?.profile?.url ? (
                  <FaUser className="h-24 w-24" />
                ) : (
                  <img
                    src={userDetails?.profile?.url}
                    alt=""
                    className="object-cover h-full w-full"
                  />
                )}
              </div>
            </div>

            <div className="gap-4 flex flex-wrap justify-between mt-32 md:mt-0 md:justify-center md:items-center max-sm:*:w-full px-4">
              <button className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                Connect
              </button>
              <button className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                Message
              </button>
            </div>

            <div className="mt-10 sm:mt-20 text-center border-b pb-12 md:col-span-3">
              <h1 className="text-4xl font-medium text-gray-700 capitalize">
                {userDetails?.firstName} {userDetails?.lastName}
              </h1>
              {userDetails?.location && (
                <p className=" text-gray-600 mt-3 font-normal capitalize">
                  {userDetails?.location}
                </p>
              )}
              {userDetails?.language.length > 0 && (
                <p className=" text-gray-500">
                  <span className="font-semibold">Language: </span>
                  {userDetails?.language.join(", ")}
                </p>
              )}

              {userDetails?.skills.length > 0 && (
                <p className=" mt-3 text-gray-500">
                  <span className="font-semibold">Skills: </span>
                  {userDetails?.skills.join(", ")}
                </p>
              )}
            </div>
          </div>
          {(userDetails?.heading || userDetails?.bio) && (
            <div className="mt-12 flex flex-col justify-center max-md:border-t pb-12 pt-10">
              {userDetails?.heading && (
                <p className="text-gray-600 text-center font-medium lg:px-16  text-xl md:text-3xl mb-3">
                  {userDetails?.heading}
                </p>
              )}

              {userDetails?.bio && (
                <>
                  <div className="overflow-hidden mt-6 relative">
                    <p
                      className={`text-gray-600 text-center font-light lg:px-16 `}
                    >
                      {userDetails?.bio} 
                    </p>
                    <div
                      className={`w-full h-20 rounded-md bg-gradient-to-b absolute bottom-0 from-transparent to-65% to-white ${
                        showMore ? "hidden" : "block"
                      }`}
                    ></div>
                  </div>
                  <button
                    className="text-indigo-500 py-2 px-4  font-medium mt-4"
                    onClick={() => setShowMore(!showMore)}
                  >
                    {!showMore ? "Show more" : "Show less"}
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
