import React, { Component } from 'react';
import { ImageBackground, StyleSheet, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import constants from '../../constants';
import AudioPlayer from './AudioPlayer';
import NavigationBar from './NavigationBar';
import { fetchPosts } from '../../actions';

const { fontWeight, background, colors } = constants;

class DetailedStory extends Component {
  componentWillUnmount() {
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

  render() {
    const { book } = this.props.navigation.state.params;
    const { theme } = this.props;
    const { contentColor, icon, primary } = colors[theme];
    return (
      <ImageBackground source={background[theme]} style={styles(contentColor).container}>
        <NavigationBar navigation={this.props.navigation} book={book} iconColor={icon} />
        <ScrollView>
          <Text style={styles(contentColor).title}>{this.configure('Text')}</Text>
          <Text style={styles(contentColor).title}>{this.configure('Title')}</Text>
        </ScrollView>
        <AudioPlayer color={primary} textColor={contentColor} iconColor={icon} />
      </ImageBackground>
    );
  }
}

const styles = color =>
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
      paddingTop: 20
    },
    text: {
      fontSize: 17,
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
    theme: state.theme
  };
}

export default connect(mapStateToProps, { fetchPosts })(DetailedStory);
