import React, { Component } from 'react';
import { ImageBackground, StyleSheet, Text, ScrollView } from 'react-native';

import constants from '../../constants';
import AudioPlayer from './AudioPlayer';

const { fontWeight } = constants;

export default class DetailedStory extends Component {
  render() {
    return (
      <ImageBackground source={require('../../backgrounds/light.png')} style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>The Fox and The Crow</Text>
          <Text style={styles.text}>
            A Fox once saw a Crow fly off with a piece of cheese in its beak and settle on a branch
            of a tree.{'\n'}“That’s for me, as I am a Fox,” said Master Reynard, and he walked up to
            the foot of the tree.{'\n'}“Good day, Mistress Crow,” he cried. “How well you are
            looking today: how glossy your feathers; how bright your eye. I feel sure your voice
            must surpass that of other birds, just as your figure does; let me hear but one song
            from you that I may greet you as the Queen of Birds.”{'\n'} The Crow lifted up her head
            and began to caw her best, but the moment she opened her mouth the piece of cheese fell
            to the ground, only to be snapped up by Master Fox.{'\n'}"That will do," said he. "That
            was all I wanted. In exchange for your cheese I will give you a piece of advice for the
            future: "Do not trust flatterers."
          </Text>
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
