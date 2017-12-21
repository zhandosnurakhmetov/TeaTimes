import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Stories, DetailedStory, Settings, Player } from '../views';

const storiesStack = StackNavigator(
  {
    Stories: {
      screen: Stories
    },
    DetailedStory: {
      screen: Stories
    }
  },
  {
    headerMode: 'none'
  }
);

const Router = TabNavigator(
  {
    Stories: {
      screen: storiesStack,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor }) => <Icon name="home" size={20} color={tintColor} />
      }
    },
    Settings: {
      screen: Settings,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor }) => <Icon name="settings" size={20} color={tintColor} />
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: 'orange',
      inactiveTintColor: 'grey',
      showIcon: true
    }
  }
);

export default Router;
