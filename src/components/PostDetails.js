import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Layout, Card, Icon, Tooltip, Alert, Modal, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import relativeDate from 'relative-date';
import get from 'lodash.get';
import capitalize from 'lodash.capitalize';
import Loader from './Loader';
import Voter from './Voter';
import Comments from './Comments';
import { fetchCurrentPost, fetchCurrentPostComments, resetCurrentPost, deletePost } from '../actions';

const { Content, Sider } = Layout;
const { confirm } = Modal;

class PostDetails extends Component {
  componentDidMount() {
    const postId = get(this.props.match, 'params.post_id');
    this.props.fetchCurrentPost(postId).then(() => this.props.fetchCurrentPostComments(postId));
  }

  componentWillUnmount() {
    this.props.resetCurrentPost();
  }

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
    const {
      currentPostLoading,
      currentPostCommentsLoading,
      title,
      body,
      id,
      author,
      voteScore,
      timestamp,
      category,
      deleted,
      comments
    } = this.props;

    if (deleted) {
      return <Alert message="This post has been deleted" type="info" />;
    }

    if (currentPostLoading) {
      return <Loader text="Loading Post Details" />;
    }

    return (
      <div>
        <Breadcrumb style={{ marginBottom: 30 }}>
          <Breadcrumb.Item>
            <Link to="/">
              <Icon type="home" />
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to={`/${category}`}>{capitalize(category)}</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{title}</Breadcrumb.Item>
        </Breadcrumb>
        <Layout>
          <Sider style={{ background: 'white' }}>
            <Voter id={id} type="posts" voteScore={voteScore} size="large" />
          </Sider>
          <Content style={{ background: 'white' }}>
            <Card
              title={title}
              extra={
                <small>
                  Posted by <strong>{author}</strong> {relativeDate(timestamp)}
                </small>
              }
              actions={[
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
              <p>{body}</p>
            </Card>

            {currentPostCommentsLoading ? <Loader text="Loading Post Comments" /> : <Comments comments={comments} />}
          </Content>
          <Sider style={{ background: 'white' }} />
        </Layout>
      </div>
    );
  }
}

PostDetails.defaultProps = {
  id: '',
  timestamp: 0,
  title: '',
  body: '',
  author: '',
  category: '',
  voteScore: 0,
  deleted: false,
  comments: []
};

PostDetails.propTypes = {
  match: PropTypes.object.isRequired,
  currentPostLoading: PropTypes.bool.isRequired,
  currentPostCommentsLoading: PropTypes.bool.isRequired,
  fetchCurrentPost: PropTypes.func.isRequired,
  fetchCurrentPostComments: PropTypes.func.isRequired,
  resetCurrentPost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  id: PropTypes.string,
  timestamp: PropTypes.number,
  title: PropTypes.string,
  body: PropTypes.string,
  author: PropTypes.string,
  category: PropTypes.string,
  voteScore: PropTypes.number,
  deleted: PropTypes.bool,
  comments: PropTypes.array
};

const mapStateToProps = ({ currentPost, meta }) => ({
  currentPostLoading: meta.currentPostLoading,
  currentPostCommentsLoading: meta.currentPostCommentsLoading,
  ...currentPost
});

const mapDispatchToProps = dispatch => ({
  resetCurrentPost: () => dispatch(resetCurrentPost()),
  fetchCurrentPost: postId => dispatch(fetchCurrentPost(postId)),
  fetchCurrentPostComments: postId => dispatch(fetchCurrentPostComments(postId)),
  deletePost: postId => dispatch(deletePost(postId))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);
