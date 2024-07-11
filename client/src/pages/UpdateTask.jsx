import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify-modernize";
import axios from "axios";
import Header from "./components/Header.jsx";
import { PORT } from "../../../server/config.js";

const UpdateTask = () => {

  const {id} = useParams();
  const navigate = useNavigate();
  const notify = (response) => toast.warning(response);

  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState(Date.now());
  const [description,setDescription] = useState('');

  const updatedTask = {
    title: title,
    dueDate: dueDate,
    description: description
  }

  const getOgTask = ()=>{
    axios.get(`http://localhost:${PORT}/info/${id}`)
    .then((response)=>{
      setTitle(response.data.taskInfo.title);
      setDueDate(response.data.taskInfo.dueDate);
      setDescription(response.data.taskInfo.description);
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
  }

  const updateTask = ()=>{
    axios.put(`http://localhost:${PORT}/update/${id}`,updatedTask)
    .then(()=>{
      notify('Updated Task!');
      navigate('/');
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
  }

  useEffect(()=>{getOgTask()},[]);

  return (
    <div className="flex flex-col h-full bg-image">
      <Header userId={id} />
      <div className="p-4 flex justify-center">
        <h1 className="text-3xl">Update Task</h1>
      </div>
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Task Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Due Date</label>
          <input
            type="date"
            onChange={(e) => setDueDate(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={updateTask}>
          Update!
        </button>
      </div>
    </div>
  );
};

export default UpdateTask;
