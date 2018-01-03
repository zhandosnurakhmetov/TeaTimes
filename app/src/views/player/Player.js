import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Text, TouchableOpacity, View, ImageBackground, StyleSheet } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import EventEmitter from 'react-native-eventemitter';
import Share from 'react-native-share';
import colors from '../../constants/colors';
import fontWeight from '../../constants/fontWeight';
import PlayerBar from './PlayerBar';
import DownloadManager from './DownloadManager';

class Player extends Component {
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
    EventEmitter.on('playback-state', this.handlePlaybackState.bind(this));
    EventEmitter.on('playback-track-changed', this.handleTrackChanged.bind(this));
    EventEmitter.on('playback-queue-ended', this.handleQueueEnded.bind(this));
    this.updateBook();
    this.updateCurrentTrack();
    this.updatePlaybackState();
    this.updateRate();
  }
  componentWillUnmount() {
    EventEmitter.removeAllListeners('playback-state');
    EventEmitter.removeAllListeners('playback-track-changed');
    EventEmitter.removeAllListeners('playback-queue-ended');
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
      const { book } = this.props.navigation.state.params;
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
  async updateRate() {
    try {
      this.setState({
        rate: await TrackPlayer.getRate()
      });
    } catch (e) {
      console.log(e);
    }
  }
  async backward() {
    try {
      const seconds = await TrackPlayer.getPosition();
      let newTime = seconds - 5;
      if (newTime < 0) newTime = 0;
      TrackPlayer.seekTo(newTime);
    } catch (e) {
      console.log(e);
    }
  }
  async forward() {
    try {
      const seconds = await TrackPlayer.getPosition();
      const duration = await TrackPlayer.getDuration();
      let newTime = seconds + 5;
      if (newTime > duration) newTime = duration;
      TrackPlayer.seekTo(newTime);
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
        TrackPlayer.destroy();
        await TrackPlayer.setupPlayer();
        const url = await DownloadManager.getUrl(this.state.book.id, this.state.book.audio);
        const track = {
          url,
          id: this.state.book.id,
          title: this.state.book.title,
          artist: 'TeaTimes'
        };
        await TrackPlayer.add([track]);
        TrackPlayer.play();
      }
    } catch (e) {
      console.log(e);
    }
  }
  async speed() {
    try {
      let rate = await TrackPlayer.getRate();
      rate += 0.5;
      if (rate > 2) rate = 0.5;
      TrackPlayer.setRate(rate);
      this.updateRate();
    } catch (e) {
      console.log(e);
    }
  }
  share() {
    const options = {
      message: 'Read interesting stories in english',
      url: 'https://facebook.github.io/react-native/'
    };
    Share.open(options).catch(err => {
      if (err) console.log(err);
    });
  }
  close() {
    this.props.navigation.goBack();
  }
  async download() {
    try {
      const res = await DownloadManager.download(this.state.book.id, this.state.book.audio);
      console.log('The file saved to ', res.path());
    } catch (e) {
      console.log(e);
    }
  }
  currentTitle() {
    if (this.state.currentTrack) return this.state.currentTrack.title;
    if (this.state.book) return this.state.book.title;
    return '';
  }

  render() {
    return (
      <ImageBackground source={require('../../backgrounds/light.png')} style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={this.close.bind(this)}>
            <Icon name="expand-more" size={35} color={colors.light.icon} />
          </TouchableOpacity>
        </View>
        <View style={styles.coverContainer}>
          <Text style={styles.cover}>{this.currentTitle()}</Text>
        </View>
        <PlayerBar />
        <View style={styles.playerContainer}>
          <TouchableOpacity onPress={this.backward.bind(this)}>
            <Icon name="replay-5" size={60} color={colors.light.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handlePlayPause.bind(this)}>
            <Icon
              name={
                this.state.playbackState === 'STATE_PLAYING' ||
                this.state.playbackState === 'STATE_BUFFERING'
                  ? 'pause'
                  : 'play-arrow'
              }
              size={60}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.forward.bind(this)}>
            <Icon name="forward-5" size={60} color={colors.light.icon} />
          </TouchableOpacity>
        </View>
        <View style={styles.footerContainer}>
          <TouchableOpacity onPress={this.speed.bind(this)}>
            <Text style={styles.speed}>{this.state.rate}x</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.download.bind(this)} style={styles.download}>
            <Text style={styles.downloadTitle}>Download</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.share} style={{ width: 56, alignItems: 'center' }}>
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
  cover: {
    width: '80%',
    fontFamily: 'Avenir',
    fontWeight: fontWeight.heavy,
    fontSize: 36,
    color: colors.light.text,
    textAlign: 'center'
  },
  speed: {
    textAlign: 'center',
    width: 56,
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
