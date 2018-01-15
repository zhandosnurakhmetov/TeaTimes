import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TrackPlayer from 'react-native-track-player';
import EventEmitter from 'react-native-eventemitter';
import constants from '../../constants';
import DownloadManager from '../player/DownloadManager';

const { fontWeight } = constants;

export default class AudioPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book: null,
      currentTrack: null,
      playbackState: 'STATE_NONE',
      rate: 1
    };
  }
  componentDidMount() {
    EventEmitter.on('mini-playback-state', this.handlePlaybackState.bind(this));
    EventEmitter.on('mini-playback-track-changed', this.handleTrackChanged.bind(this));
    EventEmitter.on('mini-playback-queue-ended', this.handleQueueEnded.bind(this));
    this.updateBook();
    this.updateCurrentTrack();
    this.updatePlaybackState();
  }
  componentWillUnmount() {
    EventEmitter.removeAllListeners('mini-playback-state');
    EventEmitter.removeAllListeners('mini-playback-track-changed');
    EventEmitter.removeAllListeners('mini-playback-queue-ended');
  }
  handleQueueEnded() {
    TrackPlayer.stop();
  }
  async handlePlaybackState(data) {
    try {
      this.setState({
        playbackState: data.state
      });
    } catch (e) {
      console.log(e);
    }
  }
  async handleTrackChanged(data) {
    try {
      this.setState({
        currentTrack: await TrackPlayer.getTrack(data.nextTrack)
      });
    } catch (e) {
      console.log(e);
    }
  }
  async updateBook() {
    try {
      const { book } = this.props;
      this.setState({
        book
      });
    } catch (e) {
      console.log(e);
    }
  }
  async updateCurrentTrack() {
    try {
      const id = await TrackPlayer.getCurrentTrack();
      this.setState({
        currentTrack: await TrackPlayer.getTrack(id)
      });
    } catch (e) {
      console.log(e);
    }
  }
  async updatePlaybackState() {
    try {
      this.setState({
        playbackState: await TrackPlayer.getState()
      });
    } catch (e) {
      console.log(e);
    }
  }
  async handlePlayPause() {
    try {
      const playbackState = await TrackPlayer.getState();
      if (playbackState === 'STATE_PLAYING') {
        TrackPlayer.pause();
      } else if (playbackState === 'STATE_PAUSED') {
        TrackPlayer.play();
      } else {
        TrackPlayer.reset();
        const url = await DownloadManager.getUrl(this.state.book.id, this.state.book.audioUrl);
        const track = {
          url,
          id: this.state.book.id,
          title: this.props.title,
          artist: 'TeaTimes',
          artwork: 'https://facebook.github.io/react-native/docs/assets/favicon.png'
        };
        await TrackPlayer.add([track]);
        TrackPlayer.play();
      }
    } catch (e) {
      console.log(e);
    }
  }
  render() {
    const { color, textColor, iconColor, onPressAudioTitle } = this.props;
    return (
      <View style={styles(color, textColor).container}>
        <TouchableOpacity onPress={this.handlePlayPause.bind(this)}>
          <Icon
            name={
              this.state.playbackState === 'STATE_PLAYING' ||
              this.state.playbackState === 'STATE_BUFFERING'
                ? 'pause'
                : 'play-arrow'
            }
            style={styles(color, textColor).icon}
            size={30}
            color={iconColor}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onPressAudioTitle}
          style={styles(color, textColor).textContainer}
        >
          <Text style={styles(color, textColor).title} numberOfLines={2}>
            {this.props.title}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = (color, textColor) =>
  StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      height: 50,
      backgroundColor: color
    },
    textContainer: {
      marginLeft: 20,
      width: '75%',
      height: '100%',
      justifyContent: 'center'
    },
    icon: {
      marginLeft: 15
    },
    title: {
      fontSize: 15,
      color: textColor,
      fontFamily: 'Avenir',
      fontWeight: fontWeight.medium,
      backgroundColor: 'transparent'
    }
  });
