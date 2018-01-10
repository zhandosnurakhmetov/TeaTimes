import React, { Component } from 'react';
import { ImageBackground, StyleSheet, FlatList, Text } from 'react-native';
import { connect } from 'react-redux';
import BooksCollectionView from './BooksCollectionView';
import { fetchPosts } from '../../actions';
import constants from '../../constants';

const { background } = constants;

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
    const { theme, posts } = this.props;
    if (posts.length === 0) {
      return <Text style={styles.loader}>Loading...</Text>;
    }

    console.log(posts);

    return (
      <ImageBackground source={background[theme]} style={styles.container}>
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
    posts: state.posts,
    theme: state.theme
  };
}

export default connect(mapStateToProps, { fetchPosts })(Stories);
