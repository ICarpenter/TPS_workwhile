import './App.css';
import { useId, useState } from 'react';


const todoTemplate = {
  text: '',
  isDone: false,
}

const textInputTemplate = {
  value: '',
  isValid: true,
}

function App() {
  const [formState, setValue] = useState({ 
    textInput: {
      ...textInputTemplate
    },
    todos: {},
    isSubmitted: false,
  });

  function submit (event) {
    event.preventDefault();
    const id = Date.now();
    const newTodos = { ...formState.todos }
    newTodos[id] = {...todoTemplate, id: id, text: formState.textInput.value }
    setValue({ ...formState, isSubmitted: true, textInput: { ...textInputTemplate }, todos: newTodos } );

    console.log(formState);
  };

  function changeTextValue (event) {
    const textValue = event.currentTarget.value;

    const isValid = textValue.length > 2

    setValue({ ...formState, textInput: { isValid: isValid, value: event.currentTarget.value } });
  };

  function toggleDone(isDone, todo) {
    const newTodos = { ...formState.todos }
    newTodos[todo.id] = {...todo, isDone: isDone }
    setValue({ ...formState, todos: newTodos } );
  }

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={submit}>
          <input type="text" value={formState.textInput.value} onChange={changeTextValue}/>
          { !formState.textInput.isValid && <p>is invalid!</p>}

          <button type="submit">click me</button>
        </form>

        <div>
        Not Done list
          <ul>
            {Object.values(formState.todos).filter((todo) => !todo.isDone).map((todo) => (
              <li key={todo.id}>
                <p>{todo.text}</p>
                <button onClick={() => toggleDone(true, todo)}>mark done</button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          Done list
          <ul>
            {Object.values(formState.todos).filter((todo) => todo.isDone).map((todo) => (
              <li key={todo.id}>
                <p>{todo.text}</p>
                <button onClick={() => toggleDone(false, todo)}>mark not done</button>
              </li>
            ))}
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;
