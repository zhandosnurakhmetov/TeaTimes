import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import { testcolor } from '../../constants/colors';

class Settings extends Component {
  render() {
    return <Text style={styles.container}>qwe</Text>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: testcolor
  }
});

export default Settings;
