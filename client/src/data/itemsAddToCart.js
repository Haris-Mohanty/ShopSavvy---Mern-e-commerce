import { toast } from "react-toastify";
import { addToCart } from "../api/api";
import { hideLoading, showLoading } from "../redux/spinnerSlice";

const itemsAddToCart = async (id, dispatch) => {
  try {
    dispatch(showLoading());
    const res = await addToCart({ productId: id });
    dispatch(hideLoading());

    if (res.success) {
      toast.success(res.message);
    }
  } catch (err) {
    dispatch(hideLoading());
    toast.error(err?.response?.data?.message);
  }
};

export default itemsAddToCart;
