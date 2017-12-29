import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import constants from '../../constants';

const { fontWeight } = constants;

export default class AudioPlayer extends Component {
  render() {
    const { color, textColor, iconColor } = this.props;
    return (
      <View style={styles(color, textColor).container}>
        <Icon name="play-arrow" style={styles.icon} size={30} color={iconColor} />
        <Text style={styles(color, textColor).title}>The Fox and The Crow</Text>
      </View>
    );
  }
}

const styles = (color, textColor) =>
  StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      height: 50,
      backgroundColor: color
    },
    icon: {
      marginLeft: 15
    },
    title: {
      fontSize: 15,
      color: textColor,
      fontFamily: 'Avenir',
      fontWeight: fontWeight.medium,
      backgroundColor: 'transparent',
      marginLeft: 20
    }
  });
