import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Layout, Card, Icon, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import relativeDate from 'relative-date';
import get from 'lodash.get';
import Loader from './Loader';
import Voter from './Voter';
import { fetchCurrentPost, resetCurrentPost } from '../actions';

const { Content, Sider } = Layout;

class PostDetails extends Component {
  componentDidMount() {
    this.props.fetchCurrentPost(get(this.props.match, 'params.post_id'));
  }

  componentWillUnmount() {
    this.props.resetCurrentPost();
  }

  render() {
    const { currentPostLoading, title, body, id, author, voteScore, commentCount, timestamp, category } = this.props;

    if (currentPostLoading) {
      return <Loader text="Loading Post Details" />;
    }

    return (
      <Layout>
        <Sider style={{ background: 'white' }}>
          <Voter id={id} type="posts" voteScore={voteScore} size="large" />
        </Sider>
        <Content>
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
              <a>
                <Tooltip title="Delete Post">
                  <Icon type="delete" />
                </Tooltip>
              </a>
            ]}
          >
            <p>{body}</p>
          </Card>

          <Layout>
            <Content>Comments Component Placeholder ({commentCount})</Content>
          </Layout>
        </Content>
        <Sider style={{ background: 'white' }} />
      </Layout>
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
  // deleted: '',
  commentCount: 0
};

PostDetails.propTypes = {
  match: PropTypes.object.isRequired,
  currentPostLoading: PropTypes.bool.isRequired,
  fetchCurrentPost: PropTypes.func.isRequired,
  resetCurrentPost: PropTypes.func.isRequired,
  id: PropTypes.string,
  timestamp: PropTypes.number,
  title: PropTypes.string,
  body: PropTypes.string,
  author: PropTypes.string,
  category: PropTypes.string,
  voteScore: PropTypes.number,
  // deleted: PropTypes.bool,
  commentCount: PropTypes.number
};

const mapStateToProps = ({ currentPost, meta }) => ({
  currentPostLoading: meta.currentPostLoading,
  ...currentPost
});

const mapDispatchToProps = dispatch => ({
  resetCurrentPost: () => dispatch(resetCurrentPost()),
  fetchCurrentPost: postId => dispatch(fetchCurrentPost(postId))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);
