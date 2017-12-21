import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../constants/colors';

const { testcolor } = colors;

class Settings extends Component {
  render() {
    return <View style={styles.container} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: testcolor
  }
});

export default Settings;
