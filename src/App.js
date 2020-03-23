import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import { Provider } from 'react-redux';
import store from './store';
import Amplify from 'aws-amplify';
import awsmobile from './aws-exports';
import Form from './pages/form';
import LandingPage from './pages/landing-page';
import ReactGA from 'react-ga';

Amplify.configure(awsmobile);
ReactGA.initialize('UA-161598004-1');

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path='/form'>
            <Form />
          </Route>
          <Route path='/statistics'>
            <Home />
          </Route>
          <Route exact path='/'>
            <LandingPage />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
