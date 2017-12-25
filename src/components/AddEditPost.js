import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash.get';
import { message } from 'antd';
import Loader from './Loader';
import AddEditPostForm from './AddEditPostForm';
import { addPost, editPost, fetchCurrentPost, resetCurrentPost } from '../actions';

class AddEditPost extends Component {
  componentDidMount() {
    this.postId = get(this.props.match, 'params.post_id');

    if (this.postId) {
      this.props.fetchCurrentPost(this.postId);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (get(this.props, 'match.url') !== get(nextProps, 'match.url')) {
      nextProps.resetCurrentPost();
      this.postId = get(nextProps.match, 'params.post_id');

      if (this.postId) {
        nextProps.fetchCurrentPost(this.postId);
      }
    }
  }

  componentWillUnmount() {
    if (this.postId) {
      this.props.resetCurrentPost();
    }
  }

  submitPost = values => {
    if (this.postId) {
      return this.props
        .editPost({ ...values, id: this.postId })
        .then(() => message.success('Post successfully updated!'))
        .catch(() => message.error('Post failed to update'));
    }

    return this.props
      .addPost(values)
      .then(() => {
        message.success('Post successfully added!');
        this.props.resetCurrentPost();
      })
      .catch(() => message.error('Post failed to be added'));
  };

  render() {
    const { currentPostLoading, currentPost, categories } = this.props;

    if (currentPostLoading) {
      return <Loader text="Loading Post Details" />;
    }

    return (
      <AddEditPostForm
        submitPost={this.submitPost}
        loading={currentPostLoading}
        categories={categories}
        {...currentPost}
      />
    );
  }
}

AddEditPost.defaultProps = {
  categories: [],
  currentPost: {}
};

AddEditPost.propTypes = {
  match: PropTypes.object.isRequired,
  categories: PropTypes.array,
  currentPost: PropTypes.object,
  currentPostLoading: PropTypes.bool.isRequired,
  fetchCurrentPost: PropTypes.func.isRequired,
  resetCurrentPost: PropTypes.func.isRequired,
  addPost: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired
};

const mapStateToProps = ({ categories, meta, currentPost }) => ({
  currentPostLoading: meta.currentPostLoading,
  currentPost,
  categories
});

const mapDispatchToProps = dispatch => ({
  resetCurrentPost: () => dispatch(resetCurrentPost()),
  fetchCurrentPost: postId => dispatch(fetchCurrentPost(postId)),
  addPost: values => dispatch(addPost(values)),
  editPost: values => dispatch(editPost(values))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddEditPost);
