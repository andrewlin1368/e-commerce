import React from "react";
import { useSelector } from "react-redux";

export default function Ratings() {
  const { ratings } = useSelector((state) => state.ratings);
  return (
    <div>
      ratings{" "}
      {ratings.length &&
        ratings.map((rating) => {
          return (
            <div key={rating.r_id}>
              {rating.r_rating} {rating.r_p_id}
              {rating.products.p_name}
            </div>
          );
        })}
    </div>
  );
}
