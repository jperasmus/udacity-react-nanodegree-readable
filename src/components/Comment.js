import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List, Avatar, Icon, Tooltip, Modal, message, Button, Input } from 'antd';
import relativeDate from 'relative-date';
import Voter from './Voter';
import { deleteComment, editComment } from '../actions';

const { confirm } = Modal;
const { TextArea } = Input;

class Comment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showEditModal: false,
      editComment: props.body
    };
  }

  confirmCommentDelete = () => {
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

  showEditModal = () => {
    this.setState({ showEditModal: true });
  };

  handleEditOk = () => {
    this.props.editComment({ body: this.state.editComment, id: this.props.id }).then(() => {
      message.success('Comment successfully updated!');
      this.setState({ showEditModal: false });
    });
  };

  handleEditCancel = () => {
    this.setState({ showEditModal: false });
  };

  handleCommentEditChange = event => {
    this.setState({ editComment: event.target.value });
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
          <a href="#" onClick={() => this.showEditModal()}>
            <Tooltip title="Edit Comment">
              <Icon type="edit" />
            </Tooltip>
          </a>,
          <a href="#" onClick={() => this.confirmCommentDelete()}>
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
        <Modal
          visible={this.state.showEditModal}
          title="Edit Comment"
          onOk={this.handleEditOk}
          onCancel={this.handleEditCancel}
          footer={[
            <Button key="cancel" onClick={this.handleEditCancel}>
              Cancel
            </Button>,
            <Button key="save" type="primary" onClick={this.handleEditOk}>
              Save
            </Button>
          ]}
        >
          <TextArea
            placeholder=""
            autosize={{ minRows: 2, maxRows: 4 }}
            onChange={this.handleCommentEditChange}
            value={this.state.editComment}
          />
        </Modal>
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
  deleteComment: PropTypes.func.isRequired,
  editComment: PropTypes.func.isRequired
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  deleteComment: commentId => dispatch(deleteComment(commentId)),
  editComment: payload => dispatch(editComment(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
