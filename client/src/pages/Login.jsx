import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./components/Header.jsx";
import axios from "axios";
import { toast } from "react-toastify-modernize";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const notify = (response) => toast.success(response.data.message);

  axios.defaults.withCredentials = true;
  const logUser = () => {
    const userData = {
      username: username,
      password: password,
    };

    axios
      .post(`http://localhost:5555/login`, userData)
      .then((response) => {
        notify(response);
        if (response.data.validated) navigate("/");
        console.log(response.data.message);
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.data.message);
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
          <h1 className="text-3xl font-bold">Login</h1>
        </div>
        <div className="my-4 p-white">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="wrapper-border bg-transparent text-white px-4 py-2 w-full rounded-full"
          />
        </div>
        <div className="my-4 p-white">
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="wrapper-border bg-transparent rounded-full px-4 py-2 w-full"
          />
        </div>
        <button className="p-2 bg-white m-8 rounded-full" onClick={logUser}>
          <span className="text-black">Login!</span>
        </button>
        <div className="flex justify-center">
          <p>
            Don't have an account?{" "}
            <Link to={"/signup"}>
              <span className="underline">Register</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
