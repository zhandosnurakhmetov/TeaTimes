const Sound = require('react-native-sound');

Sound.setCategory('Playback');

class PlayerManager {
  static book = null;
  static isPlaying = false;
  static isReady = false;

  static player = null;

  static reset() {
    if (!this.player || !this.isReady) return;
    this.player.release();
    this.player = null;
  }

  static setBook(newBook, callback) {
    if (!newBook || !newBook.title || !newBook.audio) return;
    this.book = newBook;

    this.reset();
    this.isReady = false;
    this.player = new Sound(this.book.audio, '', error => {
      if (error) {
        this.reset();
        return;
      }
      this.isReady = true;
      callback();
    });
  }

  static play() {
    if (!this.player || !this.isReady) return;
    this.player.play(success => {
      this.isPlaying = false;
      if (!success) this.reset();
    });
    this.isPlaying = true;
  }

  static pause() {
    if (!this.player || !this.isReady) return;
    this.player.pause(() => {
      this.isPlaying = false;
    });
  }
}

export default PlayerManager;
