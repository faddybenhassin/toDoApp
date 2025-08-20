import { useState ,useEffect } from 'react'


async function toggle(id,currState){
      try {
        const res = await fetch(`http://localhost:5000/api/todo/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({isDone: !currState})
        })
        if(!res.ok) {
          throw new Error("bitch ass request!!")
        }else{
          console.log("it's done right")
          // callback()
        }
      } catch (error) {
        console.log(`ERR: ${error}`)
      }
    

}

function TodoItems(){
  const [data,setData] = useState(null)



  async function fetchData(){
    try {
        const res = await fetch("http://localhost:5000/api/todo")
        if(!res.ok) throw new Error("bitch ass request!!")
        const data = await res.json()
        setData(data);          
      } catch (error) {
        console.log(`ERR: ${error}`)
      }
  }



  useEffect(() => {
    fetchData()
  }, []);


  
  if(data){
    return( 
        data.map((item,index)=>{
          return (<>
            <div className="todoItem" key={index}>
              <div className="todoData">
                <input type="checkbox" onChange={async ()=>{await toggle(item.id,item.isDone);fetchData()}} name="isDone" id="isDone" checked={item.isDone}/>
                <input type="text" name="item" id="item" value={item.text}/>
              </div>
              <div className="btns">
                <input type="button" value="delete"/>
              </div>
           </div> 
          </>)

        })
    )
  }else{
    return(<>
      <p>loading...</p>
    </>)
  }

}




function App() {

  return (
    <>

      <div className="todoContainer">
        <h1>To-Do list📝</h1>
        <div className="inputContainer">
          <div className="todoInput">
            <input type="text" />
          </div>
          <input type="button" value="add" id='addBtn'/>
        </div>
        

        {TodoItems()}
      </div>
    </>
  )
}

export default App
