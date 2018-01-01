import React, { Component } from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import BookCover from './BookCover';

import constants from '../../constants';

const { colors } = constants;

class BooksCollectionView extends Component {
  renderItem = ({ item }) => <BookCover book={item} navigation={this.props.navigation} />;

  render() {
    const { type, books, theme } = this.props;
    return (
      <View>
        <Text style={styles(theme).title}>{type}</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={books}
          renderItem={this.renderItem}
          keyExtractor={item => item.title}
        />
        <View style={styles(theme).seperator} />
      </View>
    );
  }
}

const styles = theme =>
  StyleSheet.create({
    seperator: {
      height: 1,
      width: '100%',
      backgroundColor: colors[theme].separator
    },
    title: {
      fontSize: 17,
      color: colors[theme].text,
      fontFamily: 'Avenir',
      fontWeight: '800',
      textAlign: 'center',
      backgroundColor: 'transparent',
      marginTop: 15
    }
  });

function mapStateToProps(state) {
  return {
    theme: state.theme
  };
}

export default connect(mapStateToProps)(BooksCollectionView);
