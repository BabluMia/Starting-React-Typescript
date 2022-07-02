import React, { useCallback, useReducer, useRef } from 'react';
import logo from './logo.svg';
import './App.css';

// import Lists from './Components/Lists';

interface Todo {
  id:number,
  text:string
}
type ActionType = {type:"ADD",text:string} | {type:"REMOVE" , id : number}
function App() {
  // reducer
   const reducer =(state : Todo[] , action : ActionType)=>{
    switch (action.type){
      case 'ADD' : 
      return [
        ...state ,
        {
          id: state.length,
          text:action.text
        }
       ];
       case "REMOVE" :
        return state.filter(({id}) => id !== action.id)
    }
  }
  const [todos , dispatch] = useReducer(reducer , [])

  const newTodoRef = useRef<HTMLInputElement>(null)

  const addTodo = useCallback(()=>{
     if(newTodoRef.current){
      dispatch({
        type : 'ADD',
        text : newTodoRef.current.value
       })
       newTodoRef.current.value = ''
     }
  },[])
 
  return (
    <div className='App'>
      {/* <Lists/> */}
    <input type="text" ref={newTodoRef} />
    <button onClick={addTodo}>ADD</button>
      {
        todos.map((todo) => <h5 key={todo.id}>{todo.text} <button onClick={()=>dispatch({type:'REMOVE',id:todo.id})}>Remove</button></h5>
        )
      }
    </div>
  );
}

export default App;
