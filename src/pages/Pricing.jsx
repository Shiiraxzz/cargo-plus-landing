// src/Pricing.jsx
import { motion } from "framer-motion";

export default function Pricing() {
  const plans = [
    {
      title: "Starter",
      price: "Free",
      features: ["Basic Support", "Limited Access", "Community Help"],
    },
    {
      title: "Pro",
      price: "$19/mo",
      features: ["Priority Support", "All Features", "Team Access"],
    },
    {
      title: "Enterprise",
      price: "Contact Us",
      features: ["Custom Solutions", "Dedicated Manager", "Unlimited Users"],
    },
  ];

  return (
    <div className="min-h-screen pt-20 px-6 lg:px-20 pb-10 bg-white">
      <motion.h1
        className="text-3xl font-bold text-center text-blue-700 mb-8"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Pricing Plans
      </motion.h1>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.title}
            className="bg-gray-100 rounded-2xl p-6 shadow-md hover:shadow-xl transition"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.2 }}
          >
            <h2 className="text-xl font-bold text-gray-800 mb-2">{plan.title}</h2>
            <p className="text-2xl font-semibold text-blue-600 mb-4">{plan.price}</p>
            <ul className="space-y-2">
              {plan.features.map((feat) => (
                <li key={feat} className="text-gray-700">• {feat}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
