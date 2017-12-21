import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import constants from '../../constants';

const { colors, fontWeight } = constants;

class Stories extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>The Fox and The Crow</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 100,
    backgroundColor: '#6D4C41',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.coverBorderColor,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 8
    },
    shadowRadius: 2,
    shadowOpacity: 0.5,
  },
  title: {
    fontSize: 14,
    color: 'white',
    fontFamily: 'Avenir',
    fontWeight: fontWeight.roman,
    textAlign: 'center'
  },
});

export default Stories;
