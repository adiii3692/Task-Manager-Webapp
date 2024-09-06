import React, { useState } from "react";
import Header from "./components/Header.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify-modernize";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const notify = (response) => toast.info(response.data.message);
  const notifySuccess = (response) => toast.success(response.data.message);

  axios.defaults.withCredentials = true;
  const createUser = () => {
    const userData = {
      username: username,
      email: email,
      password: password,
    };

    axios
      .post(`http://localhost:5555/signup`, userData)
      .then((response) => {
        if (response.data.validated) navigate("/login");
        (response.data.validated)?notifySuccess(response):notify(response);
        console.log(response.data.message);
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  };

  return (
    <div className="flex flex-col h-full bg-image text-white">
      <Header />
      <div className="flex flex-col wrapper-border rounded-xl w-[400px] my-8 p-4 mx-auto bg-transparent blur-bg bg-shadow">
        <div className="p-4 flex justify-center">
          <h1 className="text-3xl font-bold">Sign Up</h1>
        </div>
        <div className="my-4 p-white">
          <input
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            className="wrapper-border bg-transparent text-white px-4 py-2 w-full rounded-full"
          />
        </div>
        <div className="my-4 p-white">
          <input
            type="text"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="wrapper-border bg-transparent text-white px-4 py-2 w-full rounded-full"
          />
        </div>
        <div className="my-4 p-white">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="wrapper-border bg-transparent text-white px-4 py-2 w-full rounded-full"
          />
        </div>
        <button className="p-2 bg-white m-8 rounded-full" onClick={createUser}>
          <span className="text-black">Sign Up!</span>
        </button>
      </div>
    </div>
  );
};

export default Signup;
