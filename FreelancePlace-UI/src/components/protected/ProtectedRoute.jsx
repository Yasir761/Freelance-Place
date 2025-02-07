import { useEffect } from "react";
import { removeItemFromLocalstorage } from "../../services/localStorage";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCurrentUser,
  expireSessionTimeout,
} from "../../slices/user.slice";
import { showAuthenticatePage } from "../../slices/showLoginForm.slice";
import {Navigate, Outlet} from 'react-router-dom'

const ProtectedRoute = () => {

  const dispatch = useDispatch();

  const currentUser = useSelector((store) => store.user?.user);
  const sessionExpiry = useSelector((store) => store.user?.sessionTimeout);

  const showLoginForm = useSelector(
    (store) => store.showAuthForm?.showLoginForm
  );

  useEffect(() => {
    const validateSession = () => {
    const currentTime = new Date().getTime();

      if (!currentUser || !sessionExpiry || currentTime > sessionExpiry) {

        removeItemFromLocalstorage("user");
        removeItemFromLocalstorage("sessionTimeout");

        dispatch(deleteCurrentUser());
        dispatch(expireSessionTimeout());
        dispatch(showAuthenticatePage("login"));
      }
    };

    validateSession();
  }, [currentUser, sessionExpiry, dispatch]);

  return !showLoginForm ? <Outlet/> : <Navigate to="/" />;
};

export default ProtectedRoute;

