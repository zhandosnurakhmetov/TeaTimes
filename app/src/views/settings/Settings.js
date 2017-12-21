import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { Text, View, ImageBackground, StyleSheet, Dimensions } from 'react-native';
import colors from '../../constants/colors';

class Settings extends Component {
  render() {
    return (
      <ImageBackground source={require('../../backgrounds/default.png')} style={styles.container}>
        <Text style={styles.title}>SETTINGS</Text>
        <View style={styles.notifications}>
          <Text>Push notifications</Text>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    marginTop: 10,
    fontFamily: 'Avenir',
    fontWeight: '800',
    backgroundColor: 'transparent'
  },
  notifications: {
    marginTop: 20,
    width: Dimensions.width,
    backgroundColor: 'orange'
  }
});

export default Settings;
