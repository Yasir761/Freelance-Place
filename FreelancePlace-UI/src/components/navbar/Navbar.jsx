import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import CategoryMeuList from "./CategoryMeuList";
import MenuPopup from "./MenuPopup";
import Logo from "../ui/Logo";

import { IoClose } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";

import darkLogo from "../../assets/logo/logo-dark.png";
import lightLogo from "../../assets/logo/logo-light.png";

import { showAuthenticatePage } from "../../slices/showLoginForm.slice";
import { logout } from "../../services/authApi";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [activeHamburMenu, setActiveHamburMenu] = useState(false);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const dispatch = useDispatch();

  const currentUser = useSelector((store) => store.user.user);

  const changeBg = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  const handleLogoutUser = async (e) => {
    dispatch(logout(navigate));
  };

  const handleShowAuthPage = (formName) => {
    dispatch(showAuthenticatePage(formName));

    handleCloseHamburgerMenu();
  };

  const handlePageScrollToView = (id) => {
    navigate("/");
    
    setTimeout(() => {
      const section = document.getElementById(id);
      if (!section) return;
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      
      handleCloseHamburgerMenu();
    }, 100);
  };

  const handleCloseHamburgerMenu = () => {
    setActiveHamburMenu(false);
  }

  useEffect(() => {
    window.addEventListener("scroll", changeBg);
    return () => {
      window.removeEventListener("scroll", changeBg);
    };
  }, []);

  return (
    <header
      className={`bg-slate-950 text-blue-50 transition-all duration-200 z-20 sticky top-0`}
    >
      <nav className="px-4 bg-inherit text-inherit">
        <div className="max-w-screen-xl bg-inherit text-inherit flex justify-between items-center mx-auto">
          <div
            className={`border border-black md:hidden block text-3xl  ${
              activeHamburMenu &&
              "bg-gray-700/70 w-full h-dvh absolute top-0 left-0 z-[2] p-6"
            }`}
            onClick={() => setActiveHamburMenu(!activeHamburMenu)}
          >
            <div
              className={`border border-black text-3xl relative z-10 ml-auto w-fit`}
              onClick={() => setActiveHamburMenu(!activeHamburMenu)}
            >
              {!activeHamburMenu && <IoMenu /> }
            </div>
          </div>
          <Logo src={darkLogo} />
          <div
            className={`flex gap-3 items-center text-slate-100 ${
              activeHamburMenu &&
              "absolute top-0 left-0 flex-col w-full max-w-[400px] bg-inherit h-dvh p-6 z-[2] items-stretch"
            }`}
          >
            <div
              className={`${activeHamburMenu ? "absolute top-5 right-5 z-[5] border rounded-full p-1 text-xl ml-auto" : "hidden"} border-white`}
              onClick={() => setActiveHamburMenu(!activeHamburMenu)}
            >
              <IoClose />
            </div>
            
            <ul
              className={`gap-1 *:font-primary *:tracking-tighter *:cursor-pointer ${
                !activeHamburMenu
                  ? "hidden"
                  : "*:tracking-wider *:p-2 space-y-2 *:text-xl"
              } md:flex`}
            >
              <li
                className=" py-2 px-3"
                onClick={() => handlePageScrollToView("home")}
              >
                  {/* Home */}
              </li>
              <li
                onClick={() => handlePageScrollToView("explore-categories")}
                className=" py-2 px-3"
              >
                  {/* Explore */}
              </li>
              {!currentUser?.isSeller && (
                <li className="py-2 px-0" onClick={handleCloseHamburgerMenu}>
                  <Link to={"/become-a-seller"} className="py-1">
                    Become a Seller
                  </Link>{" "}
                </li>
              )}
            </ul>
            {currentUser ? (
              <div
                className={`flex gap-2 items-center cursor-pointer px-2.5 py-2 relative ${
                  activeHamburMenu ? "justify-start mt-auto border rounded-md" : "justify-center"
                } ${active || pathname !== "/" ? "border-blue-950" : "border-white"}`}
                onClick={() => setOpenMenu(!openMenu)}
              >
                <span className="h-6 w-6 rounded-full inline-block overflow-hidden border border-blue-950">
                  <img
                    src={currentUser?.profile?.url}
                    alt={currentUser.firstName}
                    className="w-full h-full object-cover"
                  />
                </span>
                <span
                  className={`text-blue-50
                  ${
                    !activeHamburMenu && "hidden"
                  } min-[400px]:block font-bold capitalize`}
                >
                  {currentUser.firstName}
                </span>
                {currentUser && openMenu && (
                  <MenuPopup
                    handleLogoutUser={handleLogoutUser}
                    setOpenMenu={setOpenMenu}
                  />
                )}
              </div>
            ) : (
              <div className={`flex gap-4 *:px-2.5 ml-1 ${activeHamburMenu && "mt-auto mb-5 justify-between flex-col"}`}>
                <button
                  onClick={() => handleShowAuthPage("login")}
                  className={`font-primary tracking-tighter font-semibold hidden sm:block ${
                    !activeHamburMenu ? "hidden " : "pl-2 rounded-md border-2 px-3 py-1 font-bold "
                  }`}
                >
                  Sign in
                </button>
                <button
                  onClick={() => handleShowAuthPage("signup")}
                  className={`${
                    activeHamburMenu &&
                    "text-lg pl-2 font-bold border"
                  } rounded-md border-2 px-3 py-1 font-bold border-blue-100 text-blue-100 hover:bg-[#fbfbfb] hover:text-blue-950  transition-all duration-300`}
                >
                  Join
                </button>
              </div>
            )}
          </div>
        </div>

        {(active || pathname !== "/") }
      </nav>
    </header>
  );
};

export default Navbar;
