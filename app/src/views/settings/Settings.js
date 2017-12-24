import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Text, View, Image, ImageBackground, StyleSheet, ScrollView, Switch } from 'react-native';
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import colors from '../../constants/colors';
import fontWeight from '../../constants/fontWeight';
import Button from './Button';

class Settings extends Component {
  share() {}

  render() {
    return (
      <ImageBackground source={require('../../backgrounds/default.png')} style={styles.container}>
        <ScrollView>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>SETTINGS</Text>
          </View>
          <View>
            <TableView>
              <Section sectionTintColor="transparent" separatorTintColor={colors.light.secondary}>
                <Cell
                  cellStyle="Basic"
                  title="Push Notifications"
                  image={
                    <Icon
                      style={styles.icon}
                      name="notifications"
                      size={25}
                      color={colors.light.icon}
                    />
                  }
                  backgroundColor={colors.light.primary}
                  titleTextColor={colors.light.text}
                  cellAccessoryView={<Switch onTintColor={colors.light.switch} />}
                />
              </Section>
              <Section sectionTintColor="transparent" separatorTintColor={colors.light.secondary}>
                <Cell
                  cellStyle="RightDetail"
                  title="Font size"
                  detail="14"
                  image={
                    <Icon
                      style={styles.icon}
                      name="format-size"
                      size={25}
                      color={colors.light.icon}
                    />
                  }
                  backgroundColor={colors.light.primary}
                  titleTextColor={colors.light.text}
                  rightDetailColor={colors.light.text}
                />
                <Cell
                  cellStyle="RightDetail"
                  title="Theme"
                  detail="Light"
                  image={
                    <Icon
                      style={styles.icon}
                      name="format-paint"
                      size={25}
                      color={colors.light.icon}
                    />
                  }
                  backgroundColor={colors.light.primary}
                  titleTextColor={colors.light.text}
                  rightDetailColor={colors.light.text}
                />
              </Section>
            </TableView>
          </View>
          <View style={styles.footerContainer}>
            <Image
              style={styles.appIcon}
              source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }}
            />
            <Text style={styles.appTitle}>
              Do you like <Text style={{ fontWeight: fontWeight.heavy }}>Tea Times?</Text>
            </Text>
            <Button onPress={this.share} title="SHARE WITH FRIENDS" />
            <Button onPress={this.share} title="LEAVE A FEEDBACK" />
            <Button onPress={this.share} title="CONNECTION WITH AN AUTHOR" />
            <Text style={styles.footerText}>Made in Kazakhstan!{'\n'}Version 1.0</Text>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
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
    color: colors.light.text,
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
    color: colors.light.text,
    backgroundColor: 'transparent'
  },
  footerText: {
    marginTop: 50,
    marginBottom: 20,
    fontFamily: 'Avenir',
    fontSize: 13,
    fontWeight: fontWeight.light,
    color: colors.light.text,
    backgroundColor: 'transparent',
    textAlign: 'center'
  },
  icon: {
    marginTop: 4
  }
});

export default Settings;
