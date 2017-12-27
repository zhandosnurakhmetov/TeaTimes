import { combineReducers } from 'redux';

import PostsReducer from './post';
import ThemeReducer from './theme';
import TextReducer from './text';
import BookmarkReducer from './bookmark';
import LanguageReducer from './language';

const rootReducer = combineReducers({
  posts: PostsReducer,
  theme: ThemeReducer,
  textSize: TextReducer,
  isBookmarkSelected: BookmarkReducer,
  selectedLanguage: LanguageReducer
});

export default rootReducer;
