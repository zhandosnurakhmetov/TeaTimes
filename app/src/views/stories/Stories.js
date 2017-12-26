import React, { Component } from 'react';
import { ImageBackground, StyleSheet, FlatList, Text } from 'react-native';
import { connect } from 'react-redux';
import BooksCollectionView from './BooksCollectionView';
import { fetchPosts } from '../../actions';

class Stories extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  renderItem = ({ item }) => {
    const { posts, navigation } = this.props;
    const arr = posts.filter(post => post.type === item)[0].value;
    return <BooksCollectionView type={item} books={arr} navigation={navigation} />;
  };

  render() {
    const { posts } = this.props;
    if (posts.length === 0) {
      return <Text style={styles.loader}>Loading...</Text>;
    }

    return (
      <ImageBackground source={require('../../backgrounds/light.png')} style={styles.container}>
        <FlatList
          data={posts.map(item => item.type)}
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

function mapStateToProps(state) {
  return {
    posts: state.posts
  };
}

export default connect(mapStateToProps, { fetchPosts })(Stories);
