import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'antd';
import capitalize from 'lodash.capitalize';
import Post from './Post';

const Posts = props => {
  const { posts, category } = props;
  const activePosts = posts.filter(post => !post.deleted);

  return (
    <List
      size="large"
      header={<h2>{category ? capitalize(category) : 'All'} posts</h2>}
      footer={
        <div>
          {activePosts.length} {activePosts.length === 1 ? 'post' : 'posts'}
        </div>
      }
      bordered
      dataSource={posts}
      renderItem={post => <Post {...post} />}
    />
  );
};

Posts.defaultProps = {
  posts: [],
  category: ''
};

Posts.propTypes = {
  posts: PropTypes.array,
  category: PropTypes.string
};

export default Posts;
