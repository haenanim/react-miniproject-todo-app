import axios from 'axios';
import { useEffect, useState } from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';

type Todo = { todoListId: number; content: string };
export default function TodoList() {
  const [contents, setContents] = useState<Todo[]>([]);
  const [newContent, setNewContent] = useState<string>('');

  async function fatchData() {
    return await axios.get('http://localhost:8080/get/all').then((res) => {
      setContents(res.data);
    });
  }
  function deleteItem() {
    fatchData();
  }
  useEffect(() => {
    fatchData();
  }, []);

  function sendPost() {
    const newobj = {
      content: newContent,
    };
    axios
      .post('http://localhost:8080/create', newobj)
      .then((res: any) => {
        console.log('성공');
        setNewContent('');
        fatchData();
      })
      .catch((err: any) => {
        console.log('실패');
        console.log(err.response.data.message);
      });
  }

  return (
    <div className="todo-list">
      <ul>
        {contents.map((x, y) => {
          return (
            <TodoItem
              key={y}
              todoId={x.todoListId}
              content={x.content}
              number={y + 1}
              deleteItem={deleteItem}
            ></TodoItem>
          );
        })}
      </ul>
      <form className="input-section">
        <input
          className="input"
          type="text"
          onChange={(e) => {
            setNewContent(e.target.value);
          }}
        />
        <button className="send-button" type="submit" onClick={sendPost}>
          보내기
        </button>
      </form>
    </div>
  );
}
