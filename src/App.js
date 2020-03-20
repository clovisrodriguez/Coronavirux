import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import { Provider } from 'react-redux';
import store from './store';
import Amplify from 'aws-amplify';
import awsmobile from './aws-exports';
import Form from './pages/form';

Amplify.configure(awsmobile);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path='/form'>
            <Form />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
