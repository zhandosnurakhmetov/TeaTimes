import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { AsyncStorage, StyleSheet, ActivityIndicator, View } from 'react-native';
import throttle from 'lodash/throttle';

import Router from './src/config/router';
import reducers from './src/reducers';

const STORE_KEY_NAME = 'STORE_KEY';

const loadState = () =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(STORE_KEY_NAME)
      .then(value => {
        if (value == null) {
          resolve(undefined);
        }
        resolve(JSON.parse(value));
      })
      .catch(error => {
        resolve(undefined);
      });
  });

const configureStore = () => {
  const middlewares = [ReduxThunk];
  return new Promise((resolve, reject) => {
    loadState().then(initialState => {
      const store = createStore(reducers, initialState, applyMiddleware(...middlewares));
      store.subscribe(
        throttle(() => {
          const { theme } = store.getState();
          const state = JSON.stringify({
            theme
          });
          AsyncStorage.setItem(STORE_KEY_NAME, state).then(() => {});
        }, 1000)
      );
      resolve(store);
    });
  });
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reduxLoaded: false
    };
    configureStore().then(store => {
      this.store = store;
      this.setState({
        reduxLoaded: true
      });
    });
  }

  render() {
    const { reduxLoaded } = this.state;
    return reduxLoaded ? (
      <Provider store={this.store}>
        <Router />
      </Provider>
    ) : (
      <View style={styles.container}>
        <ActivityIndicator color="black" animating={!reduxLoaded} size="large" />
      </View>
    );
  }
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  }
});
