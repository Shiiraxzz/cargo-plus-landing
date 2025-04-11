import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function BookingPage() {
  const [selectedType, setSelectedType] = useState("intracity");
  const [deliveryMode, setDeliveryMode] = useState("smart");
  const [priority, setPriority] = useState("fastest");
  const [pickup, setPickup] = useState("");
  const [delivery, setDelivery] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [productName, setProductName] = useState("");
  const [productWeight, setProductWeight] = useState("");
  const [productType, setProductType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [showSummary, setShowSummary] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [estimatedCost, setEstimatedCost] = useState(null);
  const [orderId, setOrderId] = useState(null);

  const pickupCoords = [28.7041, 77.1025];
  const deliveryCoords = [28.5355, 77.3910];

  const generateOrderId = () => {
    return "ORD" + Math.floor(100000 + Math.random() * 900000);
  };

  const handleBooking = () => {
    setIsLoading(true);
    const generatedId = generateOrderId();
    setOrderId(generatedId);
    setTimeout(() => {
      setIsLoading(false);
      setShowSummary(true);
      setConfirmationMessage("Booking Submitted Successfully!");
      setTimeout(() => setConfirmationMessage(""), 3000);
    }, 1500);
  };

  const calculateCost = () => {
    let baseCost = 50;
    let weightMultiplier = {
      "0-2": 1,
      "2-5": 1.5,
      "5-10": 2,
      "10-20": 2.5,
      ">20": 3,
    }[productWeight] || 1;

    let modeMultiplier = {
      road: 1,
      train: 0.8,
      smart: 0.9,
    }[deliveryMode] || 1;

    let priorityMultiplier = {
      fastest: 1.5,
      cheapest: 0.8,
      balanced: 1,
    }[priority] || 1;

    const randomDistance = selectedType === "intercity" ? 300 : 20;
    const cost = Math.round(baseCost + randomDistance * weightMultiplier * modeMultiplier * priorityMultiplier);

    setEstimatedCost(cost);
  };

  const handleSearch = () => {
    setIsSearchActive(true);
    calculateCost();
    setTimeout(() => {
      setIsSearchActive(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-xl border border-blue-200">
        <motion.h2
          className="text-4xl font-extrabold text-blue-700 mb-10 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Book Your Delivery
        </motion.h2>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            key="intracity"
            className={`input py-3 px-5 rounded-lg font-semibold border text-sm transition-all ${selectedType === "intracity" ? "bg-blue-500 text-white border-blue-600" : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-blue-50"}`}
            onClick={() => setSelectedType("intracity")}
          >
            Intracity
          </button>
          <button
            key="intercity"
            className={`input py-3 px-5 rounded-lg font-semibold border text-sm transition-all ${selectedType === "intercity" ? "bg-blue-500 text-white border-blue-600" : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-blue-50"}`}
            onClick={() => setSelectedType("intercity")}
          >
            Intercity
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <input className="input border border-gray-300 rounded-xl p-3" placeholder="Pickup Address" value={pickup} onChange={(e) => setPickup(e.target.value)} />
          <input className="input border border-gray-300 rounded-xl p-3" placeholder="Delivery Address" value={delivery} onChange={(e) => setDelivery(e.target.value)} />
          <input className="input border border-gray-300 rounded-xl p-3" type="date" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} />
          <input className="input border border-gray-300 rounded-xl p-3" type="date" value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <input className="input border border-gray-300 rounded-xl p-3" placeholder="Product Name" value={productName} onChange={(e) => setProductName(e.target.value)} />
          <select className="input border border-gray-300 rounded-xl p-3" value={productWeight} onChange={(e) => setProductWeight(e.target.value)}>
            <option value="">Select Weight</option>
            <option value="0-2">0-2 kg</option>
            <option value="2-5">2-5 kg</option>
            <option value="5-10">5-10 kg</option>
            <option value="10-20">10-20 kg</option>
            <option value=">20">More than 20 kg</option>
          </select>
          <select className="input border border-gray-300 rounded-xl p-3" value={productType} onChange={(e) => setProductType(e.target.value)}>
            <option value="">Select Product Type</option>
            <option value="Fragile">Fragile</option>
            <option value="Electronic">Electronic</option>
            <option value="Perishable">Perishable</option>
            <option value="Document">Document</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {["road", "train", "smart"].map((mode) => (
            <button
              key={mode}
              className={`input border border-gray-300 py-3 px-5 rounded-lg font-semibold text-sm transition-all ${deliveryMode === mode ? "bg-blue-500 text-white border-blue-600" : "bg-gray-100 text-gray-700 hover:bg-blue-50"}`}
              onClick={() => setDeliveryMode(mode)}
            >
              {mode === "smart" ? "Smart (Recommended)" : `By ${mode.charAt(0).toUpperCase() + mode.slice(1)}`}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {["fastest", "cheapest", "balanced"].map((p) => (
            <button
              key={p}
              className={`input border border-gray-300 py-3 px-5 rounded-lg font-semibold text-sm transition-all ${priority === p ? "bg-blue-500 text-white border-blue-600" : "bg-gray-100 text-gray-700 hover:bg-blue-50"}`}
              onClick={() => setPriority(p)}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>

        <div className="mb-6 text-center">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition duration-300 shadow-md"
            onClick={handleSearch}
            disabled={isSearchActive}
          >
            {isSearchActive ? "Searching..." : "Search Best Route"}
          </button>
        </div>

        {estimatedCost !== null && (
          <motion.div className="mb-6 text-center text-blue-600 font-semibold" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            Estimated Cost: ₹{estimatedCost}
          </motion.div>
        )}

        <div className="h-64 mb-6 rounded-xl overflow-hidden shadow-md border border-gray-300">
          <MapContainer center={pickupCoords} zoom={10} scrollWheelZoom={false} className="w-full h-full">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={pickupCoords} />
            <Marker position={deliveryCoords} />
            <Polyline positions={[pickupCoords, deliveryCoords]} color="blue" />
          </MapContainer>
        </div>

        <div className="flex justify-center">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition duration-300 shadow-lg"
            onClick={handleBooking}
            disabled={isLoading}
          >
            {isLoading ? 'Booking...' : 'Book Now'}
          </button>
        </div>

        {showSummary && (
          <motion.div
            className="mt-8 p-5 bg-blue-100 rounded-2xl text-blue-700 text-center font-medium border border-blue-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            Order ID: <strong>{orderId}</strong><br />
            You’ve selected <strong>{selectedType}</strong> delivery | Mode: <strong>{deliveryMode}</strong> | Priority: <strong>{priority}</strong><br />
            Pickup: <strong>{pickup}</strong> | Delivery: <strong>{delivery}</strong><br />
            Product: <strong>{productName}</strong> ({productWeight} kg, {productType})<br />
            Estimated Cost: <strong>₹{estimatedCost}</strong>
          </motion.div>
        )}
      </div>
    </div>
  );
}