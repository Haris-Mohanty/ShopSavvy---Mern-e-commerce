import React, { useEffect, useState } from "react";
import ProgressBar from "../components/ProgressBar"; // Adjust the path as necessary
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/spinnerSlice";
import { getMyOrders, orderCancel } from "../api/api";
import { toast } from "react-toastify";
import displayInr from "../data/IndCur";
import { Link, useNavigate } from "react-router-dom";
import itemsAddToCart from "../data/itemsAddToCart";
import Invoice from "../components/Invoice";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //************ FETCH ALL ORDERS ********/
  const fetchMyOrders = async () => {
    try {
      dispatch(showLoading());
      const res = await getMyOrders();
      dispatch(hideLoading());
      if (res.success) {
        setOrders(res.data);
      }
    } catch (err) {
      dispatch(hideLoading());
      toast.error(err?.response?.data?.message);
    }
  };
  //************ CANCEL ORDERS ********/
  const cancelOrder = async (orderId) => {
    try {
      dispatch(showLoading());
      const res = await orderCancel(orderId);
      dispatch(hideLoading());

      if (res.success) {
        toast.success(res.message);
        fetchMyOrders();
      }
    } catch (err) {
      dispatch(hideLoading());
      toast.error(err?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchMyOrders();
    //eslint-disable-next-line
  }, []);

  //************  HANDLE SHOW INVOICE ********/
  const handleShowInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setIsInvoiceModalOpen(true);
  };

  //************  HANDLE BUY PRODUCT ********/
  const handleBuyNow = async (id, dispatch) => {
    await itemsAddToCart(id, dispatch);
    navigate("/cart");
  };

  return (
    <div className="container mx-auto mt-16">
      <div className="bg-white p-4 md:p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-gray-900 mb-4">My Orders</h2>
        <p className="text-gray-600 mb-6">
          Check the status of recent orders, manage returns, and discover
          similar products.
        </p>

        {orders.map((order) => (
          <div key={order._id} className="mb-10">
            <div className="border border-gray-300 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <div className="mb-2 sm:mb-0 md:text-center">
                  <p className="text-lg font-medium text-gray-900">
                    Order number
                  </p>
                  <p className="text-primary-600 font-semibold">
                    {order?.paymentId ? order.paymentId : order._id}
                  </p>
                </div>
                <div className="mb-2 sm:mb-0 md:text-center">
                  <p className="text-lg font-medium text-gray-900">
                    Date placed
                  </p>
                  <p className="text-primary-600 font-semibold">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="mb-2 sm:mb-0 md:text-center">
                  <p className="text-lg font-medium text-gray-900">
                    Total amount
                  </p>
                  <p className="text-indigo-600 font-semibold">
                    {displayInr(order.amount)}{" "}
                    <span className="text-gray-900 text-xs">(2% GST)</span>
                  </p>
                </div>
                <div className="mb-2 sm:mb-0 md:text-center">
                  <p className="text-lg font-medium text-gray-900">
                    Payment Status
                  </p>
                  <p className="text-green-600 font-semibold">
                    {order?.paymentStatus === "Authorized"
                      ? "COD"
                      : order.paymentStatus}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => cancelOrder(order?._id)}
                    className="bg-red-700 text-white px-4 py-2 rounded-md transition duration-200 ease-in-out hover:bg-red-800"
                  >
                    Cancel Order
                  </button>
                  {order.paymentStatus === "Paid" ? (
                    <button
                      onClick={() => handleShowInvoice(order)}
                      className="bg-indigo-700 text-white px-4 py-2 rounded-md transition duration-200 ease-in-out hover:bg-indigo-800"
                    >
                      Show Invoice
                    </button>
                  ) : (
                    <button className="bg-green-700 text-white px-4 py-2 rounded-md transition duration-200 ease-in-out hover:bg-green-800">
                      Pay Now
                    </button>
                  )}
                </div>
              </div>

              <div className="mt-6">
                {order.products.map((product) => (
                  <div
                    key={product._id}
                    className="flex flex-col sm:flex-row border-t border-gray-300 py-4 items-start mt-4"
                  >
                    {product.productId.productImage &&
                      product.productId.productImage.length > 0 && (
                        <img
                          src={product.productId.productImage[0]}
                          alt={product.productId.productName}
                          className="w-32 md:w-44 h-32 md:h-44 object-scale-down mix-blend-multiply"
                        />
                      )}
                    <div className="ml-0 sm:ml-6 mt-2 sm:mt-0 flex-grow">
                      <h3 className="text-xl font-semibold text-gray-900 text-ellipsis line-clamp-1">
                        {product.productId.productName}
                      </h3>
                      <p className="text-gray-500 mt-2 text-ellipsis line-clamp-2">
                        {product.productId.description}
                      </p>
                      <div className="flex space-x-2">
                        <p className="text-2xl font-bold text-slate-900">
                          {displayInr(product.productId.sellingPrice)}
                        </p>
                        <p className="text-sm text-slate-900 line-through mt-3">
                          {displayInr(product.productId.price)}
                        </p>
                        <p className="text-sm font-bold text-indigo-700 mt-2">
                          {Math.round(
                            ((product.productId.price -
                              product.productId.sellingPrice) /
                              product.productId.price) *
                              100
                          )}
                          % OFF
                        </p>
                      </div>
                      <div className="flex justify-start sm:items-end space-x-2 space-y-0 md:space-y-4 sm:mt-0">
                        <Link
                          to={`/product-details/${product?.productId._id}`}
                          className="bg-blue-500 text-white px-4 py-2 rounded-md transition duration-200 ease-in-out hover:bg-blue-600"
                        >
                          View Product
                        </Link>
                        <button
                          type="button"
                          onClick={() =>
                            handleBuyNow(product?.productId._id, dispatch)
                          }
                          className="bg-green-500 text-white px-4 py-2 rounded-md transition duration-200 ease-in-out hover:bg-green-600"
                        >
                          Buy Again
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <ProgressBar currentStatus={order.orderStatus} />
              <div className="mt-4">
                <h4 className="text-lg font-medium text-gray-900">
                  Shipping Address
                </h4>
                <div className="md:flex md:gap-2 md:mt-2 text-gray-600">
                  <p>
                    {order.addressId.houseNo}, {order.addressId.area},{" "}
                    {order.addressId.landmark}
                  </p>
                  <p>
                    {order.addressId.district}, {order.addressId.state},{" "}
                    {order.addressId.country}, {order.addressId.postalCode}
                  </p>
                  <p>Phone: {order.addressId.phoneNumber}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Invoice Modal */}
      <Invoice
        isOpen={isInvoiceModalOpen}
        onClose={() => setIsInvoiceModalOpen(false)}
        invoice={selectedInvoice}
      />
    </div>
  );
};

export default MyOrders;
