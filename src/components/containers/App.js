import React from 'react';
import Player from './Player';
import GlobalStyle from '../styles/GlobalStyle';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Player} />
        <Route exact path='/:activeVideo' component={Player} />
      </Switch>
      
      <GlobalStyle />
    </Router>
  );
};

export default App;