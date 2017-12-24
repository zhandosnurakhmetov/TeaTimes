import { FETCH_POSTS } from '../actions';

export default function(state={}, action) {
  switch(action.type) {
  case FETCH_POSTS:
      const post = action.payload.data;
      const newState = { ...state };
      newState[post.id] = post;
      return newState;
  default:
    return state;
  }
}
