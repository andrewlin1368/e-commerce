import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../slices/userSlice";
import { clearReviews } from "../slices/reviewsSlice";
import { clearRatings } from "../slices/ratingsSlice";
import { clearOrders } from "../slices/ordersSlice";
import { clearMessages } from "../slices/messagesSlice";
import { clearCart } from "../slices/cartSlice";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  return (
    <div>
      home
      <button onClick={() => navigate("/products/all")}>see all items</button>
      {token && <button onClick={() => navigate("/cart")}>Cart</button>}
      {!token && <button onClick={() => navigate("/gcart")}>Cart</button>}
      {!token && (
        <div>
          <button onClick={() => navigate("/login")}> Login</button>
          <button onClick={() => navigate("/register")}>register</button>
        </div>
      )}
      {token && (
        <div>
          <button onClick={() => navigate("/profile")}>profile</button>
          <button
            onClick={() => {
              dispatch(clearMessages());
              dispatch(clearOrders());
              dispatch(clearRatings());
              dispatch(clearReviews());
              dispatch(logout());
              dispatch(clearCart());
            }}
          >
            logout
          </button>
        </div>
      )}
    </div>
  );
}
