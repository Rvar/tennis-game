import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Tennis from './tennis';

ReactDOM.render(
  <React.StrictMode>
  <div className="App">
    <header className="App-header">
      Tennis Game
    </header>
    <Tennis />
  </div>
  </React.StrictMode>,
  document.getElementById('root')
);
