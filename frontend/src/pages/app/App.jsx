import { useState, useEffect } from "react";
import { toggleItem, deleteItem, addItem } from "../../services/services";
import { FaTrash } from "react-icons/fa";
import { RiCheckboxCircleFill, RiCheckboxCircleLine } from "react-icons/ri";
import Edit from "../../components/edit/edit";
import './app.css'



function TodoItems({ data, fetchData, setEdit }) {
  if (!data) return null;
  return data.map((item) => {
    return (
      <div className="todoItem" key={item.id}>
        <div
          onClick={async () => {
            await toggleItem(item.id, item.isDone);
            fetchData();
          }}
          id="isDone"
        >
          {item.isDone ? <RiCheckboxCircleFill /> : <RiCheckboxCircleLine />}
        </div>

        <p
          className="item"
          style={{ textDecoration: item.isDone ? "line-through" : "none" }}
          onClick={() => {
            setEdit({ state: true, id: item.id, text: item.text });
          }}
        >
          {item.text}
        </p>

        <FaTrash
          id="delBtn"
          onClick={async () => {
            await deleteItem(item.id);
            fetchData();
          }}
        />
      </div>
    );
  });
}

function App() {
  const [todoInput, setTodoInput] = useState("");
  const [data, setData] = useState(null);
  const [edit, setEdit] = useState({ state: false, id: null, text: null });

  async function fetchData() {
    
    
    try {
      // Get the token from localStorage
      const token = localStorage.getItem('token'); 

      const res = await fetch(`${process.env.VITE_API_URL}/api/todo`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Pass the token here
          'Content-Type': 'application/json'
        }
      });
      if (!res.ok) throw new Error("fetch request failed");
      const data = await res.json();
      setData(data);
      console.log("Fetch request succeeded");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="todoContainer">
        <h1>ToDo:</h1>

        <div className="todoInput">
          <input
            type="text"
            placeholder="add task"
            onChange={(event) => {
              setTodoInput(event.target.value);
            }}
            onKeyDown={async (event) => {
              if (event.key == "Enter") {
                await addItem(todoInput);
                setTodoInput("");
                fetchData();
              }
            }}
            value={todoInput}
          />
        </div>
        <TodoItems data={data} fetchData={fetchData} setEdit={setEdit} />
      </div>

      {edit.state ? (
        <Edit
          fetchData={fetchData}
          setEdit={setEdit}
          id={edit.id}
          text={edit.text}
        />
      ) : null}
    </>
  );
}

export default App;
