import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import colors from '../../constants/colors';

const { testcolor } = colors;

class Settings extends Component {
  render() {
    return <Text style={styles.container}>asdasd</Text>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: testcolor
  }
});

export default Settings;
