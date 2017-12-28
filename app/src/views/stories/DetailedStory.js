import React, { Component } from 'react';
import { ImageBackground, StyleSheet, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import constants from '../../constants';
import AudioPlayer from './AudioPlayer';
import NavigationBar from './NavigationBar';
import { fetchPosts } from '../../actions';
// import { configureFavorites } from '../../actions';

const { fontWeight } = constants;

class DetailedStory extends Component {
  componentWillUnmount() {
    this.props.fetchPosts();
    // this.props.configureFavorites(this.props.posts);
  }

  configure = type => {
    switch (this.props.selectedLanguage) {
      case 'RU':
        return this.props.navigation.state.params.book[`russian${type}`];
      case 'KZ':
        return this.props.navigation.state.params.book[`kazakh${type}`];
      case 'EN':
        return this.props.navigation.state.params.book[`english${type}`];
      case 'TK':
        return this.props.navigation.state.params.book[`turkish${type}`];
      default:
        return this.props.navigation.state.params.book[`english${type}`];
    }
  };

  render() {
    const { book } = this.props.navigation.state.params;
    return (
      <ImageBackground source={require('../../backgrounds/light.png')} style={styles.container}>
        <NavigationBar navigation={this.props.navigation} book={book} />
        <ScrollView>
          <Text style={styles.title}>{this.configure('Text')}</Text>
          <Text style={styles.text}>{this.configure('Title')}</Text>
        </ScrollView>
        <AudioPlayer />
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontSize: 24,
    color: 'black',
    fontFamily: 'Avenir',
    fontWeight: fontWeight.heavy,
    textAlign: 'center',
    backgroundColor: 'transparent',
    paddingTop: 20
  },
  text: {
    fontSize: 17,
    color: 'black',
    fontFamily: 'Avenir',
    fontWeight: fontWeight.roman,
    textAlign: 'center',
    backgroundColor: 'transparent',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10
  }
});

function mapStateToProps(state) {
  return {
    selectedLanguage: state.selectedLanguage,
    posts: state.posts
  };
}

export default connect(mapStateToProps, { fetchPosts })(DetailedStory);
