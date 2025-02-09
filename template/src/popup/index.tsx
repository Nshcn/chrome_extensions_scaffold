import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const Popup = () => {
  const handleClick = () => {
    // 打印日志到控制台
    console.log('Popup button clicked!');
    
    // 发送消息给 background script
    chrome.runtime.sendMessage({ 
      type: 'SHOW_NOTIFICATION' 
    }).then(() => {
      console.log('Message sent to background');
    }).catch(console.error);
  };

  return (
    <div className="popup">
      <h1>Chrome Extension</h1>
      <p>This is a Chrome extension created with Vite and TypeScript.</p>
      <button onClick={handleClick} className="debug-button">
        Click me for debug
      </button>
      <div className="debug-tip">
        💡 Right click on the popup and select "Inspect" to open DevTools<br/>
        💡 Check background page console in extension page
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
); 