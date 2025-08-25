import React from "react";
import "./edit.css";
import { useState } from "react";
import {editItem} from '../../services/services'


function Popup(props) {
  const [newText,setNewItem] = useState(props.text)

  return (
    <div className="editContainer">
      <div className="edit">
        <input
          type="text"
          placeholder="add task"
          onChange={(event) => {
            setNewItem(event.target.value);
          }}
          onKeyDown={async (event) => {
            if (event.key == "Enter") {
              await editItem(props.id, newText);
              props.setEdit({state:false,id:null,text:null})
              props.fetchData();
            }else if(event.key == "Escape"){
              props.setEdit({state:false,id:null,text:null})
            }
          }}
          value={newText}
        />
      </div>
    </div>
  );
}

export default Popup;
