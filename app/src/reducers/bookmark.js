import { BOOKMARK_PRESSED } from '../actions/types';

export default (state = false, action) => {
  switch (action.type) {
    case BOOKMARK_PRESSED:
      return action.isSelected;
    default:
      return state;
  }
};
