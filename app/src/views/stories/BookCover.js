import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import constants from '../../constants';

const { colors, fontWeight } = constants;

class BookCover extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.props.item}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    width: 80,
    height: 100,
    backgroundColor: '#6D4C41',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.coverBorderColor,
    shadowColor: '#000000',
    shadowOffset: {
      width: 2,
      height: 7
    },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    marginBottom: 20,
    marginTop: 10
  },
  title: {
    fontSize: 14,
    color: 'white',
    fontFamily: 'Avenir',
    fontWeight: fontWeight.roman,
    textAlign: 'center',
    paddingLeft: 5,
    paddingRight: 5
  },
});

export default BookCover;
