import { useState ,useEffect } from 'react'




function TodoItems(){
  const [data,setData] = useState(null)


  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("http://localhost:5000/api/todo")
        if(!res.ok) throw new Error("bitch ass request!!")
        const data = await res.json()
        setData(data);          
      } catch (error) {
        console.log(`ERRORRRRRRRRR: ${error}`)
      }
    })();

  }, []);



  if(data){
    return( 
        data.map((item,index)=>{
          return (<>
            <div className="todoItem" key={index}>
              <div className="todoData">
                <input type="checkbox" name="isDone" id="isDone" checked={item.isDone}/>
                <p id="item">{item.text}</p>
              </div>
              <div className="btns">
                <input type="button" value="edit"/>
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
  // const [count, setCount] = useState(0)

  return (
    <>
      <div className="todoContainer">
        {TodoItems()}
      </div>
    </>
  )
}

export default App
