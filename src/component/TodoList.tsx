import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';

type Todo = { todoListId: number; content: string };
export default function TodoList() {
  const [contents, setContents] = useState<Todo[]>([]);
  const [newContent, setNewContent] = useState<string>('');
  const inputRef: any = useRef();

  async function fatchData() {
    // 서버에서 데이터를 res에 받아온 다음 contents state에 저장
    return await axios.get('http://localhost:8080/get/all').then((res) => {
      setContents(res.data);
    });
  }
  // 화면 렌더시 처음 한번만 실행
  useEffect(() => {
    fatchData();
  }, []);
  // input 칸에 입력한 newContent 내용으로 서버에 전송
  function sendPost(e: any) {
    e.preventDefault();
    axios
      .post('http://localhost:8080/create', {
        content: newContent,
      })
      .then((res: any) => {
        console.log('성공');
        setNewContent('');
        fatchData();
        inputRef.current.value = '';
        console.log(inputRef);
      })
      .catch((err: any) => {
        console.log('실패');
        console.log(err.response.data.message);
      });
  }

  // DB에 저장 되어있는 ID로 데이터 삭제
  function deletePost(todoId: Number) {
    axios
      .delete(`http://localhost:8080/delete/${todoId}`)
      .then((res: any) => {
        console.log('성공');
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
            // X = Todolist contents, x 안에는 프라이머리 번호와 컨텐츠가 있다
            // Y = Index Number
            <TodoItem
              key={y}
              todoId={x.todoListId}
              content={x.content}
              number={y + 1}
              deletePost={deletePost}
            />
          );
        })}
      </ul>
      <form className="input-section">
        <input
          ref={inputRef}
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
