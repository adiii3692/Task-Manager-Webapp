import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify-modernize";
import Header from "./components/Header.jsx";
import axios from "axios";

const CreateTask = () => {

  const { id } = useParams();
  const [title,setTitle] = useState('');
  const [description,setDescription] = useState('');
  const [dueDate,setDueDate] = useState(Date.now());

  const notify = (response) => toast.warning(response.data.message);
  const navigate = useNavigate();

  const createTask = ()=>{

    const newTask = {
      title: title,
      description: description,
      dueDate: dueDate
    };

    axios.post(`http://localhost:5555/create/${id}`,newTask)
    .then((response)=>{
      if (!(response.data.validated)){
        notify(response);
        return;
      }
      notify(response);
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

  return (
    <div className="flex flex-col h-full bg-image text-white">
      <Header userId={id}/>
      <div className="flex flex-col wrapper-border rounded-xl w-[400px] my-8 p-4 mx-auto bg-transparent blur-bg bg-shadow">
        <div className="p-4 flex justify-center">
          <h1 className="text-3xl font-bold">Create Task</h1>
        </div>
        <div className="my-4 p-white">
          <input
            type="text"
            value={title}
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            className="wrapper-border bg-transparent text-white px-4 py-2 w-full rounded-full"
          />
        </div>
        <div className="my-4 p-white">
          <input
            type="text"
            value={description}
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
            className="wrapper-border bg-transparent text-white px-4 py-2 w-full rounded-full"
          />
        </div>
        <div className="my-4 p-white">
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="wrapper-border bg-transparent text-white px-4 py-2 w-full rounded-full"
          />
        </div>
        <button className="p-2 bg-white m-8 rounded-full" onClick={createTask}>
          <span className="text-black">Create</span>
        </button>
      </div>
    </div>
  );
};

export default CreateTask;
