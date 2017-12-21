import { combineReducers } from 'redux';

import { FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORIES_FAILED, FETCH_POSTS_SUCCESS, FETCH_POSTS_FAILED } from './actions';

function categories(state = [], action) {
  switch (action.type) {
    case FETCH_CATEGORIES_SUCCESS:
      return [].concat(action.categories);

    case FETCH_CATEGORIES_FAILED:
      return [];

    default:
      return state;
  }
}

function posts(state = [], action) {
  switch (action.type) {
    case FETCH_POSTS_SUCCESS:
      return [].concat(action.posts);

    case FETCH_POSTS_FAILED:
      return [];

    default:
      return state;
  }
}

export default combineReducers({
  categories,
  posts
});
