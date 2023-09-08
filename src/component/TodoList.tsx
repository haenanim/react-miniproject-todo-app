import axios from 'axios';
import React, { useEffect, useState } from 'react';
import TodoItem from './TodoItem';
import { type } from 'os';

type Todo = { todoListId: number; content: string };
export default function TodoList() {
  const [contents, setContents] = useState<Todo[]>([]);
  const [newContent, setNewContent] = useState<string>('');

  async function fatchData() {
    return await axios.get('http://localhost:8080/get/all').then((res) => {
      console.log(res);
      setContents(res.data);
    });
  }
  function deleteItem() {
    fatchData();
  }
  useEffect(() => {
    fatchData();
  }, []);

  useEffect(() => {
    for (let i = 0; i < contents.length; ++i) {
      console.log(contents[i].content);
    }
  }, [contents]);

  function sendPost() {
    const newobj = {
      content: newContent,
    };
    console.log(JSON.stringify(newobj));
    axios
      .post('http://localhost:8080/create', newobj)
      .then((res: any) => {
        console.log('성공');
        fatchData();
      })
      .catch((err: any) => {
        console.log('실패');
        console.log(err.response.data.message);
      });
  }

  function checkContetns() {
    const newarr = {
      contents: { newContent },
    };

    console.log(newarr);
  }
  return (
    <div>
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
      <input
        type="text"
        onChange={(e) => {
          setNewContent(e.target.value);
        }}
      />
      <button onClick={sendPost}>보내기</button>
      <button onClick={checkContetns}>확인하기</button>
    </div>
  );
}
