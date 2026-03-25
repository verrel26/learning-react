import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Checkout from "./pages/Checkout";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import "./App.css";
import AuthProvider from "./context/AuthContext";
import ProductDetails from "./pages/ProductDetails";
import CartProvider from "./context/CartContext";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/auth" />;
  return children;
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/checkout" element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            } />
            <Route path="/products/:id" element={<ProductDetails />} />
          </Routes>
          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
