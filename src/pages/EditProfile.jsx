import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db, storage } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";

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
      // Step 1: Upload file if it exists
      if (file) {
        const storageRef = ref(storage, `profilePhotos/${user.uid}.jpg`);
        console.log("Uploading file...");
        await uploadBytes(storageRef, file);
        photoURL = await getDownloadURL(storageRef);
        console.log("Download URL:", photoURL);
      }

      // Step 2: Update Firestore
      const updatedForm = {
        ...form,
        profilePhotoURL: photoURL,
      };

      await updateDoc(doc(db, "users", user.uid), updatedForm);
      alert("Profile updated!");
      navigate("/profile"); // Optional: go to profile page
    } catch (err) {
      console.error("Save error:", err);
      alert("Something went wrong");
    }
  };

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <div className="flex items-center mb-6 space-x-4">
        <img
          src={preview || form.profilePhotoURL || "/default-avatar.png"}
          alt="Preview"
          className="w-24 h-24 rounded-full object-cover border"
        />
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </div>
      <div className="space-y-4">
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Address"
          className="w-full p-2 border rounded"
        />
        <button
          onClick={handleSave}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
