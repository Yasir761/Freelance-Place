"use client";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { showAuthenticatePage } from "../../slices/showLoginForm.slice";
import { BottomGradient, LabelInputContainer } from "./InputBoxUtils";
import { User } from "../../services/api";
import Loading from "../ui/Loading";
import { signin_signup } from "../../services/authApi";
import CustomToggle from "../ui/CheckboxToggle";

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { register,setValue, handleSubmit } = useForm();

  const dispatch = useDispatch();
  const isLoading = useSelector((store) => store?.showAuthForm?.isLoading);
  
  const handleSignUp = async (data) => {
    const newUserData = { ...data };

    dispatch(signin_signup(newUserData, "Creating Account...", User?.CREATE_ACCOUNT));
  };

  const loadSignInForm = () => {
    dispatch(showAuthenticatePage("login"));
  };

  return (
    <div className="min-w-60 md:basis-1/2 max-w-xl w-full mx-auto px-8 py-6 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-2xl text-neutral-800 dark:text-neutral-200">
        Create your account
      </h2>
      <p className="text-neutral-600 dark:text-neutral-300 mt-1">
        Signing up for GigSpark a 100% free freelance platform.
      </p>
      <form className="my-5" onSubmit={handleSubmit(handleSignUp)}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-2">
          <LabelInputContainer>
            <Label htmlFor="firstName">First name</Label>
            <Input
              id="firstName"
              placeholder="John"
              type="text"
              {...register("firstName", { required: true })}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastName">Last name</Label>
            <Input
              id="lastName"
              placeholder="Doe"
              type="text"
              {...register("lastName", { required: true })}
            />
          </LabelInputContainer>
        </div>

        <LabelInputContainer className="mb-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="example@gmail.com"
            type="email"
            {...register("email", {
              required: true,
            })}
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="••••••••"
            type={showPassword ? "text" : "password"}
            {...register("password", { required: true, minLength: 8 })}
          />
          <div
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-1.5 top-5 p-2 px-3 rounded-lg z-10 cursor-pointer text-gray-600"
          >
            {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
          </div>
        </LabelInputContainer>

        <div className="mb-4 flex items-center justify-between gap-2 flex-row">
          <Label htmlFor="isSeller">Want to Become a Seller?</Label>
          <CustomToggle setValue={setValue}/>
        </div>

        <button
          className="bg-gradient-to-br flex items-center justify-center relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] disabled:cursor-not-allowed"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loading className={"my-auto"} />
          ) : (
            <span>Sign up &rarr;</span>
          )}
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-6 h-[1px] w-full" />
      </form>
      <p className="text-center font-medium text-gray-500 text-sm font-primary">
        Already have an account?{" "}
        <button
          onClick={loadSignInForm}
          className="font-bold text-gray-700 hover:text-gray-900"
        >
          Sign In
        </button>
      </p>
    </div>
  );
}
