import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './styles/AddTodoForm.css';
import './styles/media-queries.css';

const AddTodoForm = ({ onAddTodo }) => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(new Date());

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskName || !description || !dueDate) {
      alert("All fields are mandatory");
      return;
    }
    onAddTodo({
      taskName,
      description,
      dueDate: dueDate.toISOString().split('T')[0], // Format the date as YYYY-MM-DD
      status: 'Not Completed'
    });
    setTaskName('');
    setDescription('');
    setDueDate(new Date());
  };

  return (
    <form className="add-todo-form" onSubmit={handleSubmit}>
      <label>Task Name:</label>
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Enter task name"
      />
      <label>Description:</label>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter task description"
      />
      <label>Due Date:</label>
      <DatePicker
        selected={dueDate}
        onChange={(date) => setDueDate(date)}
        dateFormat="yyyy-MM-dd"
        className="date-picker"
      />
      <button type="submit">Add Todo</button>
    </form>
  );
};

AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
};

export default AddTodoForm;
