import axios from 'axios';
import React, { useEffect, useState } from 'react';

type Todo = { todoListId: number; content: string };
export default function TodoList() {
  const [contents, setContents] = useState<Todo[]>([]);
  useEffect(() => {
    async function fatchData() {
      return await axios.get('http://localhost:8080/get/all').then((res) => {
        console.log(res);
        setContents(res.data);
      });
    }
    fatchData();
  }, []);

  useEffect(() => {
    for (let i = 0; i < contents.length; ++i) {
      console.log(contents[i].content);
    }
  }, [contents]);

  function sendPost() {
    axios
      .post('http://localhost:8080/create', {
        content: 'first post',
      })
      .then((res: any) => {
        console.log('성공');
      })
      .catch((err: any) => {
        console.log('실패');
        console.log(err.response.data.message);
      });
  }

  function checkContetns() {
    console.log(contents);
    // console.log(result);
  }
  return (
    <div>
      <ul>
        {contents.map((x) => {
          return (
            <li key={x.todoListId}>
              {x.todoListId}, {x.content}
            </li>
          );
        })}
      </ul>
      <button onClick={sendPost}>보내기</button>
      <button onClick={checkContetns}>확인하기</button>
    </div>
  );
}
