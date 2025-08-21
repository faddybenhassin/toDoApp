import { useState, useEffect } from "react";
import { toggleItem, deleteItem, addItem } from "./services/services";

function TodoItems({ data, callback }) {
  if (!data) return null;
  return data.map((item) => {
    return (
      <div className="todoItem" key={item.id}>
        <div className="todoData">
          <input
            type="checkbox"
            onChange={async () => {
              await toggleItem(item.id, item.isDone);
              callback();
            }}
            name="isDone"
            id="isDone"
            checked={item.isDone}
          />
          <p className="item">{item.text}</p>
        </div>
        <div className="btns">
          <input
            type="button"
            value="delete"
            onClick={async () => {
              await deleteItem(item.id);
              callback();
            }}
          />
        </div>
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
        <h1>To-Do list📝</h1>
        <div className="inputContainer">
          <div className="todoInput">
            <input
              type="text"
              onChange={(event) => {
                setTodoInput(event.target.value);
              }}
              value={todoInput}
            />
          </div>
          <input
            type="button"
            value="add"
            id="addBtn"
            onClick={async () => {
              await addItem(todoInput);
              fetchData();
            }}
          />
        </div>
        <TodoItems data={data} callback={fetchData} />
      </div>
    </>
  );
}

export default App;
