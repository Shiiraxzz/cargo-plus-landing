import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import AuthDetails from "../pages/AuthDetails";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase"; // adjust the path based on your folder

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Contact", path: "/contact" },
//   { name: "Pricing", path: "/pricing" },
];

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user); // if user exists, set true
    });

    return () => unsubscribe(); // clean up
  }, []);

  const location = useLocation();

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">
          cargo+
        </Link>

        <ul className="flex space-x-6 items-center">
          {navLinks.map((link, idx) => (
            <motion.li
              key={idx}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`relative ${
                location.pathname === link.path ? "text-blue-600" : "text-gray-800"
              } font-medium`}
            >
              <Link to={link.path} className="transition-colors duration-300">
                {link.name}
              </Link>
              {location.pathname === link.path && (
                <motion.div
                  layoutId="underline"
                  className="absolute left-0 right-0 -bottom-1 h-[2px] bg-blue-500 rounded"
                />
              )}
            </motion.li>
          ))}

          {/* Show "Book" only if logged in */}
          {isLoggedIn && (
            <motion.li
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`relative ${
                location.pathname === "/Booking" ? "text-blue-600" : "text-gray-800"
              } font-medium`}
            >
              <Link to="/Booking" className="transition-colors duration-300">
                Book
              </Link>
              {location.pathname === "/Booking" && (
                <motion.div
                  layoutId="underline"
                  className="absolute left-0 right-0 -bottom-1 h-[2px] bg-blue-500 rounded"
                />
              )}
            </motion.li>
          )}

          {/* 🔽 AuthDetails at the end of nav */}
          <li className="ml-4">
            <AuthDetails />
          </li>
        </ul>
      </div>
    </nav>
  );
}
