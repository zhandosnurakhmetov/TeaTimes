import * as firebase from 'firebase';
import { FETCH_POSTS } from './types';

export function fetchPosts() {
  return (dispatch) => {
    const posts = firebase.database().ref('/posts');
    posts.on('value', (snapshot) => {
      const array = [];
      const results = snapshot.val();

      for (const element in results ) {
        array.push(results[element]);
      }

      const types = array.map((book) => book.type);
      const uniqueTypes = [...new Set(types)];
      const res = uniqueTypes.map(type => ({
          type,
          value: array.filter(item => item.type === type)
        })
      );

      dispatch({ type: FETCH_POSTS, posts: res });
    });
  };
}
