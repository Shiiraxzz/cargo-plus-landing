import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import Pricing from "./pages/Pricing";
import BookingPage from "./pages/Booking";
import SignUp from "./pages/SignUp";
import AuthDetails from "./pages/AuthDetails";
import Login from "./pages/LogIn";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/Booking" element={<BookingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth" element={<AuthDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
