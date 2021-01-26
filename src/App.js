import React, {useReducer, useRef, useCallback } from 'react';
import TodoTemplate from "./components/TodoTemplate";
import TodoInsert from "./components/TodoInsert";
import TodoList from "./components/TodoList";

function App() {
  const nextId = useRef(2);

  const [todos, dispatch] = useReducer(todoReducer, null, createBulkTodos);


  const onInsert = useCallback(
    text => {
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      };
      dispatch({ type: 'INSERT', todo });
      nextId.current++;
    },
    [],
  );

  const onRemove = useCallback(
    id => dispatch({ type: 'REMOVE', id }),
    [],
  );

  const onToggle = useCallback(
    id => dispatch({ type: 'TOGGLE', id }),
    [],
  );

  return (
    <TodoTemplate >
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
}

const createBulkTodos = () => {
  const arr = [];
  for (let i = 0; i < 2500; i++) {
    arr.push({
      id: i,
      text: `할 일 ${i + 1}`,
      checked: false,
    });
  }

  return arr;
}

const todoReducer = (todos, action) => {
 switch (action.type) {
   case 'INSERT': {
     return todos.concat(action.todo);
   }
   case 'REMOVE':
     return todos.filter(todo => todo.id !== action.id);
   case 'TOGGLE':
     return todos.map(todo => todo.id === action.id
       ? { ...todo, checked: !todo.checked }
       : todo);
   default:
     return todos;
 }
}

export default App;
