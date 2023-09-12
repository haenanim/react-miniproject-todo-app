import React from 'react';
import axios from 'axios';
import './TodoItem.css';
interface props {
  todoId?: any;
  content?: any;
  number?: any;
  deletePost?: any;
}
export default function TodoItem({
  todoId,
  content,
  number,
  deletePost,
}: props) {
  return (
    <li className="todo-item">
      <div>
        {number}. {content}
      </div>
      <button
        className="delete-btn"
        onClick={() => {
          deletePost(todoId);
        }}
      >
        X
      </button>
    </li>
  );
}
