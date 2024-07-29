import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetAllProductsQuery } from "../apis/productApi";
import { useAddToCartMutation } from "../apis/productApi";

export default function AllProducts() {
  const [addToCart] = useAddToCartMutation();
  useGetAllProductsQuery();
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.products);
  const { token } = useSelector((state) => state.user);
  return (
    <div>
      <button onClick={() => navigate("/")}>got home</button>
      {products.length ? (
        products.map((product) => {
          return (
            <div key={product.p_id}>
              {product.p_name} {product.p_description} ${product.p_price} x
              {product.p_amount}
              {/* <img src={product.p_image} height={20}></img> */}
              <button
                id={product.p_id}
                onClick={(e) => {
                  console.log(e.target.id);
                  navigate(`/products/single/${e.target.id}`);
                }}
              >
                show more
              </button>
              {token && (
                <button
                  onClick={() => {
                    addToCart(product.p_id);
                  }}
                >
                  add to cart
                </button>
              )}
              {!token && (
                <button
                  onClick={() => {
                    const cart = window.sessionStorage.getItem("CART")
                      ? JSON.parse(window.sessionStorage.getItem("CART"))
                      : {};
                    if (cart[product.p_id]) cart[product.p_id].p_count++;
                    else
                      cart[product.p_id] = {
                        p_count: 1,
                        p_image: product.p_image,
                        p_name: product.p_name,
                      };
                    window.sessionStorage.setItem("CART", JSON.stringify(cart));
                  }}
                >
                  guest add to cart
                </button>
              )}
            </div>
          );
        })
      ) : (
        <>loading...</>
      )}
    </div>
  );
}
