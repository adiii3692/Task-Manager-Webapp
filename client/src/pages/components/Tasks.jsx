import React, { useEffect, useState } from "react";
import { toast } from "react-toastify-modernize";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PORT } from "../../../../server/config.js";
import TaskCard from "./TaskCard.jsx";
import { IoCreate } from "react-icons/io5";
import { Link } from "react-router-dom";

const Tasks = (props) => {
  const notify = (response) => toast.warning(response);
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [tasksInfo, setTasksInfo] = useState([]);

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
        setTasks(response.data.body);
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
    console.log("Tasks: "+tasks);
  }, [tasks]);

  return (
    <div>
      Tasks for UserId: {props.userId}
      {/* <button onClick={getTasks} className="rounded-full px-8 py-4 button-bg">Get Tasks</button> */}
      {/* {(!(props.userId===''))?getTasks:redirect} */}
      <ol>
        <div className="flex mx-auto w-[600px] justify-center items-center border-2 border-green-400 rounded-lg p-4 my-auto gap-x-4">
          <div className="flex justify-end">
            <Link to={`/create/${props.userId}`}>
              <IoCreate className="text-3xl" />
            </Link>
          </div>
          <div className="flex flex-col">
            {tasks.length == 0 ? (
              <li key={"None"}>No Tasks Yet</li>
            ) : (
              tasks.map((task,index)=>(<TaskCard task={task} index={index} key={index}/>))
            )}
          </div>
        </div>
      </ol>
    </div>
  );
};

export default Tasks;
