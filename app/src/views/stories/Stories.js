import React, { Component } from 'react';
import { ImageBackground, StyleSheet, FlatList, Text } from 'react-native';
import { connect } from 'react-redux';

import BooksCollectionView from './BooksCollectionView';

import { fetchPosts } from '../../actions';

class Stories extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  renderItem = ({ item } ) => {
    const { posts } = this.props;
    const arr = posts.filter(post => post.type === item)[0].value;
    return (<BooksCollectionView type={item} books={arr} />);
  }

  render() {
    const { posts } = this.props;
    return (
      <ImageBackground source={require('../../backgrounds/light.png')} style={styles.container}>
        <FlatList
          data={posts.map(item => item.type)}
          renderItem={this.renderItem}
          keyExtractor={item => item}
        />
        {/* <Text>{JSON.stringify(posts)}</Text> */}
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
