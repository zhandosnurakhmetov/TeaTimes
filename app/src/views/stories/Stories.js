import React, { Component } from 'react';
import { ImageBackground, StyleSheet, FlatList, Text } from 'react-native';
import { connect } from 'react-redux';

import BooksCollectionView from './BooksCollectionView';

import { fetchPosts } from '../../actions';

class Stories extends Component {
  componentWillMount() {
    this.props.fetchPosts();
  }

  renderItem = ({ item }) => <BooksCollectionView item={item} />;

  render() {
    return (
      <ImageBackground source={require('../../backgrounds/light.png')} style={styles.container}>
        <FlatList
          data={['Favorites', 'Love', 'Sincerity', 'Fidelity']}
          renderItem={this.renderItem}
          keyExtractor={item => item}
        />
        <Text>{JSON.stringify(this.props.posts.post1)}</Text>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

function mapStateToProps(state) {
  return {
    posts: state.posts
  };
}

export default connect(mapStateToProps, { fetchPosts })(Stories);
