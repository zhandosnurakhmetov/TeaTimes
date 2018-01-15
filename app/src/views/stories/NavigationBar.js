import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ActionSheet from 'react-native-actionsheet-native';
import Share from 'react-native-share';
import constants from '../../constants';
import { changeLanguage } from '../../actions';
import { bookmarkPressed, isBookInFavorite } from '../../actions/bookmark';

const { fontWeight } = constants;
const options = ['English', 'Turkish', 'Russian', 'Kazakh'];

class NavigationBar extends Component {
  state = {
    isBookmarkSelected: false
  };

  componentDidMount() {
    const { book } = this.props;
    isBookInFavorite(book).then(isBookmarkSelected =>
      this.setState({
        isBookmarkSelected
      })
    );
  }

  dissmiss = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  changeLanguage = () => {
    // FIXME: Transfer to actions.
    ActionSheet.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex: -1
      },
      buttonIndex => {
        this.props.changeLanguage(options[buttonIndex]);
      }
    );
  };

  share() {
    const shareOptions = {
      message: 'Read interesting stories in english',
      url: 'https://facebook.github.io/react-native/'
    };
    Share.open(shareOptions).catch(err => {
      if (err) console.log(err);
    });
  }

  render() {
    const { selectedLanguage, book, iconColor } = this.props;
    return (
      <View style={styles(iconColor).container}>
        <TouchableOpacity style={styles(iconColor).leftContainer} onPress={this.dissmiss}>
          <Icon name="keyboard-arrow-left" size={40} color={iconColor} />
        </TouchableOpacity>
        <View style={styles(iconColor).rightContainer}>
          <TouchableOpacity onPress={this.changeLanguage}>
            <Text style={styles(iconColor).language}>
              {selectedLanguage === '' ? 'EN' : selectedLanguage}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon
              name="share"
              style={styles(iconColor).icon}
              size={25}
              color={iconColor}
              onPress={() => {
                this.share();
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              bookmarkPressed(book).then(isBookmarkSelected =>
                this.setState({
                  isBookmarkSelected
                })
              )
            }
          >
            <Icon
              name={this.state.isBookmarkSelected ? 'bookmark' : 'bookmark-border'}
              style={styles(iconColor).icon}
              size={30}
              color={iconColor}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = color =>
  StyleSheet.create({
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
      color,
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

function mapStateToProps(state) {
  return {
    selectedLanguage: state.selectedLanguage
  };
}

export default connect(mapStateToProps, { changeLanguage })(NavigationBar);
