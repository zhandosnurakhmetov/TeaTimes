import React, { Component } from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import BookCover from './BookCover';

const BooksCollectionView = ({ type, books }) => {
  renderItem = ({ item }) => <BookCover item={item} />
    return (
      <View>
        <Text style={styles.title}>{type}</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={books.map(book => book.title)}
          renderItem={this.renderItem}
          keyExtractor={item => item}
        />
        <View style={styles.seperator} />
      </View>
    );
  }


const styles = StyleSheet.create({
  seperator: {
    height: 1,
    width: '100%',
    backgroundColor: '#ACACAC',
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
