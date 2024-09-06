import React, { useEffect, useState } from "react";
import { toast } from "react-toastify-modernize";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TaskCard from "./TaskCard.jsx";
import { IoCreate } from "react-icons/io5";
import { Link } from "react-router-dom";
import Loading from "./Loading.jsx";

const Tasks = (props) => {
  const notify = (response) => toast.warning(response);
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState([true]);

  const redirect = () => {
    notify("Redirecting to login page!");
    navigate("/login");
  };

  if (props.userId === "") redirect();

  //Get the user's tasks
  const getTasks = () => {
    axios
      .get(`http://localhost:5555/receive/${props.userId}`)
      .then((response) => {
        setTasks(response.data.body);
        setLoading(false);
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

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col absolute top-10 wrapper-border rounded-xl w-[400px] my-8 p-4 mx-auto bg-transparent blur-bg bg-shadow">
          <div className="p-4 flex justify-center">
            <h1 className="text-3xl font-bold">Your To Do Tasks</h1>
          </div>
          <ol>
            <div className="flex justify-end p-4">
              <Link to={`/create/${props.userId}`}>
                <IoCreate className="text-3xl" />
              </Link>
            </div>
            <div className="flex flex-col justify-center items-center p-4">
              {tasks.length == 0 ? (
                <li key={"None"} className="p-4">
                  Hmmm, why so empty &#x1f914;
                </li>
              ) : (
                tasks.map((task, index) => (
                  <TaskCard task={task} index={index} key={index} />
                ))
              )}
            </div>
          </ol>
        </div>
      )}
    </>
  );
};

export default Tasks;
