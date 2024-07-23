import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';
import './styles/TodoList.css';
import './styles/media-queries.css';

const TodoList = ({ todos, filter, updateTodo, deleteTodo }) => {
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'All') return true;
    if (filter === 'Completed') return todo.status === 'Completed';
    if (filter === 'Not Completed') return todo.status !== 'Completed';
    if (filter === 'Overdue') {
      const dueDate = new Date(todo.dueDate);
      const today = new Date();
      const dueDateOnly = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate());
      const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      return dueDateOnly < todayDateOnly && todo.status !== 'Completed';
    }
    return true;
  });

  return (
    <div className="todo-list">
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} updateTodo={updateTodo} deleteTodo={deleteTodo} />
      ))}
    </div>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  filter: PropTypes.string.isRequired,
  updateTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

export default TodoList;
