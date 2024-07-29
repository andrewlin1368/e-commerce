import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLoginMutation } from "../apis/userApi";

export default function Login() {
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.user);
  const [form, setForm] = useState({ username: null, password: null });
  useEffect(() => {
    const loggedIn = () => {
      navigate("/products/all");
    };
    token && loggedIn();
  });

  const signIn = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password)
      return alert("Username or password is not correct.");
    if (form.password.length < 8)
      return alert("Username or password is not correct.");
    const data = await login(form);
    if (data.error) return alert(data.error.data.error);
  };

  const updateForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <button onClick={() => navigate("/")}> home</button>
      <form onSubmit={signIn}>
        username
        <input type="text" name="username" onChange={updateForm}></input>
        password
        <input type="password" name="password" onChange={updateForm}></input>
        <button>login</button>
      </form>
    </div>
  );
}
