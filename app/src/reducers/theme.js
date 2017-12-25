import { CHANGE_THEME } from '../actions/types';

export default (state = 'light', action) => {
  switch (action.type) {
    case CHANGE_THEME:
      return action.theme;
    default:
      return state;
  }
};
