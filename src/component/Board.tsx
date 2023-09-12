import React from 'react';
import './Board.css';
import TodoList from './TodoList';

export default function Board() {
  return (
    <div className="board">
      {/* TITLE */}
      <div className="title">MY TODO LIST</div>
      <div>
        {/* SUB_TITLE */}
        <div className="todo-title">LIST</div>
        {/* Main Content */}
        <TodoList></TodoList>
      </div>
    </div>
  );
}
