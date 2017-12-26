import React, { Component } from 'react';
import { ImageBackground, StyleSheet, Text, ScrollView } from 'react-native';

import constants from '../../constants';
import AudioPlayer from './AudioPlayer';
import NavigationBar from './NavigationBar';

const { fontWeight } = constants;

export default class DetailedStory extends Component {
  render() {
    const { title, text } = this.props.navigation.state.params;

    return (
      <ImageBackground source={require('../../backgrounds/light.png')} style={styles.container}>
        <NavigationBar />
        <ScrollView>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.text}>{text}</Text>
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
