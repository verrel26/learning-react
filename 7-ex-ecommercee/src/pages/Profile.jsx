import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Profile() {
  const { user } = useAuth();
  const { cartItems } = useCart();

  if (!user) return <Navigate to="/auth" />;

  return (
    <div className="page">
      <h1 className="page-title">My Prifle</h1>
      <div className="profile-info">
        <p>Email:{user.email}</p>
        <p>Total Orders:{cartItems.length}</p>
      </div>
    </div>
  );
}
