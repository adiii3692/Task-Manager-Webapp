import React from "react";
import { CiBoxList } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { toast } from "react-toastify-modernize";

const Header = (props) => {
  const navigate = useNavigate();
  const notify = (response) => toast.success(response);

  const logout = ()=>{
    Cookies.remove('jwt');
    navigate('/logout');
    notify('User successfully logged out!');
  };

  return (
    <div className="bg-blue-200 eczar-ad">
      <header className="flex justify-evenly items-center px-8 py-4">
        <div className="grow border-b-2 border-b-indigo-500 rounded-none pt-10 pb-4">
          <button onClick={() => navigate("/")}>HOME</button>
        </div>
        <div className="grow">
          <CiBoxList className="mx-auto my-auto text-7xl text-black-600" />
        </div>
        {/* //Show login and signup if the user hasn't logged in, else show the logout page */}
        {((props.userId === '')||(!props.userId)) ? (
          <div className="grow border-b-2 border-b-indigo-500 rounded-none flex justify-evenly py-4">
            <button
              className="rounded-full px-8 py-4 button-bg"
              onClick={() => navigate("/login")}
            >
              LOGIN
            </button>
            <button
              className="rounded-full px-8 py-4 button-bg"
              onClick={() => navigate("/signup")}
            >
              SIGNUP
            </button>
          </div>
        ) : (
          <div className="grow border-b-2 border-b-indigo-500 rounded-none flex justify-evenly py-4">
            <button
              className="rounded-full px-8 py-4 button-bg"
              onClick={logout}
            >
              LOGOUT
            </button>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;
