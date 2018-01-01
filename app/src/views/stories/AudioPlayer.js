import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import constants from '../../constants';

const { fontWeight } = constants;

export default class AudioPlayer extends Component {
  render() {
    const { color, textColor, iconColor, onPressAudioTitle } = this.props;
    return (
      <View style={styles(color, textColor).container}>
        <Icon name="play-arrow" style={styles(color, textColor).icon} size={30} color={iconColor} />
        <TouchableOpacity
          onPress={onPressAudioTitle}
          style={styles(color, textColor).textContainer}
        >
          <Text style={styles(color, textColor).title}>The Fox and The Crow</Text>
        </TouchableOpacity>
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
    textContainer: {
      marginLeft: 20,
      width: '100%',
      height: '100%',
      justifyContent: 'center'
    },
    icon: {
      marginLeft: 15
    },
    title: {
      fontSize: 15,
      color: textColor,
      fontFamily: 'Avenir',
      fontWeight: fontWeight.medium,
      backgroundColor: 'transparent'
    }
  });
