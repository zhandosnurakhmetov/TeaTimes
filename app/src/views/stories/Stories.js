import React, { Component } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import BooksCollectionView from './BooksCollectionView';

class Stories extends Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <ImageBackground source={require('../../backgrounds/default.png')} style={styles.container}>
          <BooksCollectionView />
      </ImageBackground>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Stories;
