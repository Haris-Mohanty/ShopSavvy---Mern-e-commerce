import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/spinnerSlice";
import { toast } from "react-toastify";
import { getAllOrders, updateOrderStatus } from "../api/api";
import { CiSearch } from "react-icons/ci";
import { AiOutlineFilter } from "react-icons/ai";
import { FaSortAmountUp, FaSortAmountDown } from "react-icons/fa";
import moment from "moment";
import displayInr from "../data/IndCur";

const AllOrders = () => {
  const dispatch = useDispatch();
  const [allOrders, setAllOrders] = useState([]);

  //************* FETCH ALL ORDERS ***********/
  const fetchAllOrders = async (page) => {
    try {
      dispatch(showLoading());
      const res = await getAllOrders(page);
      dispatch(hideLoading());
      if (res.success) {
        setAllOrders(res.data);
      }
    } catch (err) {
      dispatch(hideLoading());
      toast.error(err?.response?.data?.message);
    }
  };

  //************* UPDATE ORDER STATUS ***********/
  const handleStatusChange = async (orderId, status) => {
    try {
      dispatch(showLoading());
      const res = await updateOrderStatus(orderId, status);
      dispatch(hideLoading());
      if (res.success) {
        toast.success("Order status updated successfully");
        fetchAllOrders();
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      dispatch(hideLoading());
      toast.error(err?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);
  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex shadow-lg rounded-sm justify-between items-center py-4 px-2 bg-white">
          <h1 className="text-3xl font-semibold text-indigo-500">ALL ORDERS</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <CiSearch />
              </div>
              <input
                type="text"
                id="table-search-users"
                className="block pl-10 pr-4 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:outline-none"
                placeholder="Search for orders"
              />
            </div>
            <div className="flex items-center space-x-2">
              <button className="flex items-center px-3 py-2 text-sm font-medium text-white bg-indigo-500 rounded-lg hover:bg-indigo-600">
                <AiOutlineFilter className="mr-2" /> Filters
              </button>
              <button className="flex items-center px-3 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600">
                <FaSortAmountUp className="mr-2" /> Sort Asc
              </button>
              <button className="flex items-center px-3 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600">
                <FaSortAmountDown className="mr-2" /> Sort Desc
              </button>
            </div>
          </div>
        </div>

        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Products
              </th>
              <th scope="col" className="px-6 py-3">
                Order ID
              </th>
              <th scope="col" className="px-6 py-3">
                Customer Name
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Total Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Payment Status
              </th>
              <th scope="col" className="px-6 py-3">
                Order Status
              </th>
            </tr>
          </thead>
          <tbody>
            {allOrders.map((order) => (
              <tr key={order.id} className="bg-white border-b">
                <td className="px-6 py-4">
                  {order.products.map((product, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <img
                        src={product.productId.productImage[0]}
                        alt={product.productId.productName}
                        className="w-14 h-14 object-scale-down mr-2"
                      />
                      <div className="flex flex-col">
                        <div className="font-medium text-gray-900 truncate w-18">
                          {product.productId.productName.slice(0, 15)}
                          {product.productId.productName.length > 15 && "..."}
                        </div>
                        <div className="text-gray-500 flex">
                          <span className="mr-1">Q: {product.quantity}</span>
                          <span>
                            Price: {displayInr(product.productId.sellingPrice)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </td>
                <td className="px-6 py-4">
                  {order.paymentId ? order.paymentId : order._id}
                </td>
                <td className="px-6 py-4">{order.userId.name}</td>
                <td className="px-6 py-4">
                  {moment(order?.createdAt).format("MMMM Do YYYY")}
                </td>
                <td className="px-6 py-4">{order.amount}</td>
                <td className="px-6 py-4">
                  {order.paymentStatus === "Authorized"
                    ? "COD"
                    : order.paymentStatus}
                </td>
                <td className="px-6 py-4">
                  <select
                    value={order.orderStatus}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    className="border border-gray-300 rounded-lg px-2 py-1 text-gray-600"
                  >
                    <option value="Created">Created</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AllOrders;
