import { CHANGE_LANGUAGE } from '../actions/types';

export default (state = '', action) => {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      return action.language;
    default:
      return state;
  }
};
