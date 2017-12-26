import { FETCH_POSTS, BOOKMARK_PRESSED } from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_POSTS:
      return action.posts;
    default:
      return state;
  }
};
