import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Truck, PackageCheck } from "lucide-react";

const statusSteps = ["Order Placed", "Packed", "Shipped", "Out for Delivery", "Delivered"];
const currentStatus = "Out for Delivery"; // Static for now

export default function TrackOrderPage() {
  const order = {
    id: "ORD123456",
    item: "Bluetooth Speaker",
    customerName: "Mohammad Shiraz",
    address: "123 Aligarh Street, UP, India",
    deliveryDate: "April 15, 2025",
    status: currentStatus,
    location: {
      lat: 28.38,
      lng: 77.12,
    },
  };

  const currentStepIndex = statusSteps.indexOf(order.status);

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold mb-4">Track Your Order</h2>

      {/* Order Info Card */}
      <Card className="shadow-md">
        <CardContent className="p-4 space-y-2">
          <p><strong>Order ID:</strong> {order.id}</p>
          <p><strong>Item:</strong> {order.item}</p>
          <p><strong>Customer:</strong> {order.customerName}</p>
          <p><strong>Address:</strong> {order.address}</p>
          <p><strong>Estimated Delivery:</strong> {order.deliveryDate}</p>
        </CardContent>
      </Card>

      {/* Stepper Progress */}
      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold">Order Status</h3>
        <div className="flex justify-between items-center">
          {statusSteps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center w-full">
              <div
                className={`w-6 h-6 rounded-full mb-1 ${
                  index <= currentStepIndex ? "bg-green-500" : "bg-gray-300"
                }`}
              ></div>
              <span className="text-sm">{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Live Location (Mock Map) */}
      <div className="h-64 bg-gray-200 rounded-md flex flex-col items-center justify-center">
        <MapPin className="w-8 h-8 text-blue-500 mb-2" />
        <p className="text-sm text-gray-600">Live location tracking will appear here</p>
        <p className="text-xs">Lat: {order.location.lat}, Lng: {order.location.lng}</p>
      </div>

      {/* Bottom Status */}
      <div className="flex items-center gap-2 text-green-600 font-medium">
        <Truck className="w-5 h-5" />
        <p>Delivery is in progress...</p>
      </div>
    </div>
  );
}
