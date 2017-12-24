import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import Router from './src/config/router';
import reducers from './src/reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);

export default class App extends Component {
  render() {
    return (
      <Provider store={createStoreWithMiddleware(reducers)}>
        <Router />
      </Provider>
    );
  }
}
