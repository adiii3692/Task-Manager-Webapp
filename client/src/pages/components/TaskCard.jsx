import React, { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const TaskCard = ({ task, index }) => {

  return (
    <div key={index} className="flex justify-evenly items-center gap-x-4">
      <li key={task._id}>
        {index + 1}) {task.title}
      </li>
      <Link to={`/update/${task._id}`} key={'Edit'}>
            <AiOutlineEdit className="text-2xl text-white" key={index}></AiOutlineEdit>
      </Link>
      <Link to={`/delete/${task._id}`} key={'Delete'}>
        <MdOutlineDelete className="text-2xl text-white" key={index}></MdOutlineDelete>
      </Link>
    </div>
  );
};

export default TaskCard;
