import { motion } from "framer-motion";

export default function Contact() {
  return (
    <div className="min-h-screen pt-20 px-6 lg:px-20 pb-10 bg-white">
      <motion.h1
        className="text-3xl font-bold text-center text-blue-700 mb-8"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Get in Touch
      </motion.h1>

      <motion.form
        className="max-w-2xl mx-auto bg-gray-100 p-8 rounded-2xl shadow-md"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Name</label>
          <input
            type="text"
            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="John Doe"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="john@example.com"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-1">Message</label>
          <textarea
            rows="4"
            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Your message..."
          />
        </div>

        <motion.button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition"
          whileTap={{ scale: 0.98 }}
          whileHover={{ scale: 1.02 }}
        >
          Send Message
        </motion.button>
      </motion.form>
    </div>
  );
}
