import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from "react-router";

import App from './views/Popup/App';
import 'normalize.css';

ReactDOM.render(
  <React.StrictMode>
    <MemoryRouter>
      <App />
    </MemoryRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
