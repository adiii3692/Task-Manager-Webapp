import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

const TaskModal = ({ task, onClose }) => {
  return (
    <div
      className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[600px] max-w-full h-[400px] bg-white rounded-xl p-4 flex flex-col relative"
      >
        <AiOutlineCloseCircle
          className="absolute right-6 top-6 text-3xl text-red-600 cursor-pointer"
          onClick={onClose}
        />
        <h2 className="w-fit px-4 py-1 bg-red-300 rounded-lg">
          {task.dueDate}
        </h2>
        <h4 className="my-2 text-gray-500">{task._id}</h4>
        <div className="flex justify-start items-center gap-x-2">
          <h2 className="my-1">{task.title}</h2>
        </div>
        <div className="flex justify-start items-center gap-x-2">
          <h2 className="my-1">{task.description}</h2>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
