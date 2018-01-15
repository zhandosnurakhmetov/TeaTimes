import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Text, TouchableOpacity, View, ImageBackground, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import TrackPlayer from 'react-native-track-player';
import EventEmitter from 'react-native-eventemitter';
import Share from 'react-native-share';
import constants from '../../constants';
import { changeTheme } from '../../actions';
import PlayerBar from './PlayerBar';
import DownloadManager from './DownloadManager';

const { colors, fontWeight, background } = constants;

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book: null,
      currentTrack: null,
      playbackState: 'STATE_NONE',
      rate: 1,
      downloadState: 'NOT_LOADED'
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
    TrackPlayer.seekTo(0);
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
      const exists = await DownloadManager.exists(book.id);
      this.setState({
        book,
        downloadState: exists ? 'LOADED' : 'NOT_LOADED'
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
  async updateRate(rate = null) {
    let newRate = rate;
    if (!newRate) newRate = await TrackPlayer.getRate();
    try {
      this.setState({
        rate: newRate
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
        TrackPlayer.reset();
        const url = await DownloadManager.getUrl(this.state.book.id, this.state.book.audioUrl);
        const track = {
          url,
          id: this.state.book.id,
          title: this.configure('Title'),
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
  async speed() {
    try {
      let rate = await TrackPlayer.getRate();
      rate += 0.5;
      if (rate > 2) rate = 0.5;
      TrackPlayer.setRate(rate);
      this.updateRate(rate);
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
      this.setState({
        downloadState: 'LOADING'
      });
      const res = await DownloadManager.download(this.state.book.id, this.state.book.audioUrl);
      console.log('The file saved to ', res.path());
      this.setState({
        downloadState: 'LOADED'
      });
    } catch (e) {
      console.log(e);
    }
  }
  currentDownloadState() {
    if (this.state.downloadState === 'LOADING') return '...';
    if (this.state.downloadState === 'LOADED') return 'Downloaded';
    return 'Download';
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
    return (
      <ImageBackground
        source={background[this.props.theme]}
        style={styles(this.props.theme).container}
      >
        <View style={styles(this.props.theme).headerContainer}>
          <TouchableOpacity onPress={this.close.bind(this)}>
            <Icon name="expand-more" size={35} color={colors[this.props.theme].icon} />
          </TouchableOpacity>
        </View>
        <View style={styles(this.props.theme).coverContainer}>
          <Text style={styles(this.props.theme).cover} numberOfLines={4}>
            {this.configure('Title')}
          </Text>
        </View>
        <PlayerBar theme={this.props.theme} />
        <View style={styles(this.props.theme).playerContainer}>
          <TouchableOpacity onPress={this.backward.bind(this)}>
            <Icon name="replay-5" size={60} color={colors[this.props.theme].icon} />
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
              color={colors[this.props.theme].icon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.forward.bind(this)}>
            <Icon name="forward-5" size={60} color={colors[this.props.theme].icon} />
          </TouchableOpacity>
        </View>
        <View style={styles(this.props.theme).footerContainer}>
          <TouchableOpacity onPress={this.speed.bind(this)}>
            <Text style={styles(this.props.theme).speed}>{this.state.rate}x</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.download.bind(this)}
            style={styles(this.props.theme).download}
            disabled={this.state.downloadState !== 'NOT_LOADED'}
          >
            <Text style={styles(this.props.theme).downloadTitle}>
              {this.currentDownloadState()}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.share} style={{ width: 56, alignItems: 'center' }}>
            <Icon name="share" size={35} color={colors[this.props.theme].icon} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

const styles = currentTheme =>
  StyleSheet.create({
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
      color: colors[currentTheme].text,
      textAlign: 'center'
    },
    speed: {
      textAlign: 'center',
      width: 56,
      fontFamily: 'Avenir',
      fontWeight: fontWeight.black,
      fontSize: 24,
      color: colors[currentTheme].text
    },
    download: {
      borderRadius: 4,
      borderWidth: 2,
      borderColor: colors[currentTheme].icon,
      backgroundColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'center',
      width: 120,
      paddingTop: 6,
      paddingBottom: 6,
      paddingLeft: 16,
      paddingRight: 16
    },
    downloadTitle: {
      fontFamily: 'Avenir',
      fontSize: 12,
      fontWeight: fontWeight.heavy,
      color: colors[currentTheme].text
    }
  });

function mapStateToProps(state) {
  return {
    theme: state.theme,
    textSize: state.textSize
  };
}

export default connect(mapStateToProps, { changeTheme })(Player);
