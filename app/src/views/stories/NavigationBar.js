import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ActionSheet from 'react-native-actionsheet-native';
import constants from '../../constants';

const { fontWeight } = constants;
const options = ['English', 'Turkish', 'Russian', 'Kazakh', 'Cancel'];

class NavigationBar extends Component {
  dissmiss = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  changeLanguage = () => {
    ActionSheet.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex: 4
      },
      buttonIndex => {
        console.log(options[buttonIndex]);
      }
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.leftContainer} onPress={this.dissmiss}>
          <Icon name="keyboard-arrow-left" size={40} />
        </TouchableOpacity>
        <View style={styles.rightContainer}>
          <TouchableOpacity onPress={this.changeLanguage}>
            <Text style={styles.language}>EN</Text>
          </TouchableOpacity>
          <Icon name="share" style={styles.icon} size={25} />
          <Icon name="bookmark-border" style={styles.icon} size={30} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    backgroundColor: 'transparent'
  },
  leftContainer: {
    flexGrow: 0,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  rightContainer: {
    flexGrow: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  language: {
    fontSize: 20,
    color: 'black',
    fontFamily: 'Avenir',
    fontWeight: fontWeight.heavy,
    backgroundColor: 'transparent',
    marginRight: 10
  },
  icon: {
    marginRight: 10,
    marginLeft: 10
  }
});

export default NavigationBar;
