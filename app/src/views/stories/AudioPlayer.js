import React, { Component } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

export default class AudioPlayer extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View />
        <Text>The Fox and The Crow</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: '#D7CCC8'
  }
});
