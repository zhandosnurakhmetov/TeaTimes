import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../../constants/colors';
import fontWeight from '../../constants/fontWeight';

const Button = ({ title, onPress, currentTheme }) => (
  <TouchableOpacity onPress={onPress} style={styles(currentTheme).container}>
    <Text style={styles(currentTheme).text}>{title}</Text>
  </TouchableOpacity>
);

const styles = currentTheme =>
  StyleSheet.create({
    container: {
      height: 44,
      width: '90%',
      borderRadius: 4,
      borderWidth: 1,
      borderColor: colors[currentTheme].secondary,
      backgroundColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10
    },
    text: {
      fontFamily: 'Avenir',
      fontSize: 16,
      fontWeight: fontWeight.medium,
      color: colors[currentTheme].text
    }
  });

export default Button;
