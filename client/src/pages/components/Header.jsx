import React from "react";
import { CiBoxList } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify-modernize";

const Header = (props) => {
  const navigate = useNavigate();
  const notify = (response) => toast.success(response);

  const logout = () => {
    Cookies.remove("jwt");
    navigate("/logout");
    notify("User successfully logged out!");
  };

  return (
    <header className="flex justify-evenly items-center px-8 py-4 text-white">
      <div className="grow rounded-none pt-10 pb-4 font-bold text-3xl">
        <button onClick={() => navigate("/")} className="relative nav">To Do App</button>
      </div>
      <div className="grow">
        <CiBoxList className="mx-auto my-auto text-7xl text-black-600" onClick={() => navigate("/")}/>
      </div>
      {/* //Show login and signup if the user hasn't logged in, else show the logout page */}
      {props.userId === "" || !props.userId ? (
        <div className="grow rounded-none flex justify-evenly py-4">
          <button className="px-8 py-4 text-xl relative nav" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="px-8 py-4 text-xl relative nav" onClick={() => navigate("/signup")}>
            Signup
          </button>
        </div>
      ) : (
        <div className="grow rounded-none flex justify-evenly py-4 relative nav">
          <button className="px-8 py-4 text-xl" onClick={logout}>
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
