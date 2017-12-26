import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import constants from '../../constants';

const { fontWeight } = constants;

class NavigationBar extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Icon name="keyboard-arrow-left" size={40} />
        </View>
        <View style={styles.rightContainer}>
          <TouchableOpacity>
            <Text style={styles.language}>EN</Text>
          </TouchableOpacity>
          <Icon name="share" style={styles.icon} size={25} />
          <Icon name="bookmark-border" style={styles.icon} size={30} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    backgroundColor: 'transparent'
  },
  leftContainer: {
    flexGrow: 0,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  rightContainer: {
    flexGrow: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  language: {
    fontSize: 20,
    color: 'black',
    fontFamily: 'Avenir',
    fontWeight: fontWeight.heavy,
    backgroundColor: 'transparent',
    marginRight: 10
  },
  icon: {
    marginRight: 10,
    marginLeft: 10
  }
});

export default NavigationBar;
