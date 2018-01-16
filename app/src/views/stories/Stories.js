import React, { Component } from 'react';
import { ImageBackground, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import ButtonComponent from 'react-native-button-component';
import BooksCollectionView from './BooksCollectionView';
import { fetchPosts } from '../../actions';
import constants from '../../constants';

const { colors, fontWeight, background } = constants;

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
      return (
        <ImageBackground source={background[theme]} style={styles(theme).container}>
          <ButtonComponent
            type="custom"
            buttonState="loading"
            shape="rectange"
            style={styles(theme).loading}
            textStyle={styles(theme).loadingTitle}
            states={{
              loading: {
                spinner: true,
                spinnerColor: colors[theme].text,
                text: 'Loading'
              }
            }}
          />
        </ImageBackground>
      );
    }

    console.log(posts);

    return (
      <ImageBackground source={background[theme]} style={styles(theme).container}>
        <FlatList
          data={posts.map(item => item.type)}
          renderItem={this.renderItem}
          keyExtractor={item => item}
        />
      </ImageBackground>
    );
  }
}

const styles = currentTheme =>
  StyleSheet.create({
    container: {
      flex: 1
    },
    loading: {
      height: '100%'
    },
    loadingTitle: {
      letterSpacing: 0,
      fontFamily: 'Avenir',
      fontSize: 12,
      fontWeight: fontWeight.heavy,
      color: colors[currentTheme].text
    }
  });

function mapStateToProps(state) {
  return {
    posts: state.posts,
    theme: state.theme
  };
}

export default connect(mapStateToProps, { fetchPosts })(Stories);
