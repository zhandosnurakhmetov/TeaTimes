import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../../constants/colors';
import fontWeight from '../../constants/fontWeight';

const Button = ({ title, callback }) => (
  <TouchableOpacity onPress={callback} style={styles.container}>
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    height: 44,
    width: '90%',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.light.secondary,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  text: {
    fontFamily: 'Avenir',
    fontSize: 16,
    fontWeight: fontWeight.medium,
    color: colors.light.text
  }
});

export default Button;
