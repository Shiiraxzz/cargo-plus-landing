import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="bg-white text-gray-900 font-sans pt-16">
      <section className="bg-blue-500 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-4"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Welcome to Cargo+
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl mb-8"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            India's Smartest Freight Delivery Solution
          </motion.p>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Link to="/Booking">
              <button className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:from-blue-500 hover:to-blue-700 transition-all duration-300">
                Book Delivery
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-center">
          <div className="shadow-lg p-6 rounded-xl bg-white hover:shadow-blue-300 transition">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">Fastest Routes</h3>
            <p>AI-powered routing for lightning-fast deliveries</p>
          </div>
          <div className="shadow-lg p-6 rounded-xl bg-white hover:shadow-blue-300 transition">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">Real-time Tracking</h3>
            <p>Stay updated with our live tracking dashboard</p>
          </div>
          <div className="shadow-lg p-6 rounded-xl bg-white hover:shadow-blue-300 transition">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">Affordable Rates</h3>
            <p>Cost-effective freight solutions for every need</p>
          </div>
        </div>
      </section>
    </div>
  );
}
