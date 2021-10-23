import React from 'react';
import TodoCounter  from './components/TodoCounter';
import TodoList from './components/TodoList';
import TodoItem from './components/TodoItem';
import CreateTodoButton from './components/CreateTodoButton';
import TodoSearch from './components/TodoSearch';
//import './App.css';

const defaultTodos = [
  {text: 'Cortar cebolla', completed: true},
  {text: 'Limpiar cactus', completed: true},
  {text: 'Despejar las nubes', completed: true},
  {text: 'Manquear con el cesar en warzone', completed: false}
  
];

function App() {

  const localStorageTodos = localStorage.getItem('TODOS_V1');
  let parsedTodos;

  if (!localStorageTodos) {
    localStorage.setItem('TODOS_V1', JSON.stringify([]));
    parsedTodos = [];
  } else {
    parsedTodos = JSON.parse(localStorageTodos);
  }

  const [searchValue, setSearchValue] = React.useState('');
  const [todos, setTodos] = React.useState(parsedTodos);

  const completedTodos = todos.filter(todo => todo.completed).length;
  const totalTodos = todos.length;
  
  let searchedTodos = [];

  if (!searchValue.length >= 1){
    searchedTodos = todos;
  } else{
    searchedTodos = todos.filter(todo => {
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return todoText.includes(searchText);
    });
  }


  const saveTodos = (newTodos) => {
    const stringifiedTodos = JSON.stringify(newTodos);
    localStorage.setItem('TODOS_V1', stringifiedTodos);
    setTodos(newTodos);
  };

  const completeTodo = (text) =>{
    const index = todos.findIndex(todo =>todo.text === text);
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    saveTodos(newTodos); 
  }

  const deleteTodo = (text) =>{
    const newTodos =todos.filter(todo => todo.text !== text);
    saveTodos(newTodos); 
  }


  return (
    <>
      <TodoCounter 
        total={totalTodos}
        completed={completedTodos}
      />
      <TodoSearch 
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <TodoList>
        {searchedTodos.map(
          todo =>(
            <TodoItem 
              key={todo.text} 
              text={todo.text}
              completed = {todo.completed} 
              onComplete = {() => completeTodo(todo.text)}
              onDelete = {()=>deleteTodo(todo.text)}
            />
          )
        )}
      </TodoList> 
      <CreateTodoButton/>
    </>
  );
}

export default App;
