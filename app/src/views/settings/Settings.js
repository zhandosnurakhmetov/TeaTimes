import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Alert,
  Text,
  View,
  Image,
  ImageBackground,
  StyleSheet,
  ScrollView,
  Switch
} from 'react-native';
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import Picker from 'react-native-picker';
import { connect } from 'react-redux';
// import * as firebase from 'firebase';
import Share from 'react-native-share';
import Rate from 'react-native-rate';
import Mailer from 'react-native-mail';
import constants from '../../constants';
import Button from './Button';
import { changeTheme, changeTextSize } from '../../actions';
import { capitalizeFirstLetter } from '../../utils/StringHelper';

const { colors, fontWeight, background } = constants;

class Settings extends Component {
  share() {
    const options = {
      message: 'Read interesting stories in english',
      url: 'https://facebook.github.io/react-native/'
    };
    Share.open(options).catch(err => {
      if (err) console.log(err);
    });
    // const postData = {
    //   title: 'Some title',
    //   type: 'Love',
    //   subtype: 'Poem',
    //   text: 'Some text about love'
    // };
    // const newPostKey = firebase
    //   .database()
    //   .ref()
    //   .child('posts')
    //   .push().key;
    // const updates = {};
    // updates[`/posts/${newPostKey}`] = postData;
    // return firebase
    //   .database()
    //   .ref()
    //   .update(updates);
  }

  rate() {
    const options = {
      AppleAppID: '447188370',
      GooglePackageName: 'com.snapchat.android',
      preferInApp: true
    };
    Rate.rate(options, () => {});
  }

  sendEmail = () => {
    Mailer.mail(
      {
        subject: 'Connecting through mobile application',
        recipients: ['malikaburakoja@gmail.com'],
        body: 'Hello Malika!',
        isHTML: false
      },
      () => {}
    );
  };

  selectTextSize() {
    const data = [12, 14, 16, 18, 20, 22, 24];
    Picker.init({
      pickerTitleText: 'Text size',
      pickerConfirmBtnText: 'Confirm',
      pickerCancelBtnText: 'Cancel',
      pickerData: data,
      selectedValue: [this.props.textSize],
      onPickerConfirm: selectedTextSize => {
        this.props.changeTextSize(selectedTextSize[0]);
      }
    });
    Picker.show();
  }

  selectTheme() {
    const data = ['light', 'dark', 'clean', 'indigo'];
    Picker.init({
      pickerTitleText: 'Theme',
      pickerConfirmBtnText: 'Confirm',
      pickerCancelBtnText: 'Cancel',
      pickerData: data.map(capitalizeFirstLetter),
      selectedValue: [capitalizeFirstLetter(this.props.theme)],
      onPickerConfirm: selectedTheme => {
        this.props.changeTheme(selectedTheme[0].toLowerCase());
      }
    });
    Picker.show();
  }

  render() {
    return (
      <ImageBackground
        source={background[this.props.theme]}
        style={styles(this.props.theme).container}
      >
        <ScrollView>
          <View style={styles(this.props.theme).headerContainer}>
            <Text style={styles(this.props.theme).title}>SETTINGS</Text>
          </View>
          <View>
            <TableView>
              <Section
                sectionTintColor="transparent"
                separatorTintColor={colors[this.props.theme].secondary}
              >
                <Cell
                  cellStyle="Basic"
                  title="Push Notifications"
                  image={
                    <Icon
                      style={styles(this.props.theme).icon}
                      name="notifications"
                      size={25}
                      color={colors[this.props.theme].icon}
                    />
                  }
                  backgroundColor={colors[this.props.theme].primary}
                  titleTextColor={colors[this.props.theme].text}
                  cellAccessoryView={<Switch onTintColor={colors[this.props.theme].switch} />}
                />
              </Section>
              <Section
                sectionTintColor="transparent"
                separatorTintColor={colors[this.props.theme].secondary}
              >
                <Cell
                  cellStyle="RightDetail"
                  title="Text size"
                  detail={this.props.textSize}
                  image={
                    <Icon
                      style={styles(this.props.theme).icon}
                      name="format-size"
                      size={25}
                      color={colors[this.props.theme].icon}
                    />
                  }
                  backgroundColor={colors[this.props.theme].primary}
                  titleTextColor={colors[this.props.theme].text}
                  rightDetailColor={colors[this.props.theme].text}
                  onPress={this.selectTextSize.bind(this)}
                />
                <Cell
                  cellStyle="RightDetail"
                  title="Theme"
                  detail={capitalizeFirstLetter(this.props.theme)}
                  image={
                    <Icon
                      style={styles(this.props.theme).icon}
                      name="format-paint"
                      size={25}
                      color={colors[this.props.theme].icon}
                    />
                  }
                  backgroundColor={colors[this.props.theme].primary}
                  titleTextColor={colors[this.props.theme].text}
                  rightDetailColor={colors[this.props.theme].text}
                  onPress={this.selectTheme.bind(this)}
                />
              </Section>
            </TableView>
          </View>
          <View style={styles(this.props.theme).footerContainer}>
            <Image
              style={styles(this.props.theme).appIcon}
              source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }}
            />
            <Text style={styles(this.props.theme).appTitle}>
              Do you like <Text style={{ fontWeight: fontWeight.heavy }}>Tea Times?</Text>
            </Text>
            <Button
              onPress={this.share.bind(this)}
              title="SHARE WITH FRIENDS"
              currentTheme={this.props.theme}
            />
            <Button
              onPress={this.rate.bind(this)}
              title="LEAVE A FEEDBACK"
              currentTheme={this.props.theme}
            />
            <Button
              onPress={this.sendEmail.bind(this)}
              title="CONNECTION WITH AN AUTHOR"
              currentTheme={this.props.theme}
            />
            <Text style={styles(this.props.theme).footerText}>
              Made in Kazakhstan!{'\n'}Version 1.0
            </Text>
          </View>
        </ScrollView>
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
      alignItems: 'center'
    },
    footerContainer: {
      alignItems: 'center'
    },
    title: {
      marginTop: 10,
      fontFamily: 'Avenir',
      fontWeight: '800',
      fontSize: 20,
      color: colors[currentTheme].text,
      backgroundColor: 'transparent'
    },
    appIcon: {
      marginTop: 30,
      width: 50,
      height: 50,
      borderRadius: 6
    },
    appTitle: {
      marginTop: 10,
      marginBottom: 10,
      fontFamily: 'Avenir',
      fontWeight: fontWeight.roman,
      fontSize: 15,
      color: colors[currentTheme].text,
      backgroundColor: 'transparent'
    },
    footerText: {
      marginTop: 50,
      marginBottom: 20,
      fontFamily: 'Avenir',
      fontSize: 13,
      fontWeight: fontWeight.light,
      color: colors[currentTheme].text,
      backgroundColor: 'transparent',
      textAlign: 'center'
    },
    icon: {
      marginTop: 4
    }
  });

function mapStateToProps(state) {
  return {
    theme: state.theme,
    textSize: state.textSize
  };
}

export default connect(mapStateToProps, { changeTheme, changeTextSize })(Settings);
