import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetCartQuery } from "../apis/cartApi";
import { useSelector } from "react-redux";
import { useState } from "react";
import {
  useIncreaseItemMutation,
  useRemoveItemMutation,
  useDecreaseItemMutation,
  useCancelCartMutation,
  useCheckoutCartMutation,
} from "../apis/cartApi";

export default function Cart() {
  const [checkoutCart] = useCheckoutCartMutation();
  const [cancelCart] = useCancelCartMutation();
  const [decreaseItem] = useDecreaseItemMutation();
  const [increaseItem] = useIncreaseItemMutation();
  const [removeItem] = useRemoveItemMutation();
  const [showCheckout, setShowCheckout] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState({ card: "", address: "" });
  const updateForm = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  useGetCartQuery(null, { refetchOnMountOrArgChange: true });
  const { cart } = useSelector((state) => state.cart);
  const validateForm = async (e) => {
    e.preventDefault();

    if (!form.card.length || !form.address.length)
      return alert("all fields are required");
    if (form.card.length !== 16) return alert("card invalid");

    const data = await checkoutCart({
      id: e.target.id,
      card: form.card,
      address: form.address,
    });
    navigate("/profile");
  };
  const { token } = useSelector((state) => state.user);
  useEffect(() => {
    const goGuest = () => navigate("/gcart");
    !token && goGuest();
  });
  return (
    <div>
      cart
      <button onClick={() => navigate("/")}> home</button>
      items
      {!Object.keys(cart).length ? (
        <>Empty cart</>
      ) : (
        <>
          {cart.items.map((item) => {
            return (
              <div key={item.ci_id}>
                {item.products.p_name} img {item.products.p_price}x
                {item.ci_count}
                <button
                  onClick={() => {
                    increaseItem({ id: cart.cart.c_id, i_id: item.ci_p_id });
                  }}
                >
                  increase
                </button>
                <button
                  onClick={() => {
                    decreaseItem({ id: cart.cart.c_id, i_id: item.ci_p_id });
                  }}
                >
                  decrease
                </button>
                <button
                  onClick={() => {
                    removeItem({ id: cart.cart.c_id, i_id: item.ci_p_id });
                  }}
                >
                  remove
                </button>
              </div>
            );
          })}
        </>
      )}
      {Object.keys(cart).length && (
        <button onClick={() => cancelCart(cart.cart.c_id)}>cancel</button>
      )}
      {Object.keys(cart).length && (
        <button onClick={() => setShowCheckout(!showCheckout)}>checkout</button>
      )}
      {showCheckout && Object.keys(cart).length && (
        <div>
          CHECKOUT total:{" "}
          {cart?.items
            ?.reduce((val, item) => {
              val += Number(item.products.p_price) * item.ci_count;
              return val;
            }, 0)
            .toFixed(2)}
          <form id={cart.cart.c_id} onSubmit={(e) => validateForm(e)}>
            card: <input type="text" name="card" onChange={updateForm} />
            address: <input type="text" name="address" onChange={updateForm} />
            <button>checkout</button>
          </form>
        </div>
      )}
    </div>
  );
}
