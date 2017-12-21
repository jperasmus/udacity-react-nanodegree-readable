import * as api from './utils/api';

export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_FAILED = 'FETCH_CATEGORIES_FAILED';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILED = 'FETCH_POSTS_FAILED';

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
  return dispatch =>
    api
      .fetchCategories()
      .then(categories => dispatch(categoriesFetchSuccess(categories)))
      .catch(error => dispatch(categoriesFetchFailed(error.message)));
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

export function fetchPosts(category) {
  return dispatch =>
    api
      .fetchPosts(category)
      .then(posts => dispatch(postsFetchSuccess(posts)))
      .catch(error => dispatch(postsFetchFailed(error.message)));
}
