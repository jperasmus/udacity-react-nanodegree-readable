import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, Avatar, Icon, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import relativeDate from 'relative-date';

class Post extends Component {
  render() {
    const { title, body, id, author, voteScore, commentCount, timestamp, category } = this.props;

    return (
      <List.Item
        actions={[
          <div>Vote mechanism...</div>,
          <Link to={`/${category}/${id}`}>
            <Tooltip title="View Post">
              <Icon type="eye" />
            </Tooltip>
          </Link>,
          <Link to={`/${category}/${id}/edit`}>
            <Tooltip title="Edit Post">
              <Icon type="edit" />
            </Tooltip>
          </Link>,
          <a>
            <Tooltip title="Delete Post">
              <Icon type="delete" />
            </Tooltip>
          </a>
        ]}
      >
        <List.Item.Meta
          avatar={<Avatar src={`https://api.adorable.io/avatars/85/${author}.png`} />}
          title={
            <Link to={`/${category}/${id}`}>
              {title}{' '}
              <div>
                <small>
                  Posted by <strong>{author}</strong> {relativeDate(timestamp)}
                </small>
              </div>
            </Link>
          }
          description={body}
        />
        <div>
          {voteScore} ({commentCount === 1 ? '1 comment' : `${commentCount} comments`})
        </div>
      </List.Item>
    );
  }
}

Post.propTypes = {
  id: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  voteScore: PropTypes.number.isRequired,
  // deleted: PropTypes.bool.isRequired,
  commentCount: PropTypes.number.isRequired
};

export default Post;
