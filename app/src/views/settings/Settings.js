import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  Dimensions,
  ScrollView,
  Switch
} from 'react-native';
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import colors from '../../constants/colors';

class Settings extends Component {
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
    flex: 9
  },
  title: {
    marginTop: 10,
    color: 'red',
    fontFamily: 'Avenir',
    fontWeight: '800',
    fontSize: 20,
    backgroundColor: 'transparent'
  }
});

export default Settings;
