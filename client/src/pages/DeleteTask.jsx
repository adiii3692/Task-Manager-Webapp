import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify-modernize";
import axios from "axios";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import { PORT } from "../../../server/config.js";

const DeleteTask = () => {

  const {id} = useParams();
  const navigate = useNavigate();
  const notify = (response) => toast.success(response);

  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState(Date.now());
  const [description,setDescription] = useState('');

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
  };

  const deleteTask = ()=>{
    axios.delete(`http://localhost:${PORT}/${id}`)
    .then(()=>{
      notify('Task Deleted!');
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
  };
  useEffect(()=>{getOgTask()},[]);

  return (
    <div>
      <Header userId={id} />
      <div className="p-4 flex justify-center">
        <h1 className="text-3xl">Delete Task</h1>
      </div>
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Task Title</label>
          <input
            disabled
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Description</label>
          <input
            disabled
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Due Date</label>
          <input
            disabled
            type="date"
            onChange={(e) => setDueDate(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="flex flex-col items-center">
          <h3 className='text-2xl'>Are you sure you want to delete this book?</h3>
          <button className="p-2 bg-sky-300 m-8" onClick={deleteTask}>
            Delete!
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default DeleteTask
