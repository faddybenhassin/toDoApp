export async function toggleItem(id, currState) {
  try {
    const res = await fetch(`http://localhost:5000/api/todo/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isDone: !currState }),
    });
    if (!res.ok) {
      throw new Error("toggle request failed");
    } else {
      console.log("toggle request succedded");
    }
  } catch (error) {
    console.log(`${error}`);
  }
}

export async function editItem(id,text){
  try {
    const res = await fetch(`http://localhost:5000/api/todo/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: text }),
    });
    if (!res.ok) {
      throw new Error("toggle request failed");
    } else {
      console.log("toggle request succedded");
    }
  } catch (error) {
    console.log(`${error}`);
  }
}







export async function deleteItem(id) {
  try {
    const res = await fetch(`http://localhost:5000/api/todo/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error("delete request failed");
    } else {
      console.log("delete request succedded");
    }
  } catch (error) {
    console.log(`ERR: ${error}`);
  }
}



export async function addItem(text) {
  try {
    const res = await fetch(`http://localhost:5000/api/todo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: text }),
    });
    if (!res.ok) {
      throw new Error("request failed");
    } else {
      console.log("request succedded");
    }
  } catch (error) {
    console.log(`ERR: ${error}`);
  }
}