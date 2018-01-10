import { AsyncStorage } from 'react-native';
import * as firebase from 'firebase';
import { FETCH_POSTS } from './types';

export function fetchPosts() {
  return dispatch => {
    const posts = firebase.database().ref('/posts');
    // FETCH OBJECT
    posts.on('value', snapshot => {
      const array = [];
      const results = snapshot.val();

      for (const element in results) {
        const item = results[element];
        item.id = element;
        array.push(item);
      }

      // CONVERT RESULTS AND MAKE UNIQUE
      const types = array.map(book => book.type);
      const uniqueTypes = [...new Set(types)];
      const res = uniqueTypes.map(type => ({
        type,
        value: array.filter(item => item.type === type)
      }));

      configureFavorites(res)(dispatch);
    });
  };
}

export const configureFavorites = books => dispatch => {
  const favorites = [];

  AsyncStorage.getAllKeys().then(keys => {
    console.log('HERE I AM:', keys);

    if (keys.length === 1) {
      return dispatch({ type: FETCH_POSTS, posts: books });
    }

    const dict = {};
    keys.map(key => (dict[key] = true));
    books.forEach(book => {
      book.value.forEach(item => {
        if (dict[item.id] === true) {
          favorites.push(item);
        }
      });
    });
    const favsObject = {
      type: 'Favorites',
      value: favorites
    };
    let booksWithFavs = [];
    booksWithFavs = books;
    booksWithFavs.splice(0, 0, favsObject);
    // booksWithFavs.push(favsObject);
    return dispatch({ type: FETCH_POSTS, posts: booksWithFavs });
  });
};
