import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import constants from '../../constants';

const { fontWeight } = constants;

export default class AudioPlayer extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Icon name="play-arrow" style={styles.icon} size={30} />
        <Text style={styles.title}>The Fox and The Crow</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#D7CCC8'
  },
  icon: {
    marginLeft: 15
  },
  title: {
    fontSize: 15,
    color: 'black',
    fontFamily: 'Avenir',
    fontWeight: fontWeight.medium,
    backgroundColor: 'transparent',
    marginLeft: 20
  }
});
