export async function toggleItem(id, currState) {
  try {
    const token = localStorage.getItem('token'); 

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/todo/${id}`, {
      method: "PATCH",
      headers: {
        'Authorization': `Bearer ${token}`, // Pass the token here
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isDone: !currState }),
    });
    if (!res.ok) {
      throw new Error("Toggle request failed");
    } else {
      console.log("Toggle request succeeded");
    }
  } catch (error) {
    console.log(`${error}`);
  }
}

export async function editItem(id,text){
  try {
    const token = localStorage.getItem('token'); 

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/todo/${id}`, {
      method: "PATCH",
      headers: {
        'Authorization': `Bearer ${token}`, // Pass the token here
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: text }),
    });
    if (!res.ok) {
      throw new Error("Edit request failed");
    } else {
      console.log("Edit request succeeded");
    }
  } catch (error) {
    console.log(`${error}`);
  }
}







export async function deleteItem(id) {
  try {
    const token = localStorage.getItem('token'); 

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/todo/${id}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${token}`, // Pass the token here
        "Content-Type": "application/json"
      },
    });
    if (!res.ok) {
      throw new Error("Delete request failed");
    } else {
      console.log("Delete request succeeded");
    }
  } catch (error) {
    console.log(`ERR: ${error}`);
  }
}



export async function addItem(task) {
  try {
    const token = localStorage.getItem('token'); 

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/todo`, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}`, // Pass the token here
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    if (!res.ok) {
      throw new Error("Add request failed");
    } else {
      console.log("Add request succeeded");
    }
  } catch (error) {
    console.log(`ERR: ${error}`);
  }
}