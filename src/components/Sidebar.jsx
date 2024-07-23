import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import './styles/Sidebar.css';

const Sidebar = ({ expanded, setExpanded }) => {
  const location = useLocation();

  return (
    <div className={`sidebar ${expanded ? 'expanded' : ''}`}>
      <button className="toggle-button" onClick={() => setExpanded(!expanded)}>
        <span className="hamburger-icon">☰</span>
      </button>
      <div className="sidebar-content">
        <h2>Tasks</h2>
        <nav>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>All Tasks</Link>
          <Link to="/pending" className={location.pathname === '/pending' ? 'active' : ''}>Pending Tasks</Link>
          <Link to="/completed" className={location.pathname === '/completed' ? 'active' : ''}>Completed Tasks</Link>
          <Link to="/overdue" className={location.pathname === '/overdue' ? 'active' : ''}>Overdue Tasks</Link>
        </nav>
      </div>
    </div>
  );
};
Sidebar.propTypes = {
    expanded: PropTypes.bool.isRequired,
    setExpanded: PropTypes.func.isRequired,
  };
export default Sidebar;
