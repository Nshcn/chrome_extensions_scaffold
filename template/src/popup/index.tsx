import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const Popup = () => {
  return (
    <div className="popup">
      <h1>Chrome Extension</h1>
      <p>This is a Chrome extension created with Vite and TypeScript.</p>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
); 