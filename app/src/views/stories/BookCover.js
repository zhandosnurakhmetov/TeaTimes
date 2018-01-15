import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import constants from '../../constants';

const { colors, fontWeight } = constants;

class BookCover extends Component {
  didSelectItem = () => {
    const { book } = this.props;
    this.props.navigation.navigate('DetailedStory', { book });
  };

  render() {
    const { theme, book } = this.props;
    const cover = colors[theme].cover;
    const type = book.subtype;
    const coverColor = cover[type];

    return (
      <TouchableOpacity style={styles(theme, coverColor).container} onPress={this.didSelectItem}>
        <Text style={styles(theme, coverColor).title} numberOfLines={4}>
          {this.props.book.englishTitle}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = (theme, coverColor) =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 10,
      marginRight: 10,
      width: 80,
      height: 100,
      backgroundColor: String(coverColor),
      borderRadius: 4,
      borderWidth: 1,
      borderColor: colors[theme].coverBorder,
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
      color: colors[theme].title,
      fontFamily: 'Avenir',
      fontWeight: fontWeight.roman,
      textAlign: 'center',
      paddingLeft: 5,
      paddingRight: 5
    }
  });

function mapStateToProps(state) {
  return {
    theme: state.theme
  };
}

export default connect(mapStateToProps)(BookCover);
