import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
  StyleSheet,
  ScrollView,
  Switch
} from 'react-native';
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
          <View style={styles.contentContainer}>
            <TableView>
              <Section sectionTintColor="transparent">
                <Cell
                  cellStyle="Basic"
                  title="Push Notifications"
                  image={<Icon name="home" size={30} />}
                  backgroundColor="pink"
                  cellAccessoryView={<Switch onTintColor="orange" />}
                />
              </Section>
              <Section sectionTintColor="transparent">
                <Cell
                  cellStyle="RightDetail"
                  title="Font size"
                  detail="14"
                  image={<Icon name="home" size={30} />}
                />
                <Cell
                  cellStyle="RightDetail"
                  title="Theme"
                  detail="Light"
                  image={<Icon name="home" size={30} />}
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
    flex: 1,
    alignItems: 'center'
  },
  contentContainer: {
    flex: 4
  },
  footerContainer: {
    flex: 5,
    alignItems: 'center'
  },
  title: {
    marginTop: 10,
    color: 'red',
    fontFamily: 'Avenir',
    fontWeight: '800',
    fontSize: 20,
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
    fontWeight: fontWeight.roman,
    fontSize: 15,
    backgroundColor: 'transparent'
  }
});

export default Settings;
