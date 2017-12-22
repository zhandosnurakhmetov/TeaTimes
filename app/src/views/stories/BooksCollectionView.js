import React, { Component } from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import BookCover from './BookCover';

class BooksCollectionView extends Component {
  state = {
      data: ['The Fox and The Crow', 'The Tortoise and the Hare', 'A dog is A Dog', 'A House'],
  };

  renderItem = ({ item }) => <BookCover item={item} />

  render() {
    return (
      <View>
        <Text style={styles.title}>{this.props.item}</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={item => item}
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
