import { combineReducers } from 'redux';
import get from 'lodash.get';

import {
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILED,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILED,
  FETCH_POST_SUCCESS,
  FETCH_POST_FAILED,
  RESET_POSTS,
  RESET_CURRENT_POST,
  VOTE_SUCCESS,
  META_POSTS_LOADING,
  META_CURRENT_POST_LOADING,
  META_VOTE_LOADING
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
    case RESET_POSTS:
      return [];

    case VOTE_SUCCESS: {
      const id = get(action, 'payload.id');

      if (!id || action.voteType !== 'posts') {
        return state;
      }

      return state.map(post => {
        if (post.id === id) {
          return action.payload;
        }

        return post;
      });
    }

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

    case VOTE_SUCCESS: {
      const id = get(action, 'payload.id');

      if (!id || action.voteType !== 'posts' || id !== state.id) {
        return state;
      }

      return action.payload;
    }

    default:
      return state;
  }
}

const appMetaDefaultState = {
  postsLoading: false,
  currentPostLoading: false,
  voteLoading: false
};

function meta(state = appMetaDefaultState, action) {
  switch (action.type) {
    case META_POSTS_LOADING:
      return { ...state, ...{ postsLoading: action.loading } };

    case META_CURRENT_POST_LOADING:
      return { ...state, ...{ currentPostLoading: action.loading } };

    case META_VOTE_LOADING:
      return { ...state, ...{ voteLoading: action.loading } };

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
