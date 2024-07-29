import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useLazyGetSingleProductRatingsQuery,
  useLazyGetSingleProductReviewsQuery,
  useGetSingleProductQuery,
} from "../apis/productApi";
import {
  useNewReviewMutation,
  useEditReviewMutation,
  useDeleteReviewMutation,
} from "../apis/reviewsApi";
import {
  useDeleteRatingMutation,
  useUpdateRatingMutation,
  useNewRatingMutation,
} from "../apis/ratingsApi";

export default function SingleProduct() {
  const [newRating] = useNewRatingMutation();
  const [deleteRating] = useDeleteRatingMutation();
  const [updateRating] = useUpdateRatingMutation();
  const [sendNewReview] = useNewReviewMutation();
  const [useEditReview] = useEditReviewMutation();
  const [deleteReivew] = useDeleteReviewMutation();
  const { id } = useParams();
  const { user, token } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useGetSingleProductQuery(id, { refetchOnMountOrArgChange: true });
  const [rating, setRating] = useState(false);
  const [review, setReview] = useState(false);
  const [showRatings] = useLazyGetSingleProductRatingsQuery();
  const [showReviews] = useLazyGetSingleProductReviewsQuery();
  const [newReview, setNewReview] = useState(null);
  const [editReview, setEditReview] = useState(null);
  const [updateRatingScore, setUpdateRatingScore] = useState(1);
  const [newRatingScore, setNewRatingScore] = useState(1);
  const sendReview = async () => {
    const data = await sendNewReview({ id, review: newReview });

    if (data.error) return alert(data.error.data.error);
    setNewReview(null);
  };

  const sendEditReview = async (e) => {
    const data = await useEditReview({ id: e.target.id, review: editReview });

    if (data.error) return alert(data.error.data.error);
    setEditReview(null);
  };

  const { product, ratings, reviews } = useSelector((state) => state.products);
  return !product ? (
    <div>
      {" "}
      <button onClick={() => navigate("/products/all")}>back</button>Not found
    </div>
  ) : (
    <div>
      <button onClick={() => navigate("/products/all")}>back</button>
      {product.p_name} {product.p_description} x{product.p_amount} $
      {product.p_price}
      {!rating ? (
        <button
          id={product.p_id}
          onClick={(e) => {
            setRating(true);
            showRatings(e.target.id);
          }}
        >
          show ratings
        </button>
      ) : (
        <button
          id={product.p_id}
          onClick={(e) => {
            setRating(false);
          }}
        >
          hide ratings
        </button>
      )}
      {!review ? (
        <button
          id={product.p_id}
          onClick={(e) => {
            setReview(true);
            showReviews(e.target.id);
          }}
        >
          show reviews
        </button>
      ) : (
        <button
          id={product.p_id}
          onClick={(e) => {
            setReview(false);
          }}
        >
          hide reviews
        </button>
      )}
      {token && (
        <div>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const data = await newRating({
                id,
                rating_score: Number(newRatingScore),
              });
              if (data.error) return alert(data.error.data.error);
            }}
          >
            <select onChange={(e) => setNewRatingScore(e.target.value)}>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
            <button>add rating</button>
          </form>
          <button>add rating</button>
          addreview
          <input
            type="text"
            id="review"
            onChange={(e) => setNewReview(e.target.value)}
          />
          <button onClick={sendReview}>add review</button>
        </div>
      )}
      {rating && (
        <div>
          ratings <div>avg rating: {ratings?.avgRating}</div>
          {ratings?.ratings.map((rating) => {
            return (
              <div key={rating.r_id}>
                {rating.users.u_username} rates this {rating.r_rating} out of 5
                {rating.r_u_id === user?.u_id && (
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      await updateRating({
                        id: rating.r_id,
                        rating_score: Number(updateRatingScore),
                      });
                    }}
                  >
                    <select
                      onChange={(e) => setUpdateRatingScore(e.target.value)}
                    >
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                    </select>
                    <button>edit rating</button>
                  </form>
                )}
                {rating.r_u_id === user?.u_id && (
                  <button
                    id={rating.r_id}
                    onClick={(e) => {
                      deleteRating(e.target.id);
                    }}
                  >
                    delete rating
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
      {review && (
        <div>
          reviews{" "}
          {reviews.length ? (
            <div>
              {reviews.map((review) => {
                return (
                  <div key={review.r_id}>
                    {!review.r_deleted ? review.r_review : <div>DELETED</div>}
                    edited:{review.r_edited.toString()} -
                    {review.users.u_username} {review.r_date}
                    {!review.r_deleted &&
                      token &&
                      user?.u_id === review.r_u_id && (
                        <button
                          id={review.r_id}
                          onClick={async (e) => {
                            await deleteReivew({ id: e.target.id });
                          }}
                        >
                          delete review
                        </button>
                      )}
                    {!review.r_deleted &&
                      token &&
                      user?.u_id === review.r_u_id && (
                        <div>
                          edit review
                          <input
                            type="text"
                            onChange={(e) => setEditReview(e.target.value)}
                          />
                          <button id={review.r_id} onClick={sendEditReview}>
                            edit review
                          </button>
                        </div>
                      )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div>No reviews yet.</div>
          )}
        </div>
      )}
    </div>
  );
}
