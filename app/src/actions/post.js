import { FETCH_POSTS } from './types';

export function fetchPosts() {
  return ({
    type: FETCH_POSTS,
    posts: {
      post1: {
        title: 'First post'
      }
    }
  });
}
