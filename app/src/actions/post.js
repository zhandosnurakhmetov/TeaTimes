import * as firebase from 'firebase';
import { FETCH_POSTS } from './types';

export function fetchPosts() {
  return (dispatch) => {
    const posts = firebase.database().ref('/posts');
    posts.on('value', (snapshot) => {
      console.log(snapshot);
      dispatch({ type: FETCH_POSTS, posts: snapshot.val() });
    });
  };

    // return ({
    //   type: FETCH_POSTS,
    //   posts: {
    //     post1: {
    //       title: 'First post'
    //     }
    //   }
    // });
}

// export const changeMode = ({ mode }) => {
//   const { currentUser } = firebase.auth();
//   const newMode = (mode === DEFAULT) ? MASTER : DEFAULT;
//   loaderHandler.showLoader('Requesting...');
//   return (dispatch) => {
//     firebase.database().ref(`/Users/${currentUser.uid}/`)
//     .update({ mode: newMode })
//     .then(() => {
//       loaderHandler.hideLoader();
//       dispatch({ type: CHANGE_MODE, payload: { mode: newMode } });
//     })
//     .catch(() => {
//       console.log('ERROR updating mode...');
//       loaderHandler.hideLoader();
//     });
//   };
// };
