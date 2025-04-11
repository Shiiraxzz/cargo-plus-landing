import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";
import { UserCircle } from "lucide-react"; // Profile icon

const AuthDetails = () => {
  const [user, setUser] = useState(null);
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          setUsername(userDoc.data().username || currentUser.email.split("@")[0]);
        }
  
        // Only show alert if user just logged in (not on refresh)
        const isFirstLogin = sessionStorage.getItem("firstLogin") !== "done";
        if (isFirstLogin) {
          alert("Logged in successfully 🎉");
          sessionStorage.setItem("firstLogin", "done");
        }
  
      } else {
        setUser(null);
        setUsername("");
        sessionStorage.removeItem("firstLogin"); // reset on logout
      }
    });
  
    return () => unsubscribe();
  }, []);

  return (
    <div className="flex items-center gap-3">
      {user ? (
        <Link to="/profile" className="text-gray-600 hover:text-blue-500 transition">
          <UserCircle size={28} />
        </Link>
      ) : (
        <Link
          to="/signup"
          className="px-4 py-1.5 text-sm rounded-full border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition duration-300 shadow-sm"
        >
          Login / Signup
        </Link>
      )}
    </div>
  );
};

export default AuthDetails;
