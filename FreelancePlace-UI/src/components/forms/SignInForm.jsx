"use client";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FcGoogle } from "react-icons/fc";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { showAuthenticatePage } from "../../slices/showLoginForm.slice";
import { BottomGradient, LabelInputContainer } from "./InputBoxUtils";
import { User } from "../../services/api";
import Loading from "../ui/Loading";
import { signin_signup } from "../../services/authApi";
import { FaUser } from "react-icons/fa6";

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit } = useForm();
  
  const dispatch = useDispatch();
  const isLoading = useSelector((store) => store?.showAuthForm?.isLoading);

  const handleSignIn = async (data) => {
    dispatch(signin_signup(data, "Loging...", User?.LOGIN_USER))
  };

  // default login for demo user
  const handleSignInAsDemoUser = async () => {
    const data = {
      email:"demo.user@gmail.com",
      password:"demo@123"
    }
    dispatch(signin_signup(data, "Loging...", User?.LOGIN_USER))
  };


  const loadSignUpForm = () => {
    dispatch(showAuthenticatePage("signup"));
  };

  return (
    <div className="min-w-60 md:basis-1/2 max-w-xl w-full mx-auto p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-2xl text-neutral-800 dark:text-neutral-200">
        Welcome Back
      </h2>
      <p className="text-neutral-600 dark:text-neutral-300 mt-1">
        Hey, Enter your details to get sign in to your account.
      </p>
      <form className="my-8" onSubmit={handleSubmit(handleSignIn)}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="example@gmail.com"
            type="email"
            {...register("email", { required: true })}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="••••••••"
            type={showPassword ? "text" : "password"}
            {...register("password", { required: true })}
          />
          <div
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-1.5 top-5 p-2 px-3 rounded-lg z-10 cursor-pointer text-gray-600"
          >
            {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
          </div>
        </LabelInputContainer>
        <Link
          to={"#"}
          className="block text-sm -mt-2 text-right font-bold text-gray-700 hover:text-gray-900"
        >
          Forget password?
        </Link>

        <button
          className="mt-7 bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] disabled:cursor-not-allowed"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? <Loading /> : <span> Sign In &rarr;</span>}
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        {/* Will add soon */}
        {/* <button
          className=" relative group/btn flex space-x-2 items-center justify-center px-4 w-full text-black rounded-md h-10 font-medium shadow-input  bg-gray-100 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
          type="submit"
        >
          <FcGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
          <span className="text-neutral-700 dark:text-neutral-300 text-sm">
            Google
          </span>
          <BottomGradient />
        </button> */}
        <button onClick={handleSignInAsDemoUser}
          className=" relative group/btn flex space-x-2 items-center justify-center px-4 w-full text-black rounded-md h-10 font-medium shadow-input  bg-gray-100 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
          type="submit"
        >
          <FaUser className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
          <span className="text-neutral-700 dark:text-neutral-300 text-sm">
            Demo User
          </span>
          <BottomGradient />
        </button>
      </form>
      <p className="text-center font-medium text-gray-500 text-sm font-primary">
        Already have an account?{" "}
        <button
          onClick={loadSignUpForm}
          className="font-bold text-gray-700 hover:text-gray-900"
        >
          Sign Up
        </button>
      </p>
    </div>
  );
}
