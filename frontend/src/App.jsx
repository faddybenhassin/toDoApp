import { useState, useEffect } from "react";
import { toggleItem, deleteItem, addItem } from "./services/services";
import { FaTrash } from "react-icons/fa";
import { RiCheckboxCircleFill, RiCheckboxCircleLine } from "react-icons/ri";
function TodoItems({ data, callback }) {
  if (!data) return null;
  return data.map((item) => {
    return (
      <div className="todoItem" key={item.id}>
        <div
          onClick={async () => {
            await toggleItem(item.id, item.isDone);
            callback();
          }}
          id="isDone"
        >
          {item.isDone ? <RiCheckboxCircleFill /> : <RiCheckboxCircleLine />}
        </div>

        <p className="item">{item.text}</p>

        <FaTrash
          id="delBtn"
          onClick={async () => {
            await deleteItem(item.id);
            callback();
          }}
        />
      </div>
    );
  });
}

function App() {
  const [todoInput, setTodoInput] = useState("");
  const [data, setData] = useState(null);

  async function fetchData() {
    try {
      const res = await fetch("http://localhost:5000/api/todo");
      if (!res.ok) throw new Error("fetch request failed");
      const data = await res.json();
      setData(data);
      console.log("fetch request succeded");
    } catch (error) {
      console.log(`ERR: ${error}`);
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
        <TodoItems data={data} callback={fetchData} />
      </div>
    </>
  );
}

export default App;
