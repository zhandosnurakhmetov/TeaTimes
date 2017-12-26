import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Text, TouchableOpacity, View, ImageBackground, StyleSheet } from 'react-native';
import colors from '../../constants/colors';
import fontWeight from '../../constants/fontWeight';
import PlayerManager from './PlayerManager';

class Player extends Component {
  close() {}
  backward() {
    PlayerManager.getInstance().backward();
  }
  forward() {
    PlayerManager.getInstance().forward();
  }
  play() {
    PlayerManager.getInstance().setBook(
      {
        title: 'Test',
        audio:
          'https://firebasestorage.googleapis.com/v0/b/teatimes-8d7cd.appspot.com/o/test.mp3?alt=media&token=f445738e-c9ec-49bf-8a2c-b8208b9ed30d'
      },
      () => {
        PlayerManager.getInstance().play();
      }
    );
  }
  speed() {
    PlayerManager.getInstance().speed();
  }
  share() {}
  download() {}
  slide() {}

  render() {
    return (
      <ImageBackground source={require('../../backgrounds/light.png')} style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={this.close}>
            <Icon name="expand-more" size={35} color={colors.light.icon} />
          </TouchableOpacity>
        </View>
        <View style={styles.coverContainer}>
          <Text style={styles.cover}>The Fox and The Crow</Text>
        </View>
        <View style={styles.sliderContainer}>
          <View style={styles.slider} />
          <TouchableOpacity onPress={this.slide}>
            <View style={styles.sliderHandler} />
          </TouchableOpacity>
          <View style={styles.timeContainer}>
            <View style={styles.passedTimeContainer}>
              <Text style={styles.passedTime}>3:14</Text>
            </View>
            <View style={styles.remainedTimeContainer}>
              <Text style={styles.remainedTime}>-17:10</Text>
            </View>
          </View>
        </View>
        <View style={styles.playerContainer}>
          <TouchableOpacity onPress={this.backward}>
            <Icon name="replay-5" size={60} color={colors.light.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.play}>
            <Icon name="play-arrow" size={60} color={colors.light.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.forward}>
            <Icon name="forward-5" size={60} color={colors.light.icon} />
          </TouchableOpacity>
        </View>
        <View style={styles.footerContainer}>
          <TouchableOpacity onPress={this.speed}>
            <Text style={styles.speed}>1x</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.download} style={styles.download}>
            <Text style={styles.downloadTitle}>Download</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.share}>
            <Icon name="share" size={35} color={colors.light.icon} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerContainer: {
    flex: 0,
    alignItems: 'flex-start',
    backgroundColor: 'transparent'
  },
  coverContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  sliderContainer: {
    flex: 0,
    backgroundColor: 'transparent'
  },
  timeContainer: {
    flex: 0,
    marginTop: 8,
    flexDirection: 'row'
  },
  passedTimeContainer: {
    flex: 1
  },
  remainedTimeContainer: {
    flex: 1
  },
  playerContainer: {
    flex: 0,
    height: 120,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'transparent'
  },
  footerContainer: {
    flex: 0,
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'transparent'
  },
  slider: {
    height: 4,
    backgroundColor: colors.light.slider
  },
  sliderHandler: {
    marginTop: -4,
    marginLeft: '10%',
    height: 11,
    width: 2,
    backgroundColor: colors.light.sliderHandler
  },
  passedTime: {
    fontFamily: 'Avenir',
    fontWeight: fontWeight.light,
    fontSize: 12,
    color: colors.light.text,
    marginLeft: 10
  },
  remainedTime: {
    fontFamily: 'Avenir',
    fontWeight: fontWeight.light,
    fontSize: 12,
    color: colors.light.text,
    marginRight: 10,
    textAlign: 'right'
  },
  cover: {
    width: '80%',
    fontFamily: 'Avenir',
    fontWeight: fontWeight.heavy,
    fontSize: 36,
    color: colors.light.text,
    textAlign: 'center'
  },
  speed: {
    fontFamily: 'Avenir',
    fontWeight: fontWeight.black,
    fontSize: 24,
    color: colors.light.text
  },
  download: {
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.light.icon,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 16,
    paddingRight: 16
  },
  downloadTitle: {
    fontFamily: 'Avenir',
    fontSize: 12,
    fontWeight: fontWeight.heavy,
    color: colors.light.text
  }
});

export default Player;
