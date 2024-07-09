import React from "react";

const TaskCard = (props) => {
  return (
    <div>
      {props.tasksInfo.map((task, index) => (
        <li key={index}>
          {index + 1}) {task.title}
        </li>
      ))}
    </div>
  );
};

export default TaskCard;
