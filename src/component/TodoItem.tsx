import React from 'react';
import axios from 'axios';
interface props {
  todoId?: any;
  content?: any;
  number?: any;
  deleteItem?: any;
}
export default function TodoItem({
  todoId,
  content,
  number,
  deleteItem,
}: props) {
  function sendPost() {
    axios
      .delete(`http://localhost:8080/delete/${todoId}`)
      .then((res: any) => {
        console.log('성공');
        deleteItem(todoId);
      })
      .catch((err: any) => {
        console.log('실패');
        console.log(err.response.data.message);
      });
  }
  return (
    <li>
      <div>
        {number}. {content}
      </div>
      <button onClick={sendPost}>X</button>
    </li>
  );
}
