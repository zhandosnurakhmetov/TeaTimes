import React from 'react';
import TrackPlayer from 'react-native-track-player';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Bar } from 'react-native-progress';
import colors from '../../constants/colors';
import fontWeight from '../../constants/fontWeight';

class PlayerBar extends TrackPlayer.ProgressComponent {
  formatTime(position) {
    const secNum = parseInt(position, 10);
    let minutes = Math.floor(secNum / 60);
    let seconds = secNum - minutes * 60;

    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    return `${minutes}:${seconds}`;
  }

  calcSliderHandlerMargin() {
    const fullMargin = Dimensions.get('window').width - 2;
    if (!this.state.position || !this.state.duration) return 0;
    return this.state.position * fullMargin / this.state.duration;
  }

  render() {
    return (
      <View style={styles('light', this.calcSliderHandlerMargin()).container}>
        <Bar
          progress={this.getBufferedProgress()}
          width={null}
          height={4}
          borderRadius={0}
          useNativeDriver
          color={colors.light.sliderBuffer}
          unfilledColor={colors.light.slider}
          borderWidth={0}
        />
        <Bar
          animated={false}
          style={styles('light', this.calcSliderHandlerMargin()).progress}
          progress={this.getProgress()}
          width={null}
          height={4}
          borderRadius={0}
          useNativeDriver
          color={colors.light.sliderHandler}
          borderWidth={0}
        />
        <View style={styles('light', this.calcSliderHandlerMargin()).sliderHandler} />
        <View style={styles('light', this.calcSliderHandlerMargin()).timeContainer}>
          <View style={styles('light', this.calcSliderHandlerMargin()).passedTimeContainer}>
            <Text style={styles('light', this.calcSliderHandlerMargin()).passedTime}>
              {this.formatTime(this.state.position)}
            </Text>
          </View>
          <View style={styles('light', this.calcSliderHandlerMargin()).remainedTimeContainer}>
            <Text style={styles('light', this.calcSliderHandlerMargin()).remainedTime}>
              -{this.formatTime(this.state.duration - this.state.position)}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = (theme, sliderHandlerMargin) =>
  StyleSheet.create({
    container: {
      flex: 0,
      backgroundColor: 'transparent'
    },
    progress: {
      marginTop: -4
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
    sliderHandler: {
      marginTop: -4,
      marginLeft: sliderHandlerMargin,
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
    }
  });

export default PlayerBar;
