import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'antd';
import Comment from './Comment';

const Comments = props => {
  const { comments } = props;
  const activeComments = comments.filter(comment => !comment.deleted && !comment.parentDeleted);

  return (
    <List
      size="small"
      style={{ marginTop: 30 }}
      itemLayout="horizontal"
      header={<h4>Comments</h4>}
      footer={
        <div>
          {activeComments.length} {activeComments.length === 1 ? 'comment' : 'comments'}
        </div>
      }
      bordered
      dataSource={comments}
      renderItem={comment => <Comment {...comment} />}
    />
  );
};

Comments.defaultProps = {
  comments: [],
  category: ''
};

Comments.propTypes = {
  comments: PropTypes.array,
  category: PropTypes.string
};

export default Comments;
