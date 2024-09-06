import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify-modernize";
import axios from "axios";
import Header from "./components/Header.jsx";

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
    axios.get(`http://localhost:5555/info/${id}`)
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
    axios.put(`http://localhost:5555/update/${id}`,updatedTask)
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
    <div className="flex flex-col h-full bg-image text-white">
      <Header userId={id} />
      <div className="flex flex-col wrapper-border rounded-xl w-[400px] my-8 p-4 mx-auto bg-transparent blur-bg bg-shadow">
        <div className="p-4 flex justify-center">
          <h1 className="text-3xl font-bold">Update Task</h1>
        </div>
        <div className="my-4 p-white">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="wrapper-border bg-transparent text-white px-4 py-2 w-full rounded-full"
          />
        </div>
        <div className="my-4 p-white">
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="wrapper-border bg-transparent text-white px-4 py-2 w-full rounded-full"
          />
        </div>
        <div className="my-4 p-white">
          <input
            type="date"
            onChange={(e) => setDueDate(e.target.value)}
            className="wrapper-border bg-transparent text-white px-4 py-2 w-full rounded-full"
          />
        </div>
        <button className="p-2 bg-white m-8 rounded-full" onClick={updateTask}>
          <span className="text-black">Update</span>
        </button>
      </div>
    </div>
  );
};

export default UpdateTask;
