import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { FaLocationDot, FaEnvelope } from "react-icons/fa6";
import { MdRecordVoiceOver } from "react-icons/md";

import StarRating from "../ui/StarRating";
import CustomToastNotification from "../../utils/CustomFun";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const UserProfileCard = ({ data, rating }) => {
  const [showMore, setShowMore] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const currentUser = useSelector(store => store?.user?.user )
  
  const navigate = useNavigate();

  const handleContactMeBtn = () => {
    if(!currentUser){
      toast.dismiss();
      CustomToastNotification();
    }else{
      navigate(`/message/${userInfo?._id}`)
    }
  }

  useEffect(() => {
    if (!data) return;
    setUserInfo(data);
  }, []);

  if (!userInfo) return;

  const {
    profile,
    firstName,
    lastName,
    skills,
    location,
    language,
    heading,
    bio,
  } = userInfo;

  const fullName = `${firstName} ${lastName}`;
  return (
    <div className="relative flex flex-col w-full min-w-0 break-words border rounded-2xl border-stone-300 shadow-lg my-8 px-6 py-6 ">
      <div className="flex-auto min-h-[70px] pb-0 bg-transparent">
        <div className="flex flex-wrap xl:flex-nowrap">
          <div className="mb-5 mr-5 w-[80px] h-[80px] lg:w-[160px] lg:h-[160px] shrink-0 rounded-2xl overflow-hidden">
            <img
              className="inline-block w-full h-full object-cover"
              src={profile?.url}
              alt={`Gig spark user | ${fullName}`}
            />
          </div>
          <div className="grow">
            <div className="flex flex-wrap items-start justify-between mb-2">
              <div className="flex flex-col">
                <div className="flex items-center mb-2">
                  <Link
                    className="text-secondary-inverse hover:text-primary transition-colors duration-200 ease-in-out font-semibold text-[1.5rem] mr-1 capitalize"
                    to={`/profile/${userInfo?._id}`}
                  >
                    {fullName}
                  </Link>
                </div>
                <div className="flex flex-wrap pr-2 mb-4 font-medium">
                  {location && (
                    <span className="flex items-center mb-2 mr-5 text-secondary-dark hover:text-primary capitalize">
                      <span className="mr-1">
                        <FaLocationDot className="w-5 h-5" />
                      </span>
                      {location}
                    </span>
                  )}
                  <span className="flex items-center mb-2 mr-5 text-secondary-dark hover:text-primary">
                    <span className="mr-2">
                      <FaEnvelope className="w-5 h-5" />
                    </span>
                    {userInfo?.email}
                  </span>

                  {language && (
                    <span className="flex items-center mb-2 mr-5 text-secondary-dark hover:text-primary">
                      <span className="mr-2">
                      <MdRecordVoiceOver className="w-5 h-5" />
                      </span>
                      {language.join(", ")}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap my-auto">
                <button
                  onClick={handleContactMeBtn}
                  className="inline-block px-5 py-3 text-base font-medium leading-normal text-center text-white align-middle transition-colors duration-150 ease-in-out border-0 shadow-none cursor-pointer rounded-lg bg-blue-500 hover:bg-blue-700 active:bg-blue-700 focus:bg-blue-700"
                >
                  Contact Me
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center">
              {skills.length > 0 &&
                skills.map((skill, index) => (
                  <span
                    key={index}
                    className="mr-3 mb-2 inline-flex items-center justify-center text-secondary-inverse rounded-full bg-neutral-100 hover:bg-neutral-200 transition-all duration-200 ease-in-out px-3 py-1 text-sm font-medium leading-normal"
                  >
                    {skill}
                  </span>
                ))}
            </div>
          </div>
        </div>
        <div>
          <hr className="w-full h-px  border-neutral-300" />
          {heading && (
            <p className="my-3 text-lg text-gray-800 font-medium ">{heading}</p>
          )}
          {bio && (
            <>
              <p className="text-base text-gray-600 mb-2">
                {showMore ? bio : bio?.slice(0, 200).concat("...")}
              </p>
              <button
                className="text-blue-700 font-medium underline"
                onClick={() => setShowMore(!showMore)}
              >
                {!showMore ? "Read More" : "Show Less"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
