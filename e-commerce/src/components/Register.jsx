import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../apis/userApi";

export default function Register() {
  const [registerUser] = useRegisterMutation();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.user);
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    password: "",
    username: "",
  });
  useEffect(() => {
    const loggedIn = () => navigate("/products/all");
    token && loggedIn();
  });
  const register = async (e) => {
    e.preventDefault();
    if (!form.firstname || !form.lastname || !form.password || !form.username)
      return alert("all fields are required.");
    if (form.password.length < 8)
      return alert("password must be atleast 8 characters");
    if (form.username.length > 20 || form.username.length < 8)
      return alert("username must be between 8 and 20 characters");
    const data = await registerUser(form);
    console.log(data);
    if (data.error) return alert(data.error.data.error);
  };
  const updateForm = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div>
      <button onClick={() => navigate("/")}> home</button>
      <form onSubmit={register}>
        firstname
        <input type="text" name="firstname" onChange={updateForm}></input>
        lastname
        <input type="text" name="lastname" onChange={updateForm}></input>
        username
        <input type="text" name="username" onChange={updateForm}></input>
        password
        <input type="password" name="password" onChange={updateForm}></input>
        <button>register</button>
      </form>
    </div>
  );
}
