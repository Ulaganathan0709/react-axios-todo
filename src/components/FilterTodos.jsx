import React from 'react';
import PropTypes from 'prop-types';
import './styles/FilterTodos.css';
import './styles/media-queries.css';

const FilterTodos = ({ currentFilter, setFilter }) => {
  return (
    <div className="filter-todos">
      <select value={currentFilter} onChange={(e) => setFilter(e.target.value)}>
        <option value="All">All</option>
        <option value="Completed">Completed</option>
        <option value="Not Completed">Not Completed</option>
        <option value="Overdue">Overdue</option>
      </select>
    </div>
  );
};

FilterTodos.propTypes = {
  currentFilter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
};

export default FilterTodos;
