import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Profile() {
  const { user } = useAuth();
  const { cartItems } = useCart();

  if (!user)
    return (
      <div className="page">
        <p>Please login to view profile</p>
        <Link to="/auth">Go to Login</Link>
      </div>
    );

  return (
    <div className="page">
      <h1 className="page-title">My Profile</h1>
      <div className="profile-info">
        <p>Email: {user.email}</p>
        <p>Total Orders: {cartItems.length}</p>
      </div>
    </div>
  );
}
