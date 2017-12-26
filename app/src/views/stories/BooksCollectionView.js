import React, { Component } from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import BookCover from './BookCover';

class BooksCollectionView extends Component {
  renderItem = ({ item }) => <BookCover book={item} navigation={this.props.navigation} />;

  render() {
    const { type, books } = this.props;

    return (
      <View>
        <Text style={styles.title}>{type}</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={books}
          renderItem={this.renderItem}
          keyExtractor={item => item.title}
        />
        <View style={styles.seperator} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  seperator: {
    height: 1,
    width: '100%',
    backgroundColor: '#ACACAC'
  },
  title: {
    fontSize: 17,
    color: 'black',
    fontFamily: 'Avenir',
    fontWeight: '800',
    textAlign: 'center',
    backgroundColor: 'transparent',
    marginTop: 15
  }
});

export default BooksCollectionView;
