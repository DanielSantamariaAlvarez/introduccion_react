import React from 'react';
import TodoCounter  from './components/TodoCounter';
import TodoList from './components/TodoList';
import TodoItem from './components/TodoItem';
import CreateTodoButton from './components/CreateTodoButton';
import TodoSearch from './components/TodoSearch';
//import './App.css';

// const defaultTodos = [
//   {text: 'Cortar cebolla', completed: true},
//   {text: 'Limpiar cactus', completed: true},
//   {text: 'Despejar las nubes', completed: true},
//   {text: 'Manquear con el cesar en warzone', completed: false}
  
// ];

function useLocalStorage(itemName, initialValue){

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [item, setItem] = React.useState(initialValue);

  React.useEffect(()=>{
    setTimeout(()=>{
      try {
        const localStorageItem = localStorage.getItem(itemName);
        let parsedItem;

        if (!localStorageItem) {
          localStorage.setItem(itemName, JSON.stringify(initialValue));
          parsedItem = [];
        } else {
          parsedItem = JSON.parse(localStorageItem);
        }

        setItem(parsedItem);
        setLoading(false)
      } catch (error) {
        setError(error)
      }
    }, 1000);
  });
  


  const saveItem = (newItem) => {
    try {
      const stringifiedItem = JSON.stringify(newItem);
      localStorage.setItem(itemName, stringifiedItem);
      setItem(newItem);
    } catch (error) {
      setError(error)
    }
  };

  

  return {
    item,
    saveItem,
    loading,
    error
  };

}

function App() {

  const {
    item: todos,
    saveItem: saveTodos,
    loading,
    error
  } = useLocalStorage('TODOS_v1', []);
  const [searchValue, setSearchValue] = React.useState('');
  
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


  React.useEffect(() => {

  },[totalTodos])


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
        {error && <p>Desespérate! Ocurrió un error</p>}
        {loading && <p>Cargando TODOs...</p>}
        {(!loading && !searchedTodos.length) && <p>Crea tu primer TODO!</p>}

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
