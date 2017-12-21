import { combineReducers } from 'redux';

import {
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILED,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILED,
  FETCH_POST_SUCCESS,
  FETCH_POST_FAILED,
  RESET_CURRENT_POST,
  META_CURRENT_POST_LOADING
} from './actions';

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

function currentPost(state = {}, action) {
  switch (action.type) {
    case FETCH_POST_SUCCESS:
      return { ...action.post };

    case FETCH_POST_FAILED:
    case RESET_CURRENT_POST:
      return {};

    default:
      return state;
  }
}

const appMetaDefaultState = {
  currentPostLoading: false
};

function meta(state = appMetaDefaultState, action) {
  switch (action.type) {
    case META_CURRENT_POST_LOADING:
      console.log('META_CURRENT_POST_LOADING', action);
      return { ...state, ...{ currentPostLoading: action.loading } };

    default:
      return state;
  }
}

export default combineReducers({
  categories,
  posts,
  currentPost,
  meta
});
