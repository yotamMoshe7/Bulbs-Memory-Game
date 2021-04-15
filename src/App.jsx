import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { WelcomePage } from './pages/welcome-page/WelcomePage';
import { GamePage } from './pages/game-page/GamePage';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <WelcomePage />
        </Route>
        <Route exact path='/game'>
          <GamePage />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
