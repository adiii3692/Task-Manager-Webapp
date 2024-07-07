import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import axios from "axios";
import { PORT } from "../../../server/config.js";
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
      .post(`http://localhost:${PORT}/login`, userData)
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
    <div>
      <Header />
      <div className="p-4 flex justify-center">
        <h1 className="text-3xl">Login</h1>
      </div>
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={logUser}>
          Login!
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
