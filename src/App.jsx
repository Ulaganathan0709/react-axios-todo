import React, { useState, useEffect, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';
import FilterTodos from './components/FilterTodos';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorPage from './components/ErrorPage';
import './components/styles/media-queries.css';
import './components/styles/App.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('All');
  const [counts, setCounts] = useState({ completed: 0, pending: 0, overdue: 0 });
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchTodos = useCallback(async () => {
    setLoading(true);
    const response = await axios.get('https://669b51c1276e45187d351f5b.mockapi.io/todo/TODO');
    setTodos(response.data);
    updateCounts(response.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const addTodo = async (todo) => {
    const response = await axios.post('https://669b51c1276e45187d351f5b.mockapi.io/todo/TODO', todo);
    const newTodos = [...todos, response.data];
    setTodos(newTodos);
    updateCounts(newTodos);
  };

  const updateTodo = async (id, updatedFields) => {
    const response = await axios.put(`https://669b51c1276e45187d351f5b.mockapi.io/todo/TODO/${id}`, updatedFields);
    const newTodos = todos.map((todo) => (todo.id === id ? response.data : todo));
    setTodos(newTodos);
    updateCounts(newTodos);
  };

  const deleteTodo = async (id) => {
    await axios.delete(`https://669b51c1276e45187d351f5b.mockapi.io/todo/TODO/${id}`);
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    updateCounts(newTodos);
  };

  const updateCounts = (todos) => {
    const today = new Date();
    const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    const completed = todos.filter((todo) => todo.status === 'Completed').length;
    const overdue = todos.filter((todo) => {
      const dueDate = new Date(todo.dueDate);
      const dueDateOnly = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate());
      return dueDateOnly < todayDateOnly && todo.status !== 'Completed';
    }).length;
    const pending = todos.filter((todo) => {
      const dueDate = new Date(todo.dueDate);
      const dueDateOnly = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate());
      return todo.status !== 'Completed' && dueDateOnly >= todayDateOnly;
    }).length;

    setCounts({ completed, pending, overdue });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="app">
      <Sidebar expanded={sidebarExpanded} setExpanded={setSidebarExpanded} />
      <div className={`main-content ${sidebarExpanded ? 'expanded' : ''}`}>
        <Header />
        <div className="content">
          <AddTodoForm onAddTodo={addTodo} />
          <div className="counts">
            <div className="box completed">Completed: {counts.completed}</div>
            <div className="box pending">Pending: {counts.pending}</div>
            <div className="box overdue">Overdue: {counts.overdue}</div>
          </div>
          <FilterTodos currentFilter={filter} setFilter={setFilter} />
          <Routes>
            <Route path="/" element={<TodoList todos={todos} filter={filter} updateTodo={updateTodo} deleteTodo={deleteTodo} />} />
            <Route path="/pending" element={<TodoList todos={todos} filter="Not Completed" updateTodo={updateTodo} deleteTodo={deleteTodo} />} />
            <Route path="/completed" element={<TodoList todos={todos} filter="Completed" updateTodo={updateTodo} deleteTodo={deleteTodo} />} />
            <Route path="/overdue" element={<TodoList todos={todos} filter="Overdue" updateTodo={updateTodo} deleteTodo={deleteTodo} />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
