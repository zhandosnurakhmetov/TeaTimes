import { combineReducers } from 'redux';

import PostsReducer from './post';
import ThemeReducer from './theme';

const rootReducer = combineReducers({
  posts: PostsReducer,
  theme: ThemeReducer
});

export default rootReducer;
