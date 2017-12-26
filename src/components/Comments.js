import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List, Icon, Row, Col, Modal, Button, Input, message, Form } from 'antd';
import Comment from './Comment';
import { addComment } from '../actions';

const { TextArea } = Input;

class Comments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAddModal: false,
      comment: { value: '' },
      author: { value: '' }
    };
  }

  validate = (field, value) => {
    switch (field) {
      case 'author':
      case 'comment': {
        if (!value) {
          return {
            validateStatus: 'error',
            errorMsg: 'Field is required'
          };
        }

        return {
          validateStatus: 'success',
          errorMsg: null
        };
      }

      default:
        return {
          validateStatus: 'error',
          errorMsg: 'Field unknown'
        };
    }
  };

  showAddModal = () => {
    this.setState({ showAddModal: true });
  };

  handleAddOk = () => {
    const { author, comment } = this.state;
    this.props.addComment({ body: comment.value, author: author.value, parentId: this.props.postId }).then(() => {
      message.success('Comment successfully added!');
      this.setState({ showAddModal: false });
    });
  };

  handleAddCancel = () => {
    this.setState({ showAddModal: false });
  };

  handleCommentAddChange = (field, value) => {
    this.setState({
      [field]: {
        ...this.validate(field, value),
        value
      }
    });
  };

  render() {
    const { comments } = this.props;
    const activeComments = comments.filter(comment => !comment.deleted && !comment.parentDeleted);

    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 12 }
    };
    const { comment, author } = this.state;

    return (
      <div>
        <List
          size="small"
          style={{ marginTop: 30 }}
          itemLayout="horizontal"
          header={<h4>Comments</h4>}
          footer={
            <Row type="flex" justify="space-between">
              <Col>
                {activeComments.length} {activeComments.length === 1 ? 'comment' : 'comments'}
              </Col>
              <Col>
                <a href="#" onClick={this.showAddModal}>
                  <Icon type="plus-circle" /> Add Comment
                </a>
              </Col>
            </Row>
          }
          bordered
          dataSource={comments}
          renderItem={item => <Comment {...item} />}
        />

        <Modal
          visible={this.state.showAddModal}
          title="Add Comment"
          onOk={this.handleAddOk}
          onCancel={this.handleAddCancel}
          footer={[
            <Button key="cancel" onClick={this.handleAddCancel}>
              Cancel
            </Button>,
            <Button key="save" type="primary" onClick={this.handleAddOk}>
              Save
            </Button>
          ]}
        >
          <Form>
            <Form.Item {...formItemLayout} label="Author" validateStatus={author.validateStatus} help={author.errorMsg}>
              <Input
                min={8}
                max={12}
                value={author.value}
                onChange={({ target: { value } }) => this.handleCommentAddChange('author', value)}
              />
            </Form.Item>

            <Form.Item
              {...formItemLayout}
              label="Comment"
              validateStatus={comment.validateStatus}
              help={comment.errorMsg || 'Make it a good one!'}
            >
              <TextArea
                autosize={{ minRows: 2, maxRows: 4 }}
                onChange={({ target: { value } }) => this.handleCommentAddChange('comment', value)}
                value={comment.value}
              />{' '}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

Comments.defaultProps = {
  comments: [],
  category: ''
};

Comments.propTypes = {
  addComment: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  comments: PropTypes.array,
  category: PropTypes.string
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  addComment: payload => dispatch(addComment(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
