import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List, Avatar, Icon, Tooltip, Modal, message } from 'antd';
import { Link } from 'react-router-dom';
import relativeDate from 'relative-date';
import Voter from './Voter';
import { deletePost } from '../actions';

const { confirm } = Modal;

class Post extends Component {
  confirmPostDelete = () => {
    confirm({
      title: 'Sure you want to delete this post?',
      content: 'This action can not be undone',
      onOk: () => {
        this.props.deletePost(this.props.id);
      },
      onCancel() {
        // User pressed "Cancel", don't do anything
      }
    });
  };

  render() {
    const { title, body, id, author, voteScore, commentCount, timestamp, category, deleted } = this.props;

    if (deleted) {
      message.success('Successfully deleted post!');
      return null;
    }

    return (
      <List.Item
        actions={[
          <Voter id={id} type="posts" voteScore={voteScore} />,
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
          <a href="#" onClick={() => this.confirmPostDelete()}>
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
        <div>{commentCount === 1 ? '1 comment' : `${commentCount} comments`}</div>
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
  deleted: PropTypes.bool.isRequired,
  commentCount: PropTypes.number.isRequired,
  deletePost: PropTypes.func.isRequired
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  deletePost: postId => dispatch(deletePost(postId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
