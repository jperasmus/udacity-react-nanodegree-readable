import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'antd';
import Post from './Post';

class Posts extends Component {
  render() {
    const { posts, category } = this.props;

    return (
      <List
        size="large"
        header={<h2>{category ? `All "${category}" posts` : 'All posts'}</h2>}
        footer={<div>{posts.length === 1 ? `${posts.length} post` : `${posts.length} posts`}</div>}
        bordered
        dataSource={posts}
        renderItem={post => <Post {...post} />}
      />
    );
  }
}

Posts.defaultProps = {
  posts: [],
  category: ''
};

Posts.propTypes = {
  posts: PropTypes.array,
  category: PropTypes.string
};

export default Posts;
