import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        console.log("Current user UID:", currentUser.uid);
        try {
          const docRef = doc(db, "users", currentUser.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            console.log("User data found:", docSnap.data());
            setUserData(docSnap.data());
          } else {
            console.log("No user data found! Creating default user document...");

            const defaultUserData = {
              username: currentUser.displayName || "New User",
              email: currentUser.email || "",
              phone: "",
              address: "",
              profilePhotoURL: ""
            };

            await setDoc(docRef, defaultUserData);  // <- now this works
            setUserData(defaultUserData);
          }
        } catch (error) {
          console.error("Error fetching or creating user data:", error);
        }
      } else {
        console.log("User is logged out.");
        setUser(null);
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="text-center mt-20 text-lg">Loading...</div>;
  }

  if (!userData) {
    return <div className="text-center mt-20 text-red-500">User data not found.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <div className="flex items-center space-x-4 mb-6">
        <img
          src={userData.profilePhotoURL || "/default-avatar.png"}
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover border"
        />
        <div>
          <h2 className="text-2xl font-bold">{userData.username || "No Username"}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>
      <div className="space-y-2">
        <p><strong>Phone:</strong> {userData.phone || "Not added"}</p>
        <p><strong>Address:</strong> {userData.address || "Not added"}</p>
      </div>
      <div className="mt-6 flex justify-end">
        <Link to="/edit-profile" className="text-blue-500 hover:underline">
          Edit Profile
        </Link>
        </div>

    </div>
  );
};

export default Profile;
