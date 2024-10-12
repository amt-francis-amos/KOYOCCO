import React from 'react';
import './NotFoundPage.css'; 

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404 - Page Not Found</h1>
      <p className="not-found-message">Oops! The page you're looking for doesn't exist.</p>
    </div>
  );
};

export default NotFoundPage;
