import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db, storage } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";
import { motion } from "framer-motion";

const EditProfile = () => {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    username: "",
    phone: "",
    address: "",
    profilePhotoURL: "",
  });
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setForm(docSnap.data());
        }
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleSave = async () => {
    if (!user) {
      alert("User not logged in.");
      return;
    }

    let photoURL = form.profilePhotoURL;

    try {
      if (file) {
        const storageRef = ref(storage, `profilePhotos/${user.uid}.jpg`);
        await uploadBytes(storageRef, file);
        photoURL = await getDownloadURL(storageRef);
      }

      const updatedForm = {
        ...form,
        profilePhotoURL: photoURL,
      };

      await updateDoc(doc(db, "users", user.uid), updatedForm);
      alert("Profile updated!");
      navigate("/profile");
    } catch (err) {
      console.error("Save error:", err);
      alert("Something went wrong");
    }
  };

  if (loading) return <div className="text-center mt-20 text-lg">Loading...</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-xl mx-auto mt-28 px-6 py-10 bg-white shadow-2xl rounded-3xl border border-blue-100"
    >
      <h2 className="text-2xl font-semibold mb-6 text-center text-blue-800">Edit Profile</h2>

      <div className="flex flex-col items-center space-y-3 mb-8">
        <img
          src={preview || form.profilePhotoURL || "/default-avatar.png"}
          alt="Preview"
          className="w-28 h-28 rounded-full object-cover border-4 border-blue-300 shadow"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="text-sm text-gray-600 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
        />
      </div>

      <div className="space-y-4">
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <input
          type="text"
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Address"
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        <button
          onClick={handleSave}
          className="w-full py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-semibold"
        >
          Save Changes
        </button>

        <button
          onClick={() => navigate("/profile")}
          className="w-full mt-2 py-2 border border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition font-medium"
        >
          Back to Profile
        </button>
      </div>
    </motion.div>
  );
};

export default EditProfile;
