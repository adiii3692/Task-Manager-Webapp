import React, { useEffect, useState } from "react";

import Header from "./components/Header.jsx";
import Tasks from "./components/Tasks.jsx";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { toast } from "react-toastify-modernize";

const Home = () => {
  const [userId, setUserId] = useState("");
  const notify = (response) => toast.warning(response);

  const getCookies = () => {
    const token = Cookies.get("jwt");
    if (!token) {
      return;
    }
    const decodedJwt = jwtDecode(token);
    setUserId((userId) => userId + decodedJwt.userId);
  };

  useEffect(getCookies, []);

  return (
    <div className="flex flex-col h-full bg-image text-white">
      <Header userId={userId} />
        <main className="flex justify-center items-center flex-1 relative">
          {userId === "" ? (<h1 className="text-3xl relative nav2 font-bold">Not logged in yet</h1>) : <Tasks userId={userId} />}
        </main>
    </div>
  );
};

export default Home;
