const Sound = require('react-native-sound');

Sound.setCategory('Playback');

class PlayerManager {
  static instance = null;

  static getInstance() {
    if (this.instance == null) this.instance = new PlayerManager();
    return this.instance;
  }

  constructor() {
    this.elapsedTime = 0;
    this.remainedTime = 0;
    this.isPlaying = false;
    this.currentSpeed = 1;

    this.book = null;
    this.isReady = false;
    this.player = null;
  }

  setBook(newBook, callback) {
    if (!newBook || !newBook.title || !newBook.audio) return;
    this.book = newBook;

    this.reset();
    this.player = new Sound(this.book.audio, '', error => {
      if (error) {
        this.reset();
        return;
      }
      this.isReady = true;
      callback();
    });
  }

  reset() {
    if (!this.player || !this.isReady) return;
    this.isPlaying = false;
    this.isReady = false;
    this.currentSpeed = 1;
    this.player.release();
    this.player = null;
  }

  play() {
    if (!this.player || !this.isReady) return;
    this.player.play(success => {
      this.isPlaying = false;
      if (!success) {
        this.reset();
      }
    });
    this.isPlaying = true;
  }

  pause() {
    if (!this.player || !this.isReady) return;
    this.player.pause(() => {
      this.isPlaying = false;
    });
  }

  backward() {
    if (!this.player || !this.isReady) return;
    this.player.getCurrentTime(seconds => {
      let newTime = seconds - 5;
      if (newTime < 0) newTime = 0;
      this.player.setCurrentTime(newTime);
    });
  }

  forward() {
    if (!this.player || !this.isReady) return;
    this.player.getCurrentTime(seconds => {
      let newTime = seconds + 5;
      if (newTime > this.player.getDuration()) newTime = this.player.getDuration();
      this.player.setCurrentTime(newTime);
    });
  }

  speed() {
    this.currentSpeed += 0.5;
    if (this.currentSpeed > 2) this.currentSpeed = 0.5;
    this.player.setSpeed(this.currentSpeed);
  }
}

export default PlayerManager;
