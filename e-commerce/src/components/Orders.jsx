import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCancelOrderMutation } from "../apis/ordersApi.js";

export default function Orders() {
  const { orders } = useSelector((state) => state.orders);
  const navigate = useNavigate();
  const [cancelOrder] = useCancelOrderMutation();

  const tryCancelOrder = async (e) => {
    const data = await cancelOrder(e.target.id);
    console.log(data);
    if (data.error) return alert(data.error.data.error);
  };
  return (
    <div>
      orders{" "}
      {orders.length &&
        orders.map((order) => {
          return (
            <div key={order.o_id}>
              {order.o_total} {order.o_date} {order.o_card} {order.o_address}{" "}
              <button
                id={order.o_id}
                onClick={(e) => {
                  navigate(`/order/${e.target.id}/orderdetails`);
                }}
              >
                show details
              </button>
              {order.o_status !== "cancel" && (
                <button id={order.o_id} onClick={tryCancelOrder}>
                  cancel
                </button>
              )}
            </div>
          );
        })}
    </div>
  );
}
