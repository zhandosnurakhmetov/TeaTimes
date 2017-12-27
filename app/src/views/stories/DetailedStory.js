import React, { Component } from 'react';
import { ImageBackground, StyleSheet, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import constants from '../../constants';
import AudioPlayer from './AudioPlayer';
import NavigationBar from './NavigationBar';

const { fontWeight } = constants;

class DetailedStory extends Component {
  configure = type => {
    switch (this.props.selectedLanguage) {
      case 'RU':
        return this.props.navigation.state.params[`russian${type}`];
      case 'KZ':
        return this.props.navigation.state.params[`kazakh${type}`];
      case 'EN':
        return this.props.navigation.state.params[`english${type}`];
      case 'TK':
        return this.props.navigation.state.params[`turkish${type}`];
      default:
        return this.props.navigation.state.params[`english${type}`];
    }
  };

  render() {
    return (
      <ImageBackground source={require('../../backgrounds/light.png')} style={styles.container}>
        <NavigationBar navigation={this.props.navigation} />
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
    selectedLanguage: state.selectedLanguage
  };
}

export default connect(mapStateToProps)(DetailedStory);
