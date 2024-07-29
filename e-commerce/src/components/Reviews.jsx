import React from "react";

import { useSelector } from "react-redux";

export default function Reviews() {
  const { reviews } = useSelector((state) => state.reviews);
  return (
    <div>
      reviews{" "}
      {reviews.length &&
        reviews.map((review) => {
          return (
            <div key={review.r_id}>
              {" "}
              productid: {review.r_p_id}
              {review.products.p_name} {review.r_date} {review.r_review} edited
              {review.r_edited.toString()} deleted {review.r_deleted.toString()}
            </div>
          );
        })}
    </div>
  );
}
