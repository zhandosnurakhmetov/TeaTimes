import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Stories, DetailedStory, Settings, Player } from '../views';

const storiesStack = StackNavigator(
  {
    Stories: {
      screen: Stories
    },
    DetailedStory: {
      screen: DetailedStory
    },
    Player: {
      screen: Player
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
        tabBarIcon: ({ tintColor }) => <Icon name="home" size={30} color={tintColor} />
      }
    },
    Settings: {
      screen: Settings,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon name="settings" size={30} color={tintColor} />
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: 'black',
      inactiveTintColor: 'grey',
      showIcon: true,
      showLabel: false,
      style: {
        backgroundColor: 'transparent'
      },
      indicatorStyle: {
        backgroundColor: 'transparent'
      }
    },
    tabBarPosition: 'bottom',
    swipeEnabled: false
  }
);

export default Router;
