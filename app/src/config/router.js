import { TabNavigator, StackNavigator } from 'react-navigation';
import { Stories, DetailedStory, Settings, Player } from '../views';

const Router = TabNavigator({
  Stories: {
    screen: Stories,
  },
  Settings: {
    screen: Settings,
  },
});

export default Router;
