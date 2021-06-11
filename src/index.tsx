import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { render } from 'react-dom';
// import Header from './Header';
import { CssBaseline } from "@material-ui/core"
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

render(<App />, document.getElementById('root'));
