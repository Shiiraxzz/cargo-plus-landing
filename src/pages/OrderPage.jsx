import React from "react";
import { Link } from "react-router-dom"; // Make sure this is imported

const MyOrders = () => {
  const orders = [
    {
      id: "ORD123456",
      item: "Bookshelf",
      status: "Out for Delivery",
      address: "AMU, Aligarh",
      date: "14 April 2025",
      deliveryPartner: "John Doe",
    },
    {
      id: "ORD123457",
      item: "Smartwatch",
      status: "Delivered",
      address: "Zakir Nagar, Aligarh",
      date: "10 April 2025",
      deliveryPartner: "Ali Khan",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">My Orders</h1>
      <div className="grid gap-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white p-4 rounded-2xl shadow-md space-y-2"
          >
            <div className="flex justify-between">
              <p className="font-semibold text-lg">Order ID: {order.id}</p>
              <span
                className={`text-sm font-medium px-2 py-1 rounded-full ${
                  order.status === "Delivered"
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {order.status}
              </span>
            </div>
            <p>
              <span className="font-medium">Item:</span> {order.item}
            </p>
            <p>
              <span className="font-medium">Address:</span> {order.address}
            </p>
            <p>
              <span className="font-medium">Delivery Partner:</span>{" "}
              {order.deliveryPartner}
            </p>
            <p>
              <span className="font-medium">Estimated Delivery:</span>{" "}
              {order.date}
            </p>

            {/* Link to Track Order */}
            <Link to="/track">
              <button className="mt-2 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">
                Track Order
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
