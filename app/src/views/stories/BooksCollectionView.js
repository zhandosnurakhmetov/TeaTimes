import React, { Component } from 'react';
import { FlatList } from 'react-native';
import BookCover from './BookCover';

class BooksCollectionView extends Component {
  state = {
      data: ['The Fox and The Crow', 'The Tortoise and the Hare', 'A dog is A Dog', 'A House'],
  };

  renderItem = ({ item }) => <BookCover item={item} />

  render() {
    return (
      <FlatList
        horizontal
        data={this.state.data}
        renderItem={this.renderItem}
        keyExtractor={item => item}
      />
    );
  }
}

export default BooksCollectionView;
