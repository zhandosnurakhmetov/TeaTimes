import React, { Component } from 'react';
import { ImageBackground, StyleSheet, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import TrackPlayer from 'react-native-track-player';
import constants from '../../constants';
import AudioPlayer from './AudioPlayer';
import NavigationBar from './NavigationBar';
import { fetchPosts } from '../../actions';

const { fontWeight, background, colors } = constants;

class DetailedStory extends Component {
  componentWillUnmount() {
    TrackPlayer.pause();
    this.props.fetchPosts();
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

  onPressAudioTitle() {
    const { book } = this.props.navigation.state.params;
    this.props.navigation.navigate('Player', { book });
  }

  renderAudioPlayer() {
    const { book } = this.props.navigation.state.params;
    const { theme } = this.props;
    const { contentColor, icon, primary } = colors[theme];
    if (book.audioUrl) {
      return (
        <AudioPlayer
          color={primary}
          textColor={contentColor}
          iconColor={icon}
          onPressAudioTitle={this.onPressAudioTitle.bind(this)}
          book={book}
          title={this.configure('Title')}
        />
      );
    }
    return null;
  }

  render() {
    const { book } = this.props.navigation.state.params;
    const { theme, textSize } = this.props;
    const { contentColor, icon } = colors[theme];
    return (
      <ImageBackground source={background[theme]} style={styles(contentColor, textSize).container}>
        <NavigationBar
          navigation={this.props.navigation}
          book={book}
          iconColor={icon}
          title={this.configure('Title')}
        />
        <ScrollView>
          <Text style={styles(contentColor, textSize).title}>{this.configure('Title')}</Text>
          <Text style={styles(contentColor, textSize).text}>{this.configure('Text')}</Text>
        </ScrollView>
        {this.renderAudioPlayer()}
      </ImageBackground>
    );
  }
}

const styles = (color, size) =>
  StyleSheet.create({
    container: {
      flex: 1
    },
    title: {
      fontSize: 24,
      color,
      fontFamily: 'Avenir',
      fontWeight: fontWeight.heavy,
      textAlign: 'center',
      backgroundColor: 'transparent',
      paddingTop: 10,
      paddingLeft: 10,
      paddingRight: 10
    },
    text: {
      fontSize: size,
      color,
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
    posts: state.posts,
    theme: state.theme,
    textSize: state.textSize
  };
}

export default connect(mapStateToProps, { fetchPosts })(DetailedStory);
