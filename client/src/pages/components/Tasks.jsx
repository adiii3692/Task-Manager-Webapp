import React, { useEffect, useState } from "react";
import { toast } from "react-toastify-modernize";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PORT } from "../../../../server/config.js";

const Tasks = (props) => {
  const notify = (response) => toast.warning(response);
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  const redirect = () => {
    notify("Redirecting to login page!");
    navigate("/login");
  };

  if (props.userId === "") redirect();

  //Get the user's tasks
  const getTasks = () => {
    axios
      .get(`http://localhost:${PORT}/receive/${props.userId}`)
      .then((response) => {
        setTasks(response.data.body[0].tasks);
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

  useEffect(() => {
    getTasks();
  }, []);
  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  return (
    <div>
      Tasks for UserId: {props.userId}
      {/* <button onClick={getTasks} className="rounded-full px-8 py-4 button-bg">Get Tasks</button> */}
      {/* {(!(props.userId===''))?getTasks:redirect} */}
      <ol>
        {tasks.length == 0 ? (
          <li key={"None"}>No Tasks Yet</li>
        ) : (
          tasks.map((task, index) => (
            <li key={index}>
              {index + 1}) {task}
            </li>
          ))
        )}
      </ol>
    </div>
  );
};

export default Tasks;
