import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="min-h-screen bg-white text-gray-800 px-6 py-16">
      <motion.h1
        className="text-4xl font-bold text-center mb-10"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        About cargo+
      </motion.h1>

      <motion.div
        className="max-w-4xl mx-auto space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        <motion.p
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg leading-relaxed"
        >
          cargo+ is built to revolutionize India's freight logistics ecosystem.
          With an AI-powered smart-routing engine, we optimize delivery routes using railways and hybrid transport to
          ensure timely, cost-effective, and eco-friendly transportation.
        </motion.p>

        <motion.p
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-lg leading-relaxed"
        >
          Our mission is to create a seamless delivery network that bridges the gap between businesses and the nation’s
          underutilized freight rail infrastructure, helping reduce road congestion and carbon emissions.
        </motion.p>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="p-6 bg-gray-100 rounded-xl shadow-md"
        >
          <h2 className="text-2xl font-semibold mb-2">Our Vision</h2>
          <p className="text-base">
            To empower Indian logistics with technology that is smarter, cleaner, and built for scale.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
