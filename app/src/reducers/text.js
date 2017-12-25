import { CHANGE_TEXT_SIZE } from '../actions/types';

export default (state = 14, action) => {
  switch (action.type) {
    case CHANGE_TEXT_SIZE:
      return action.textSize;
    default:
      return state;
  }
};
