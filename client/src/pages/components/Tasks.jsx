import React from "react";
import { toast } from "react-toastify-modernize";
import { useNavigate } from "react-router-dom";

const Tasks = (props) => {
    
  const notify = (response) => toast.warning(response);
  const navigate = useNavigate();

  if (props.userId === "") {
    notify("Redirecting to login page!");
    navigate("/login");
  }

  return <div>Tasks for UserId: {props.userId}</div>;
};

export default Tasks;
