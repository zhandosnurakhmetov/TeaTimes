import React, { Component } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

class Stories extends Component {
  render() {
    return (
      <ImageBackground source={require('../../backgrounds/default.png')} style={styles.container} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Stories;