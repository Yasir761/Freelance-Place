import React from "react";
import { IoLogOutOutline } from "react-icons/io5";
import { FaOpencart } from "react-icons/fa6";
import { LuMessagesSquare } from "react-icons/lu";
import { GoProjectRoadmap } from "react-icons/go";
import { MdAddchart } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";

import LinkEl from "../ui/Link";
import Button from "../ui/Button";
import { useSelector } from "react-redux";

const MenuPopup = ({ handleLogoutUser, setOpenMenu }) => {

  const currentUser = useSelector(store => store?.user?.user)

  const linksItem = [
    { href: `/profile/${currentUser?._id}`, text:"Profile"  },
    { href: "/myGigs", text: "Gig" },
    { href: "/add-new-gig", text: "Add new Gig" },
    { href: "/messages", text: "Messages" },
    { href: "/orders", text: "Orders" },
  ];

  const LinksIcon = [
    FaRegUser,
    GoProjectRoadmap,
    MdAddchart,
    LuMessagesSquare,
    FaOpencart,
    IoLogOutOutline,
  ];

  const handleCloseMenu = (e) => {
    if (e.target.nodeName !== "A") return;
    setOpenMenu(false);
  };

  return (
    <div className="fixed top-0 left-0 z-10 w-dvw h-dvh bg-blue-950/20">
      <div
        className="absolute top-16 right-4 shadow-sm shadow-gray-600 bg-[#f0f0f0] *:text-blue-950 font-semibold p-4 rounded-xl z-10 w-52 space-y-1 *:flex *:items-center *:gap-2 *:transition *:duration-200 *:px-2 *:py-1"
        onClick={handleCloseMenu}
      >
        {linksItem.map((link, index) => {
          if (!currentUser.isSeller && index > 0 && index < 3) return;
          const Icon = LinksIcon[index];
          return (
            <LinkEl
              key={index}
              href={link.href}
              className="hover:translate-x-2 *:text-xl"
              children={
                <>
                  <Icon /> {link.text}
                </>
              }
            />
          );
        })}
        <Button
          onClick={handleLogoutUser}
          className="hover:translate-x-2 *:text-xl !text-red-700 w-full"
          children={
            <>
              <IoLogOutOutline /> Logout
            </>
          }
        />
      </div>
    </div>
  );
};

export default MenuPopup;
