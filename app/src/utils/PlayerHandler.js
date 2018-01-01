import EventEmitter from 'react-native-eventemitter';

module.exports = async data => {
  console.log(JSON.stringify(data));
  EventEmitter.emit(data.type, data);
};
