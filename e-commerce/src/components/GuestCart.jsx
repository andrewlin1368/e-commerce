import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function GuestCart() {
  const { token } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [cart, setCart] = useState(
    window.sessionStorage.getItem("CART")
      ? JSON.parse(window.sessionStorage.getItem("CART"))
      : null
  );
  useEffect(() => {
    const goCart = () => navigate("/cart");
    token && goCart();
  });
  return (
    <div>
      guest cart{" "}
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        home
      </button>
      {!cart ? (
        <div>empty cart</div>
      ) : (
        <div>
          {Object.entries(cart).map((entry) => {
            return (
              <div key={entry[0]}>
                {entry[1].p_name} x{entry[1].p_count} entry[1].p_image{" "}
                <button
                  onClick={() => {
                    const data = JSON.parse(
                      window.sessionStorage.getItem("CART")
                    );
                    data[entry[0]].p_count++;
                    window.sessionStorage.setItem("CART", JSON.stringify(data));
                    setCart(data);
                  }}
                >
                  increase
                </button>{" "}
                <button
                  onClick={() => {
                    let data = JSON.parse(
                      window.sessionStorage.getItem("CART")
                    );
                    if (data[entry[0]].p_count === 1) delete data[entry[0]];
                    else data[entry[0]].p_count--;
                    if (!Object.keys(data).length) {
                      window.sessionStorage.removeItem("CART");
                      data = null;
                    } else
                      window.sessionStorage.setItem(
                        "CART",
                        JSON.stringify(data)
                      );
                    setCart(data);
                  }}
                >
                  decrease
                </button>{" "}
                <button
                  onClick={() => {
                    const data = JSON.parse(
                      window.sessionStorage.getItem("CART")
                    );
                    delete data[entry[0]];
                    if (!Object.keys(data).length) {
                      window.sessionStorage.removeItem("CART");
                      setCart(null);
                    } else {
                      window.sessionStorage.setItem(
                        "CART",
                        JSON.stringify(data)
                      );
                      setCart(data);
                    }
                  }}
                >
                  remove
                </button>
              </div>
            );
          })}
          <button
            onClick={() => {
              setCart(null);
              window.sessionStorage.removeItem("CART");
            }}
          >
            cancel
          </button>
          <button
            onClick={() => {
              alert("log in or register to checkout");
              setTimeout(() => {
                navigate("/login");
              }, 1000);
            }}
          >
            checkout
          </button>
        </div>
      )}
    </div>
  );
}
