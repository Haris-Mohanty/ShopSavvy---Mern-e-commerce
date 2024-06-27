import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/spinnerSlice";
import { toast } from "react-toastify";
import { deleteOrder, getAllOrders, updateOrderStatus } from "../api/api";
import { CiSearch } from "react-icons/ci";
import { AiOutlineFilter } from "react-icons/ai";
import { FaSortAmountUp, FaSortAmountDown } from "react-icons/fa";
import { RiDeleteBinLine, RiEyeLine } from "react-icons/ri";
import moment from "moment";
import displayInr from "../data/IndCur";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { IoCloseSharp } from "react-icons/io5";

const AllOrders = () => {
  const dispatch = useDispatch();
  const [allOrders, setAllOrders] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);

  //************* FETCH ALL ORDERS ***********/
  const fetchAllOrders = async (page) => {
    try {
      dispatch(showLoading());
      const res = await getAllOrders(page);
      dispatch(hideLoading());
      if (res.success) {
        setAllOrders(res.data);
        setTotalPages(res.totalPages);
        setCurrentPage(res.currentPage);
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

  //************* HANDLE DELETE ORDER *********/
  const handleDeleteOrder = async (orderId) => {
    try {
      dispatch(showLoading());
      const res = await deleteOrder(orderId);
      dispatch(hideLoading());
      if (res.success) {
        toast.success(res.message);
        fetchAllOrders();
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      dispatch(hideLoading());
      toast.error(err?.response?.data?.message);
      console.log(err);
    }
  };

  // Pagination handler
  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  // Open Modal
  const openModal = (order) => {
    setIsModalOpen(true);
    console.log(order);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchAllOrders(currentPage);
    //eslint-disable-next-line
  }, [currentPage]);
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
                id="table-search-orders"
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
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {allOrders.map((order) => (
              <tr key={order._id} className="bg-white border-b">
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
                  <div className="font-medium text-gray-900 truncate w-20">
                    {order._id.slice(0, 15)}
                    {order._id > 15 && "..."}
                  </div>
                </td>
                <td className="px-6 py-4">{order.userId.name}</td>
                <td className="px-6 py-4">
                  {moment(order?.createdAt).format("MMMM Do YYYY")}
                </td>
                <td className="px-6 py-4">{displayInr(order.amount)}</td>
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
                    className={`border ${
                      order.orderStatus === "Cancelled"
                        ? "border-red-500 text-red-600"
                        : "border-gray-300 text-gray-600"
                    } ${
                      order.orderStatus === "Delivered"
                        ? "border-green-500 text-green-600"
                        : "border-gray-300 text-gray-600"
                    } rounded-lg px-2 py-1`}
                  >
                    <option value="Created">Created</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="px-6 py-4 space-x-2">
                  <button
                    type="button"
                    onClick={() => handleDeleteOrder(order._id)}
                    className="text-gray-600 hover:text-red-500"
                  >
                    <RiDeleteBinLine size={18} title="Delete Order" />
                  </button>
                  <button
                    type="button"
                    onClick={() => openModal(order)}
                    className="text-gray-600 hover:text-blue-500"
                  >
                    <RiEyeLine size={18} title="Show Order" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/*************** Show Order Modal *************/}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div
              tabIndex={-1}
              aria-hidden="true"
              className="relative w-full max-w-2xl max-h-full"
            >
              <div className="relative w-full max-w-2xl max-h-full">
                {/************** Modal content ***************/}
                <div className="relative bg-white rounded-lg shadow">
                  {/************* Modal header ***********/}
                  <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Show Order Details
                    </h3>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-red-500 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                    >
                      <IoCloseSharp size={22} />
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>
                  {/*********** Modal body ***********/}
                  <div className="p-6 space-y-6">
                    <div className="grid grid-cols-6 gap-6">jndn</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/**************** PAGINATION ********************/}
      <div className="flex justify-end mt-3 gap-4">
        <button
          className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          <GoArrowLeft size={20} />
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
          <button
            key={number}
            className={`relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg ${
              currentPage === number
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-900 dark:text-gray-400"
            } text-center align-middle font-sans text-xs font-medium uppercase shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
            type="button"
            onClick={() => fetchAllOrders(number)}
          >
            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              {number}
            </span>
          </button>
        ))}

        <button
          className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          onClick={nextPage}
          disabled={currentPage === totalPages}
        >
          Next
          <GoArrowRight size={20} />
        </button>
      </div>
    </>
  );
};

export default AllOrders;
