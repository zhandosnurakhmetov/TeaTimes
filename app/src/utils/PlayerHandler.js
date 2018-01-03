import EventEmitter from 'react-native-eventemitter';

module.exports = async data => {
  EventEmitter.emit(data.type, data);
  EventEmitter.emit(`mini-${data.type}`, data);
};
