import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Text,
  View,
  Image,
  ImageBackground,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity
} from 'react-native';
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import { connect } from 'react-redux';
import constants from '../../constants';
import Button from './Button';
import { changeTheme } from '../../actions';

const { colors, fontWeight, theme, background } = constants;

class Settings extends Component {
  share() {
    this.props.changeTheme(theme.dark);
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
                  title="Font size"
                  detail="14"
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
                />
                <Cell
                  cellStyle="RightDetail"
                  title="Theme"
                  detail="Light"
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
              onPress={this.share.bind(this)}
              title="LEAVE A FEEDBACK"
              currentTheme={this.props.theme}
            />
            <Button
              onPress={this.share.bind(this)}
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
    theme: state.theme
  };
}

export default connect(mapStateToProps, { changeTheme })(Settings);
