import toast from "react-hot-toast";
import {
  changeLoadingState,
  hideAuthenticatePage,
} from "../slices/showLoginForm.slice";
import {
  deleteCurrentUser,
  expireSessionTimeout,
  setCurrentUser,
  updateSessionTimeout,
} from "../slices/user.slice";
import {
  getItemsFromLocalStorage,
  removeItemFromLocalstorage,
  setItemsToLocalStorage,
} from "./localStorage";
import { User } from "./api.js";
import { newRequest } from "./newRequest.js";

const signin_signup = (data, loadingText, requestUrl) => {
  return async (dispatch) => {
    dispatch(changeLoadingState(true));
    toast.dismiss();
    const toastId = toast.loading(loadingText);
    try {
      const response = await newRequest("post", requestUrl, data);

      if(typeof response === "string") throw response;

      const tokenExpiry = new Date().getTime() + 24 * 60 * 60 * 1000;
      
      if ( response?.success ) {
        dispatch(setCurrentUser(response?.data));
        dispatch(updateSessionTimeout(tokenExpiry));
        
        setItemsToLocalStorage("user", response?.data);
        setItemsToLocalStorage("sessionTimeout", tokenExpiry);
        
        dispatch(hideAuthenticatePage());
      }
      
      toast.success(response.message, { id: toastId });
      dispatch(changeLoadingState(false));
    
    } catch (error) {

      toast.error(error, { id: toastId });

      dispatch(deleteCurrentUser());
      dispatch(expireSessionTimeout());
     
      removeItemFromLocalstorage("user");
      removeItemFromLocalstorage("sessionTimeout");
     
      dispatch(changeLoadingState(false));
    }
  };
};

const logout = (navigate) => {
  return async (dispatch) => {
    toast.dismiss();
    const toastId = toast.loading("logging out...");
    try {

      const response = await newRequest("get", User?.LOGOUT, null);

      if(typeof response === "string") throw response;

      if (response?.success) {

        dispatch(deleteCurrentUser());
        dispatch(expireSessionTimeout());

        removeItemFromLocalstorage("user");
        removeItemFromLocalstorage("sessionTimeout");
      }

      toast.success(response?.data, { id: toastId });
      navigate("/");

    } catch (error) {
      toast.error(error, { id: toastId });
    }
  };
};

const setAndValidateUser = () => {
  return async (dispatch) => {
    
    const currentUser = await getItemsFromLocalStorage("user");
    const sessionTimeout = await getItemsFromLocalStorage("sessionTimeout");

    const currentTime = new Date().getTime();

    if (!currentUser || !sessionTimeout || currentTime > sessionTimeout) {
      // regenerate token and loggedin...
      const {REFRESH_AUTH_TOKENS} = User
      const response = await newRequest("post", REFRESH_AUTH_TOKENS)

      if(typeof response === "string"){
        removeItemFromLocalstorage("user");
        removeItemFromLocalstorage("sessionTimeout");

        dispatch(deleteCurrentUser());
        dispatch(expireSessionTimeout());
      }
      
      const tokenExpiry = new Date().getTime() + 24 * 60 * 60 * 1000;

      if (response?.success) {

        dispatch(setCurrentUser(response?.data));
        dispatch(updateSessionTimeout(tokenExpiry));
        
        setItemsToLocalStorage("user", response?.data);
        setItemsToLocalStorage("sessionTimeout", tokenExpiry);
      }      
      
    } else {
      dispatch(setCurrentUser(currentUser));
      dispatch(updateSessionTimeout(sessionTimeout));
    }
  };
};

export { signin_signup, logout, setAndValidateUser };
