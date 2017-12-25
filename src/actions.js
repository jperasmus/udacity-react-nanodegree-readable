import * as api from './utils/api';

export const META_CATEGORIES_LOADING = 'META_CATEGORIES_LOADING';
export const META_POSTS_LOADING = 'META_POSTS_LOADING';
export const META_CURRENT_POST_LOADING = 'META_CURRENT_POST_LOADING';
export const META_VOTE_LOADING = 'META_VOTE_LOADING';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_FAILED = 'FETCH_CATEGORIES_FAILED';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILED = 'FETCH_POSTS_FAILED';
export const RESET_POSTS = 'RESET_POSTS';
export const FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS';
export const FETCH_POST_FAILED = 'FETCH_POST_FAILED';
export const RESET_CURRENT_POST = 'RESET_CURRENT_POST';
export const VOTE_SUCCESS = 'VOTE_SUCCESS';
export const VOTE_FAILED = 'VOTE_FAILED';
export const VOTE_DOWN_SUCCESS = 'VOTE_DOWN_SUCCESS';
export const VOTE_DOWN_FAILED = 'VOTE_DOWN_FAILED';
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const DELETE_POST_FAILED = 'DELETE_POST_FAILED';

/** *********
 * APP META *
 ********** */
export const categoriesLoading = loading => ({
  type: META_CATEGORIES_LOADING,
  loading
});

export const postsLoading = loading => ({
  type: META_POSTS_LOADING,
  loading
});

export const currentPostLoading = loading => ({
  type: META_CURRENT_POST_LOADING,
  loading
});

export const voteLoading = loading => ({
  type: META_VOTE_LOADING,
  loading
});

/** ***********
 * CATEGORIES *
 ************ */
export const categoriesFetchSuccess = categories => ({
  type: FETCH_CATEGORIES_SUCCESS,
  categories
});

export const categoriesFetchFailed = error => ({
  type: FETCH_CATEGORIES_FAILED,
  error
});

export function fetchCategories() {
  return dispatch => {
    dispatch(categoriesLoading(true));
    return api
      .fetchCategories()
      .then(categories => {
        dispatch(categoriesLoading(false));
        return dispatch(categoriesFetchSuccess(categories));
      })
      .catch(error => {
        dispatch(categoriesLoading(false));
        return dispatch(categoriesFetchFailed(error.message));
      });
  };
}

/** ******
 * POSTS *
 ******* */
export const postsFetchSuccess = posts => ({
  type: FETCH_POSTS_SUCCESS,
  posts
});

export const postsFetchFailed = error => ({
  type: FETCH_POSTS_FAILED,
  error
});

export const resetPosts = () => ({
  type: RESET_POSTS
});

export function fetchPosts(category) {
  return dispatch => {
    dispatch(postsLoading(true));

    return api
      .fetchPosts(category)
      .then(posts => {
        dispatch(postsLoading(false));
        return dispatch(postsFetchSuccess(posts));
      })
      .catch(error => {
        dispatch(postsLoading(false));
        return dispatch(postsFetchFailed(error.message));
      });
  };
}

export const currentPostFetchSuccess = post => ({
  type: FETCH_POST_SUCCESS,
  post
});

export const currentPostFetchFailed = error => ({
  type: FETCH_POST_FAILED,
  error
});

export const resetCurrentPost = () => ({
  type: RESET_CURRENT_POST
});

export function fetchCurrentPost(postId) {
  return dispatch => {
    dispatch(currentPostLoading(true));

    return api
      .fetchCurrentPost(postId)
      .then(post => {
        dispatch(currentPostLoading(false));
        return dispatch(currentPostFetchSuccess(post));
      })
      .catch(error => {
        dispatch(currentPostLoading(false));
        return dispatch(currentPostFetchFailed(error.message));
      });
  };
}

export const postDeleteSuccess = payload => ({
  type: DELETE_POST_SUCCESS,
  voteType: 'posts',
  payload
});

export const postDeleteFailed = error => ({
  type: DELETE_POST_FAILED,
  error
});

export function deletePost(postId) {
  return dispatch =>
    api
      .deletePost(postId)
      .then(post => dispatch(postDeleteSuccess(post)))
      .catch(error => dispatch(postDeleteFailed(error.message)));
}

/** ******
 * VOTES *
 ******* */
export const voteSuccess = (voteType, payload) => ({
  type: VOTE_SUCCESS,
  voteType,
  payload
});

export const voteFailed = error => ({
  type: VOTE_FAILED,
  error
});

export function voteUp(type, id) {
  return dispatch => {
    dispatch(voteLoading(true));

    return api
      .voteUp(type, id)
      .then(payload => {
        dispatch(voteLoading(false));
        return dispatch(voteSuccess(type, payload));
      })
      .catch(error => {
        dispatch(voteLoading(false));
        return dispatch(voteFailed(error.message));
      });
  };
}

export function voteDown(type, id) {
  return dispatch => {
    dispatch(voteLoading(true));

    return api
      .voteDown(type, id)
      .then(payload => {
        dispatch(voteLoading(false));
        return dispatch(voteSuccess(type, payload));
      })
      .catch(error => {
        dispatch(voteLoading(false));
        return dispatch(voteFailed(error.message));
      });
  };
}
