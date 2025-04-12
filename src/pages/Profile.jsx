import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, Edit2 } from "lucide-react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        try {
          const docRef = doc(db, "users", currentUser.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            const defaultUserData = {
              username: currentUser.displayName || "New User",
              email: currentUser.email || "",
              phone: "",
              address: "",
              profilePhotoURL: ""
            };
            await setDoc(docRef, defaultUserData);
            setUserData(defaultUserData);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setUser(null);
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  if (loading) return <div className="text-center mt-20 text-lg">Loading...</div>;

  if (!userData)
    return <div className="text-center mt-20 text-red-500">User data not found.</div>;

  return (
    <div className="max-w-xl mx-auto mt-28 px-6 py-10 bg-white shadow-2xl rounded-3xl border border-blue-100">
      <div className="flex flex-col items-center">
        <img
          src={userData.profilePhotoURL || "/default-avatar.png"}
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover border-4 border-blue-300 shadow-md mb-4"
        />
        <h2 className="text-3xl font-bold text-gray-800">{userData.username || "User"}</h2>
        <p className="text-gray-500 mt-1">{user.email}</p>
      </div>

      <div className="mt-8 space-y-4 text-gray-700">
        <div>
          <p className="text-sm font-medium text-gray-500">Phone</p>
          <p className="text-lg">{userData.phone || "Not added"}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Address</p>
          <p className="text-lg">{userData.address || "Not added"}</p>
        </div>
      </div>

      <div className="mt-8 flex justify-between items-center">
        <Link
          to="/edit-profile"
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium"
        >
          <Edit2 size={18} />
          <span>Edit Profile</span>
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Profile;
