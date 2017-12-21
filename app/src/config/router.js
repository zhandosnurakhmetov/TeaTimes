import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
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
        tabBarIcon: ({ tintColor }) => <Icon name="ios-home-outline" size={30} color={tintColor} />
      }
    },
    Settings: {
      screen: Settings,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-settings-outline" size={30} color={tintColor} />
        )
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: 'black',
      inactiveTintColor: 'grey',
      showIcon: true,
      showLabel: false
    }
  }
);

export default Router;
