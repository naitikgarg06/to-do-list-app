import './App.css';
import { useState } from 'react';

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [toEdit, setToEdit] = useState(0)


  const handleSubmit = (e) => {
    e.preventDefault();

    if (toEdit) {
      const editTodo = todos.find((i) => i.id === toEdit)
      const updateTodos = todos.map((t) => t.id === editTodo.id
        ? (t = { id: t.id, todo })
        : (t = { id: t.id, todo: t.todo })
      )
      setTodos(updateTodos);
      setToEdit(0);
      setTodo("");
      return;      
    }

    if (todo.trim() !== "") {
      setTodos([{ id: `${todo} - ${Date.now()}`, todo }, ...todos])
    }
    setTodo("");
  }

  const handleDelete = (id) => {
    const afterDeleting = todos.filter((to) => to.id !== id)
    setTodos([...afterDeleting])
  }

  const handleEdit = (id) => {
    // return entire object
    const tobeEdited = todos.find((i) => i.id === id);
    setTodo(tobeEdited.todo)
    setToEdit(tobeEdited.id)
  }

  return (
    <div className="App">
      <div className='container'>
        <h2>To Do List App</h2>

        <form className='formToDo' onSubmit={handleSubmit}>
          <input className='todoInput' type='text' value={todo} onChange={(e) => setTodo(e.target.value)}></input>
          <button type='submit'>{toEdit ? "edit" : "Go"}</button>
        </form>

        <ul className='allToDos'>
          {
            todos.map((t) => (
              <li className='singleTodo'>
                <span className='todoText' key={t.id}>{t.todo}</span>
                <button onClick={() => handleEdit(t.id, todo)}>Edit</button>
                <button onClick={() => handleDelete(t.id)}>Delete</button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
