import React from 'react';
import './Board.css';
import TodoList from './TodoList';

export default function Board() {
  return (
    <div className="board">
      <div className="title">MY TODO LIST</div>
      <div>
        <div className="todo-title">LIST</div>
        <TodoList></TodoList>
      </div>
    </div>
  );
}
