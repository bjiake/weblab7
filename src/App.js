import { useState, useEffect } from "react";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import { getTodos, createTodo, deleteTodo, getSubTodosByIds, createSubTodo, deleteSubTodo } from "./api";
import "./App.css";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(null);
  const [subTodoTitle, setSubTodoTitle] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      const todos = await getTodos();
      const todosWithSubTodos = await Promise.all(todos.map(async (todo) => {
        const subTodos = await getSubTodosByIds(todo.SubTodoIds);
        return { ...todo, subTodos };
      }));
      setTodos(todosWithSubTodos);
    };

    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (title !== "" && description !== "" && status !== null) {
      const newTodo = await createTodo({ title, description, status: { Value: status }, SubTodoIds: [] });
      setTodos([...todos, { ...newTodo, subTodos: [] }]);
      setTitle("");
      setDescription("");
      setStatus(null);
    }
  };

  const addSubTodo = async (todoId) => {
    if (subTodoTitle !== "") {
      const newSubTodo = await createSubTodo({ title: subTodoTitle, status: { Value: 1 } });
      const updatedTodos = todos.map(todo => {
        if (todo.id === todoId) {
          return { ...todo, subTodos: [...todo.subTodos, newSubTodo] };
        }
        return todo;
      });
      setTodos(updatedTodos);
      setSubTodoTitle("");
    }
  };

  const deleteTodoItem = async (id) => {
    await deleteTodo(id);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const deleteSubTodo = async (idSub) => {
    await deleteSubTodo(idSub);
    const fetchTodos = async () => {
      const todos = await getTodos();
      const todosWithSubTodos = await Promise.all(todos.map(async (todo) => {
        const subTodos = await getSubTodosByIds(todo.SubTodoIds);
        return { ...todo, subTodos };
      }));
      setTodos(todosWithSubTodos);
    };

    await fetchTodos();
  }

  return (
      <div className="App">
        <h1>React Todo App</h1>
        <TodoInput
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            status={status}
            setStatus={setStatus}
            addTodo={addTodo}
        />
        <TodoList
            list={todos}
            remove={deleteTodoItem}
            removeSubTodo={deleteSubTodo}
            addSubTodo={addSubTodo}
            setSubTodoTitle={setSubTodoTitle}
            subTodoTitle={subTodoTitle}
        />
      </div>
  );
};

export default App;
