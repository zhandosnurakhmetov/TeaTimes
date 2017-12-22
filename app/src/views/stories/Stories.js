import React, { Component } from 'react';
import { ImageBackground, StyleSheet, FlatList } from 'react-native';
import BooksCollectionView from './BooksCollectionView';

class Stories extends Component {

  state = {
      data: ['Favorites', 'Love', 'Sincerity', 'Fidelity'],
  };

  renderItem = ({ item }) => <BooksCollectionView item={item} />

  render() {
    return (
      <ImageBackground source={require('../../backgrounds/default.png')} style={styles.container}>
          {/* <BooksCollectionView /> */}
          <FlatList
            data={this.state.data}
            renderItem={this.renderItem}
            keyExtractor={item => item}
          />
      </ImageBackground>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Stories;
