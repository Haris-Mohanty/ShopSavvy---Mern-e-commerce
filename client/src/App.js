import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "./components/Spinner";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "./redux/spinnerSlice";
import { countCartItems, getUserDetails } from "./api/api";
import { clearUser, setUser } from "./redux/userSlice";
import { clearCartItemCount, setCartItemCount } from "./redux/cartSlice";
import { useEffect } from "react";

function App() {
  const { user } = useSelector((state) => state.user);
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
        dispatch(clearUser());
      }
    } catch (err) {
      dispatch(hideLoading());
      dispatch(clearUser());
    }
  };

  // Fetch Cart items count
  const fetchCountCartItems = async () => {
    try {
      dispatch(showLoading());
      const res = await countCartItems();
      dispatch(hideLoading());
      if (res.success) {
        dispatch(setCartItemCount(res.count));
      } else {
        // If count fetch fails, set count to 0
        dispatch(clearCartItemCount());
      }
    } catch (err) {
      dispatch(hideLoading());
      console.log(err?.response?.data?.message);
      dispatch(clearCartItemCount());
    }
  };

  useEffect(() => {
    if (!user) {
      fetchUserDetails();
    }

    fetchCountCartItems();

    //eslint-disable-next-line
  }, [user, dispatch]);
  return (
    <>
      <ToastContainer
        position="top-center"
        transition={Slide}
        autoClose={3000}
      />
      <Spinner />
      <Header />
      <main>
        <Outlet context={{ user, fetchUserDetails, fetchCountCartItems }} />
      </main>
      <Footer />
    </>
  );
}

export default App;
