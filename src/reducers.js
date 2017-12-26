import { combineReducers } from 'redux';
import get from 'lodash.get';

import {
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILED,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILED,
  FETCH_POST_SUCCESS,
  FETCH_POST_FAILED,
  FETCH_POST_COMMENTS_SUCCESS,
  FETCH_POST_COMMENTS_FAILED,
  RESET_POSTS,
  RESET_CURRENT_POST,
  DELETE_POST_SUCCESS,
  DELETE_COMMENT_SUCCESS,
  ADD_POST_SUCCESS,
  EDIT_POST_SUCCESS,
  EDIT_COMMENT_SUCCESS,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILED,
  VOTE_SUCCESS,
  META_CATEGORIES_LOADING,
  META_POSTS_LOADING,
  META_CURRENT_POST_LOADING,
  META_CURRENT_POST_COMMENTS_LOADING,
  META_VOTE_LOADING,
  DELETE_COMMENT_FAILED
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

    case VOTE_SUCCESS:
    case EDIT_POST_SUCCESS:
    case DELETE_POST_SUCCESS: {
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

    case ADD_POST_SUCCESS: {
      const id = get(action, 'payload.id');

      if (!id) {
        return state;
      }

      return state.concat(action.payload);
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

    case VOTE_SUCCESS:
    case EDIT_COMMENT_SUCCESS:
    case DELETE_POST_SUCCESS: {
      const id = get(action, 'payload.id');

      if (!id) {
        return state;
      }

      if (action.voteType === 'posts' && id !== state.id) {
        return state;
      }

      if (action.voteType === 'comments') {
        return {
          ...state,
          ...{
            comments: state.comments.map(comment => {
              if (comment.id === id) {
                return action.payload;
              }

              return comment;
            })
          }
        };
      }

      return { ...action.payload, comments: state.comments };
    }

    case DELETE_COMMENT_SUCCESS: {
      const id = get(action, 'payload.id');

      if (!id || action.voteType !== 'comments' || !state.comments.some(comment => comment.id === id)) {
        return state;
      }

      return {
        ...state,
        ...{
          comments: state.comments.map(comment => {
            if (comment.id === id) {
              return action.payload;
            }

            return comment;
          })
        }
      };
    }

    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        ...{
          comments: state.comments.concat(action.payload)
        }
      };

    case FETCH_POST_COMMENTS_SUCCESS:
      return { ...state, ...{ comments: action.comments } };

    case FETCH_POST_COMMENTS_FAILED:
      return { ...state, ...{ comments: [] } };

    case DELETE_COMMENT_FAILED:
    case ADD_COMMENT_FAILED:
    default:
      return state;
  }
}

const appMetaDefaultState = {
  categoriesLoading: true,
  postsLoading: false,
  currentPostLoading: false,
  currentPostCommentsLoading: false,
  voteLoading: false
};

function meta(state = appMetaDefaultState, action) {
  switch (action.type) {
    case META_CATEGORIES_LOADING:
      return { ...state, ...{ categoriesLoading: action.loading } };

    case META_POSTS_LOADING:
      return { ...state, ...{ postsLoading: action.loading } };

    case META_CURRENT_POST_LOADING:
      return { ...state, ...{ currentPostLoading: action.loading } };

    case META_CURRENT_POST_COMMENTS_LOADING:
      return { ...state, ...{ currentPostCommentsLoading: action.loading } };

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
