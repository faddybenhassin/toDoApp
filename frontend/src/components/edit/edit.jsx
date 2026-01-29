import React from "react";
import "./edit.css";
import { useState } from "react";
import {editItem} from '../../util/services'
import handleInput from "../../util/handleInput"

function Popup(props) {
  const [editInput,setEditInput] = useState(`@${props.tag} ${props.text} / ${props.desc}`)
  
  return (
    <div className="editContainer">
      <div className="edit">
        <input
          type="text"
          onChange={(event) => {
            setEditInput(event.target.value);
          }}
          value={editInput}
          onKeyDown={async (event) => {
            if (event.key == "Enter") {
              try {
                const newTask = handleInput(editInput)
                await editItem(props.id, newTask);
                setEditInput("");
              } catch (error) {
                console.error("Failed to add task:", error);
              }
              props.setEdit({state:false,id:null, tag:null, text:null, desc:null})
              props.fetchData();
            }else if(event.key == "Escape"){
              props.setEdit({state:false,id:null, tag:null, text:null, desc:null})
            }
          }}
        />
      </div>
    </div>
  );
}

export default Popup;
