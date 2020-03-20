import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/Home';
import { Provider } from 'react-redux';
import store from './store';
import Amplify from 'aws-amplify';
import awsmobile from './aws-exports';

Amplify.configure(awsmobile);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route path='/'>
          <Home />
        </Route>
      </Router>
    </Provider>
  );
}

export default App;
