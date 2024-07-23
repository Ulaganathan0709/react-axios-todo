import React from 'react';
import './styles/ErrorPage.css';
import './styles/media-queries.css';

const ErrorPage = () => {
  return (
    <div className="error-page">
      <h1>Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <a href="/">Go back to the homepage</a>
    </div>
  );
};

export default ErrorPage;
