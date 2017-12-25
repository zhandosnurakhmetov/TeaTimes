import { combineReducers } from 'redux';

import PostsReducer from './post';
import ThemeReducer from './theme';
import TextReducer from './text';

const rootReducer = combineReducers({
  posts: PostsReducer,
  theme: ThemeReducer,
  textSize: TextReducer
});

export default rootReducer;
