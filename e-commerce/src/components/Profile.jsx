import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCloseAccountMutation, useUpdateMutation } from "../apis/userApi";
import { useLazyGetReviewsQuery } from "../apis/reviewsApi";
import { useLazyShowAllRatingsQuery } from "../apis/ratingsApi";
import {
  useLazyGetCancelledOrdersQuery,
  useLazyGetCompletedOrdersQuery,
} from "../apis/ordersApi";
import { useLazyGetMessagesQuery } from "../apis/messagesApi";
import { logout } from "../slices/userSlice";
import { useDispatch } from "react-redux";
import Reviews from "./Reviews";
import Ratings from "./Ratings";
import Orders from "./Orders";
import Messages from "./Messages";

export default function Profile() {
  const [showReviewsList] = useLazyGetReviewsQuery();
  const [showMessagesList] = useLazyGetMessagesQuery();
  const [showRatingsList] = useLazyShowAllRatingsQuery();
  const [showCompletedList] = useLazyGetCompletedOrdersQuery();
  const [showCancelledList] = useLazyGetCancelledOrdersQuery();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sendUpdateUser] = useUpdateMutation();
  const [sendCloseUser] = useCloseAccountMutation();
  const { user, token } = useSelector((state) => state.user);
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    password: "",
  });
  const [showMessages, setShowMessages] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);
  const [showCancelled, setShowCancelled] = useState(false);
  useEffect(() => {
    const loggedOut = () => navigate("/");
    !token && loggedOut();
  });
  const updateForm = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const updateUser = async (e) => {
    e.preventDefault();
    const data = await sendUpdateUser(form);
  };
  const closeUser = async () => {
    await sendCloseUser();
    dispatch(logout());
  };
  return (
    <div>
      username: {user?.u_username}
      firstname :{user?.u_firstname}
      lastname: {user?.u_lastname}
      admin: {user?.u_admin ? <p>yes</p> : <p>no</p>}
      <button onClick={closeUser}>close account</button>
      <button onClick={() => setShowUpdate(!showUpdate)}>
        {" "}
        update account
      </button>
      {showUpdate && (
        <div>
          updateaccount{" "}
          <form onSubmit={updateUser}>
            firstname
            <input type="text" name="firstname" onChange={updateForm} />
            lastname
            <input type="text" name="lastname" onChange={updateForm} />
            password
            <input type="text" name="password" onChange={updateForm} />
            <button>edit user</button>
          </form>
        </div>
      )}
      <button
        onClick={() => {
          !showReview && showReviewsList();
          setShowReview(!showReview);
        }}
      >
        show reviews
      </button>
      {showReview && <Reviews></Reviews>}
      <button
        onClick={() => {
          !showRating && showRatingsList();
          setShowRating(!showRating);
        }}
      >
        show ratings
      </button>
      {showRating && <Ratings></Ratings>}
      <button
        onClick={() => {
          !showCompleted && showCompletedList();
          setShowCancelled(false);
          setShowCompleted(!showCompleted);
        }}
      >
        show completed orders
      </button>
      {showCompleted && <Orders></Orders>}
      <button
        onClick={() => {
          !showCancelled && showCancelledList();
          setShowCompleted(false);
          setShowCancelled(!showCancelled);
        }}
      >
        show cancelled orders
      </button>
      {showCancelled && <Orders></Orders>}
      <button
        onClick={() => {
          !showMessages && showMessagesList();
          setShowMessages(!showMessages);
        }}
      >
        show messages
      </button>
      {showMessages && <Messages></Messages>}
      profile<button onClick={() => navigate("/")}>home</button>
    </div>
  );
}
