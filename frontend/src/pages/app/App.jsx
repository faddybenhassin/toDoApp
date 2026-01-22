import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../util/authContext";
import { toggleItem, deleteItem, addItem } from "../../util/services";
import { FaTrash, FaPen } from "react-icons/fa";
import { RiCheckboxCircleFill, RiCheckboxCircleLine } from "react-icons/ri";
import Edit from "../../components/edit/edit";
import Desc from "../../components/desc/desc"
import './app.css'
import handleInput from "../../util/handleInput";



function TodoItems({ data, fetchData, setEdit, setDesc}) {
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
            setDesc({ state: true, text: item.text, desc: item.desc});
          }}
        >
          {item.text}
        </p>

        <FaPen
          id="editBtn"
          onClick={() => {
            setEdit({ state: true, id: item.id, text: item.text, desc: item.desc});
          }}
        />
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
  const [edit, setEdit] = useState({ state: false, id: null, text: null, desc: null  });
  const [desc, setDesc] = useState({ state: false, text: null, desc: null });

  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  function handleAuth() {
    if(isAuthenticated()) logout();
    navigate('/login');
  }

  async function fetchData() {
    
    
    try {
      // Get the token from localStorage
      const token = localStorage.getItem('token'); 

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/todo`, {
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
      <div className="appContainer">
        <button id="authBtn" onClick={handleAuth}>{isAuthenticated()? "Logout": "login"}</button>
        <div className="todoContainer">
          <div className="todoHeader">
            <h1>ToDo:</h1>
          </div>

          <div className="todoInput">
            <input
              type="text"
              placeholder="@tag task / description"
              onChange={(event) => {
                setTodoInput(event.target.value);
              }}
              value={todoInput}
              onKeyDown={async (event) => {
                if (event.key == "Enter") {
                  try {
                    const newTask = handleInput(todoInput)
                    await addItem(newTask); 
                    setTodoInput("");
                    fetchData();
                  } catch (error) {
                    console.error("Failed to add task:", error);
                  }
                }
              }}
              />
          </div>
          <TodoItems data={data} fetchData={fetchData} setEdit={setEdit} setDesc={setDesc}/>
        </div>

        {edit.state ? (
          <Edit
          fetchData={fetchData}
          setEdit={setEdit}
          id={edit.id}
          text={edit.text}
          desc={edit.desc}
          />
        ) : null}
        {desc.state ? (
          <Desc
          setDesc={setDesc}
          text={desc.text}
          desc={desc.desc}
          />
        ) : null}
      </div>
    </>
  );
}

export default App;
