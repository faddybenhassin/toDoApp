import React from "react";
import "./edit.css";
import { useState } from "react";
import {editItem} from '../../util/services'


function Popup(props) {
  const [newItem,setNewItem] = useState(props.text)
  
  async function handleEditTask() {
    if (!newItem.trim()) return;

    // 1. Parse the input into a structured object
    const [rawTitle, ...descParts] = newItem.split("/");
    // const tagMatch = rawTitle.match(/@(\w+)/);
    
    const newTask = {
      text: rawTitle.replace(/@\w+/, "").trim(),
      desc: descParts.join("/").trim() || "no description provided",
      // tag: tagMatch ? tagMatch[1] : "general",
    };

    // 2. Send the structured object
    try {
      await editItem(props.id, newTask);
      setNewItem("");
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };
  return (
    <div className="editContainer">
      <div className="edit">
        <input
          type="text"
          onChange={(event) => {
            setNewItem(event.target.value);
          }}
          value={newItem}
          onKeyDown={async (event) => {
            if (event.key == "Enter") {
              await handleEditTask()
              props.setEdit({state:false,id:null,text:null})
              props.fetchData();
            }else if(event.key == "Escape"){
              props.setEdit({state:false,id:null,text:null})
            }
          }}
        />
      </div>
    </div>
  );
}

export default Popup;
