import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/spinnerSlice";
import { getUserDetails } from "../api/api";
import { clearUser, setUser } from "../redux/userSlice";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const [redirect, setRedirect] = useState(false);
  const dispatch = useDispatch();

  // Fetch User Details
  const fetchUserDetails = async () => {
    try {
      dispatch(showLoading());
      const res = await getUserDetails();
      dispatch(hideLoading());
      if (res.success) {
        dispatch(setUser(res.user));
      } else {
        setRedirect(true);
        dispatch(clearUser());
      }
    } catch (err) {
      dispatch(hideLoading());
      setRedirect(true);
      dispatch(clearUser());
    }
  };

  useEffect(() => {
    if (!user) {
      fetchUserDetails();
    }
    //eslint-disable-next-line
  }, [user, dispatch]);

  if (redirect) {
    return <Navigate to={"/login"} />;
  }

  return user ? children : null;
};

export default ProtectedRoutes;
