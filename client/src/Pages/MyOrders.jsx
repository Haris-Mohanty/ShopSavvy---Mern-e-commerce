import React from "react";
import ProgressBar from "../components/ProgressBar"; // Adjust the path as necessary

const MyOrders = () => {
  const orders = [
    {
      orderNumber: "WU88191111",
      datePlaced: "Jul 6, 2021",
      totalAmount: "$160.00",
      status: "Delivered",
      paymentStatus: "Paid",
      shippingAddress: "123 Main St, Springfield, IL",
      items: [
        {
          image: "image_url_1", // replace with actual image URL
          name: "Micro Backpack",
          price: "$70.00",
          description:
            "Are you a minimalist looking for a compact carry option? The Micro Backpack is the perfect size for your essential everyday carry items. Wear it like a backpack or carry it like a satchel for all-day use.",
          deliveryDate: "Delivered on July 12, 2021",
        },
        {
          image: "image_url_2", // replace with actual image URL
          name: "Nomad Shopping Tote",
          price: "$90.00",
          description:
            "This durable shopping tote is perfect for the world traveler. Its yellow canvas construction is water, fray, tear resistant. The matching handle, backpack straps, and shoulder loops provide multiple carry options for a day out on your next adventure.",
          deliveryDate: "Delivered on July 12, 2021",
        },
      ],
    },
    {
      orderNumber: "WU88191112",
      datePlaced: "Jul 10, 2021",
      totalAmount: "$90.00",
      status: "Cancelled",
      paymentStatus: "Unpaid",
      shippingAddress: "456 Elm St, Springfield, IL",
      items: [
        {
          image: "image_url_3", // replace with actual image URL
          name: "Adventure Hat",
          price: "$50.00",
          description:
            "Perfect for sun protection and stylish adventures. The Adventure Hat is lightweight, breathable, and durable.",
          deliveryDate: "Cancelled",
        },
      ],
    },
  ];

  return (
    <div className="container mx-auto mt-16">
      <div className="bg-white p-4 md:p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-gray-900 mb-4">My Orders</h2>
        <p className="text-gray-600 mb-6">
          Check the status of recent orders, manage returns, and discover similar products.
        </p>
        {orders.map((order) => (
          <div key={order.orderNumber} className="mb-10">
            <div className="border border-gray-300 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <div className="mb-2 sm:mb-0 md:text-center">
                  <p className="text-lg font-medium text-gray-900">Order number</p>
                  <p className="text-primary-600">{order.orderNumber}</p>
                </div>
                <div className="mb-2 sm:mb-0 md:text-center">
                  <p className="text-lg font-medium text-gray-900">Date placed</p>
                  <p className="text-primary-600">{order.datePlaced}</p>
                </div>
                <div className="mb-2 sm:mb-0 md:text-center">
                  <p className="text-lg font-medium text-gray-900">Total amount</p>
                  <p className="text-indigo-600 font-semibold">{order.totalAmount}</p>
                </div>
                <div className="mb-2 sm:mb-0 md:text-center">
                  <p className="text-lg font-medium text-gray-900">Payment Status</p>
                  <p className="text-green-600 font-semibold">{order.paymentStatus}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="bg-red-700 text-white px-4 py-2 rounded-md transition duration-200 ease-in-out hover:bg-primary-800">
                    Cancel Order
                  </button>
                  {order.paymentStatus === "Paid" ? (
                    <button className="bg-indigo-700 text-white px-4 py-2 rounded-md transition duration-200 ease-in-out hover:bg-primary-800">
                      Show Receipt
                    </button>
                  ) : (
                    <button className="bg-green-700 text-white px-4 py-2 rounded-md transition duration-200 ease-in-out hover:bg-red-800">
                      Pay Now
                    </button>
                  )}
                </div>
              </div>

              <div className="mt-6">
                {order.items.map((item, index) => (
                  <div key={index} className="flex flex-col sm:flex-row border-t border-gray-300 py-4 items-start mt-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full sm:w-24 h-24 object-cover rounded-md shadow-sm"
                    />
                    <div className="ml-0 sm:ml-6 mt-2 sm:mt-0 flex-grow">
                      <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-gray-500 mt-2">{item.description}</p>
                      <p className="text-gray-900 font-semibold mt-4">{item.price}</p>
                    </div>
                    <div className="flex flex-col items-start sm:items-end space-y-2 mt-2 sm:mt-0">
                      <button className="text-primary-700 hover:underline transition duration-200 ease-in-out">
                        View product
                      </button>
                      <button className="text-primary-700 hover:underline transition duration-200 ease-in-out">
                        Buy again
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <ProgressBar currentStatus={order.status} />
              <div className="mt-4">
                <h4 className="text-lg font-medium text-gray-900">Shipping Address</h4>
                <p className="text-gray-600">{order.shippingAddress}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
