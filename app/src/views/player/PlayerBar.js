import React from 'react';
import TrackPlayer from 'react-native-track-player';
import { Text, View, StyleSheet, Dimensions, PanResponder } from 'react-native';
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

  handleTouch(y) {
    const s = y * this.state.duration / Dimensions.get('window').width;
    this.setState({ position: s });
    TrackPlayer.seekTo(s);
  }

  render() {
    return (
      <View style={styles(this.props.theme, this.calcSliderHandlerMargin()).container}>
        <Bar
          progress={this.getBufferedProgress()}
          width={null}
          height={4}
          borderRadius={0}
          useNativeDriver
          color={colors[this.props.theme].sliderBuffer}
          unfilledColor={colors[this.props.theme].slider}
          borderWidth={0}
        />
        <Bar
          animated={false}
          style={styles(this.props.theme, this.calcSliderHandlerMargin()).progress}
          progress={this.getProgress()}
          width={null}
          height={4}
          borderRadius={0}
          useNativeDriver
          color={colors[this.props.theme].sliderHandler}
          borderWidth={0}
        />
        <View style={styles(this.props.theme, this.calcSliderHandlerMargin()).sliderHandler} />
        <View
          onStartShouldSetResponder={() => true}
          onMoveShouldSetResponder={() => true}
          onResponderGrant={evt => {
            this.handleTouch(evt.nativeEvent.locationX);
          }}
          onResponderMove={evt => {
            this.handleTouch(evt.nativeEvent.locationX);
          }}
          style={styles(this.props.theme, this.calcSliderHandlerMargin()).touchableContainer}
        />
        <View style={styles(this.props.theme, this.calcSliderHandlerMargin()).timeContainer}>
          <View
            style={styles(this.props.theme, this.calcSliderHandlerMargin()).passedTimeContainer}
          >
            <Text style={styles(this.props.theme, this.calcSliderHandlerMargin()).passedTime}>
              {this.formatTime(this.state.position)}
            </Text>
          </View>
          <View
            style={styles(this.props.theme, this.calcSliderHandlerMargin()).remainedTimeContainer}
          >
            <Text style={styles(this.props.theme, this.calcSliderHandlerMargin()).remainedTime}>
              -{this.formatTime(this.state.duration - this.state.position)}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = (currentTheme, sliderHandlerMargin) =>
  StyleSheet.create({
    container: {
      flex: 0,
      backgroundColor: 'transparent'
    },
    touchableContainer: {
      height: 11,
      marginTop: -11
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
      backgroundColor: colors[currentTheme].sliderHandler
    },
    passedTime: {
      fontFamily: 'Avenir',
      fontWeight: fontWeight.light,
      fontSize: 12,
      color: colors[currentTheme].text,
      marginLeft: 10
    },
    remainedTime: {
      fontFamily: 'Avenir',
      fontWeight: fontWeight.light,
      fontSize: 12,
      color: colors[currentTheme].text,
      marginRight: 10,
      textAlign: 'right'
    }
  });

export default PlayerBar;
