import React, { lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginLogoutFormImage from "./LoginLogoutFormImage";
import { hideAuthenticatePage } from "../../slices/showLoginForm.slice";
import SignInForm from "../../components/forms/SignInForm";
import SignUpForm from "../../components/forms/SignUpForm";
import { IoMdCloseCircleOutline } from "react-icons/io";

const AuthLayout = () => {
  const showAuthForm = useSelector((store) => store.showAuthForm?.showLoginForm);
  const dispatch = useDispatch();

  const handleHideForm = () => {
    dispatch(hideAuthenticatePage());
  };

  const handlePreventCloseForm = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  return (
    <div
      className="fixed top-0 left-0 z-50 md:p-6 h-dvh w-dvw bg-gray-950/60 flex md:items-center justify-center"
      onClick={handleHideForm}
    >
      <div
        className="max-w-screen-md mx-auto flex md:rounded-2xl overflow-hidden shadow-input relative"
        onClick={handlePreventCloseForm}
      >
        <div onClick={handleHideForm} className="absolute right-3 top-3 border-2 rounded-full cursor-pointer bg-white dark:bg-black">
          <IoMdCloseCircleOutline className="text-2xl text-gray-950 dark:text-gray-100"/>
        </div>
        <LoginLogoutFormImage />
        {showAuthForm === "login" ? <SignInForm /> : <SignUpForm />}
      </div>
    </div>
  );
};

export default AuthLayout;
