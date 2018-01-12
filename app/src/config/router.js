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
    }
  },
  {
    headerMode: 'none'
  }
);

const Tab = TabNavigator(
  {
    Stories: {
      screen: storiesStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon name="home" size={25} color={tintColor} />
      }
    },
    Settings: {
      screen: Settings,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon name="settings" size={25} color={tintColor} />
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

const Router = StackNavigator(
  {
    Tab: {
      screen: Tab
    },
    Player: {
      screen: Player,
      navigationOptions: {
        tabBarVisible: false
      }
    }
  },
  { headerMode: 'none', mode: 'modal' }
);

export default Router;
