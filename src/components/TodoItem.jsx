import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './styles/TodoItem.css';
import './styles/media-queries.css';

const TodoItem = ({ todo, updateTodo, deleteTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(todo.taskName);
  const [editedDescription, setEditedDescription] = useState(todo.description);
  const [editedDueDate, setEditedDueDate] = useState(new Date(todo.dueDate));

  const handleEdit = () => {
    if (isEditing) {
      if (!editedName || !editedDescription || !editedDueDate) {
        alert("All fields are mandatory");
        return;
      }
      updateTodo(todo.id, {
        taskName: editedName,
        description: editedDescription,
        dueDate: editedDueDate.toISOString().split('T')[0], // Format the date as YYYY-MM-DD
        status: todo.status
      });
    }
    setIsEditing(!isEditing);
  };

  const handleStatusChange = (e) => {
    updateTodo(todo.id, { ...todo, status: e.target.value });
  };

  const getTodoClass = () => {
    const dueDate = new Date(todo.dueDate);
    const today = new Date();
    const dueDateOnly = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate());
    const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    if (todo.status === 'Completed') {
      return 'todo-item completed';
    } else if (dueDateOnly < todayDateOnly) {
      return 'todo-item overdue';
    } else {
      return 'todo-item not-completed';
    }
  };

  return (
    <div className={getTodoClass()}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
          <input
            type="text"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
          <DatePicker
            selected={editedDueDate}
            onChange={(date) => setEditedDueDate(date)}
            dateFormat="yyyy-MM-dd"
            className="date-picker"
          />
        </>
      ) : (
        <>
          <div><strong>Name:</strong> {todo.taskName}</div>
          <div><strong>Description:</strong> {todo.description}</div>
          <div><strong>Due Date:</strong> {todo.dueDate}</div>
        </>
      )}
      <select value={todo.status} onChange={handleStatusChange}>
        <option value="Not Completed">Not Completed</option>
        <option value="Completed">Completed</option>
      </select>
      <button className="edit-button" onClick={handleEdit}>
        {isEditing ? 'Save' : 'Edit'}
      </button>
      <button className="delete-button" onClick={() => deleteTodo(todo.id)}>Delete</button>
    </div>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  updateTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

export default TodoItem;
