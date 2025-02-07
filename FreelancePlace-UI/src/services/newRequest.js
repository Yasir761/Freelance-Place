import axios from "axios";
import toast from "react-hot-toast";
import CustomToastNotification from "../utils/CustomFun";

const axiosInstence = axios.create({
  withCredentials: true,
});

export const newRequest = async (method, url, data, options = "") => {
  try {
    toast.dismiss(); // Dismis all before another notification

    const response = await axiosInstence[method](url, data, options);
    if (response?.status) return response?.data;
  } catch (error) {
    console.log(error);
    const errMessage = error?.response?.data?.message || error?.message;

    // JUST FOR FUN 😉
    if (errMessage === "Unauthorized request") CustomToastNotification();

    return errMessage;
  }
};
