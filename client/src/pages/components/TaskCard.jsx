import React, { useState } from "react";
import TaskModal from "./TaskModal.jsx";
import { BiShow } from "react-icons/bi";

const TaskCard = ({ task, index }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div key={index} className="flex gap-x-4">
      <li key={task._id}>
        {index + 1}) {task.title}
      </li>
      <BiShow
        key={index}
        className="inline-flex hover:text-black cursor-pointer"
        onClick={() => setShowModal(true)}
      />
      {showModal && (
        <TaskModal task={task} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default TaskCard;
