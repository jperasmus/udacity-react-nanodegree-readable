import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List, Avatar, Icon, Tooltip, Modal, message } from 'antd';
import relativeDate from 'relative-date';
import Voter from './Voter';
import { deleteComment } from '../actions';

const { confirm } = Modal;

class Comment extends Component {
  confirmPostDelete = () => {
    confirm({
      title: 'Sure you want to delete this comment?',
      content: 'This action can not be undone',
      onOk: () => {
        this.props.deleteComment(this.props.id);
      },
      onCancel() {
        // User pressed "Cancel", don't do anything
      }
    });
  };

  render() {
    const { body, id, author, voteScore, timestamp, deleted } = this.props;

    if (deleted) {
      message.info('This comment has been deleted');
      return null;
    }

    return (
      <List.Item
        actions={[
          <Voter id={id} type="comments" voteScore={voteScore} />,
          <a href="#" onClick={() => this.confirmPostDelete()}>
            <Tooltip title="Edit Comment">
              <Icon type="edit" />
            </Tooltip>
          </a>,
          <a href="#" onClick={() => this.confirmPostDelete()}>
            <Tooltip title="Delete Comment">
              <Icon type="delete" />
            </Tooltip>
          </a>
        ]}
      >
        <List.Item.Meta
          avatar={<Avatar src={`https://api.adorable.io/avatars/85/${author}.png`} />}
          title={
            <div>
              <small>
                Posted by <strong>{author}</strong> {relativeDate(timestamp)}
              </small>
            </div>
          }
          description={body}
        />
      </List.Item>
    );
  }
}

Comment.propTypes = {
  id: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  body: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  voteScore: PropTypes.number.isRequired,
  deleted: PropTypes.bool.isRequired,
  deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  deleteComment: commentId => dispatch(deleteComment(commentId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
