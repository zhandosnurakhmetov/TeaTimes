import { CHANGE_THEME } from '../actions/types';
import constants from '../constants';

const { theme } = constants;

export default (state = theme.light, action) => {
  switch (action.type) {
    case CHANGE_THEME:
      return action.theme;
    default:
      return state;
  }
};
