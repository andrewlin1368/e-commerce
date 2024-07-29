import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetOrderDetailsQuery } from "../apis/ordersApi";

export default function OrderDetails() {
  const { id } = useParams();
  useGetOrderDetailsQuery(id, { refetchOnMountOrArgChange: true });
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.orders);
  return (
    <div>
      details for order {id}{" "}
      <button onClick={() => navigate("/profile")}>go back</button>
      {items.length &&
        items.map((item) => {
          return (
            <div key={item.i_id}>
              <button
                onClick={() => {
                  navigate(`/products/single/${item.i_p_id}`);
                }}
              >
                got to item
              </button>
              {item.products.p_name} ${item.products.p_price} x{item.i_count}
            </div>
          );
        })}
    </div>
  );
}
