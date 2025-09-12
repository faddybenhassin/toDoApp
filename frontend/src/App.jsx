import { useState, useEffect } from "react";
import { toggleItem, deleteItem, addItem } from "./services/services";
import { FaTrash } from "react-icons/fa";
import { RiCheckboxCircleFill, RiCheckboxCircleLine } from "react-icons/ri";
import Edit from "./components/edit/edit";

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
    <h1>hey</h1>
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
