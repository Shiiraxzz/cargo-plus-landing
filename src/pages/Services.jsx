import { motion } from "framer-motion";

const services = [
  {
    title: "Smart Routing",
    description: "AI-driven path optimization using railways and hybrid logistics modes.",
  },
  {
    title: "Real-Time Tracking",
    description: "Live cargo location updates and delivery forecasts using GPS & IoT.",
  },
  {
    title: "Analytics Dashboard",
    description: "Intuitive dashboards for vendors and clients to view reports and KPIs.",
  },
];

export default function Services() {
  return (
    <div className="pt-20 px-6 lg:px-20 pb-10 bg-gray-50 min-h-screen">
      <motion.h1
        className="text-3xl font-bold text-blue-700 text-center mb-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Our Services
      </motion.h1>

      <div className="grid md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <h2 className="text-xl font-semibold text-blue-600 mb-2">
              {service.title}
            </h2>
            <p className="text-gray-700">{service.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
