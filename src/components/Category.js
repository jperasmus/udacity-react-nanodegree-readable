import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from 'antd/lib/button';
import { Menu, Dropdown, Icon, message, Layout, Row, Col } from 'antd';
import get from 'lodash.get';
import capitalize from 'lodash.capitalize';
import Posts from './Posts';
import Loader from './Loader';
import { fetchPosts, resetPosts, updatePostSortBy, updatePostSortDirection } from '../actions';

const SORT_BY_MAP = {
  voteScore: 'Vote score',
  timestamp: 'Recently Added',
  title: 'Title',
  commentCount: 'Number of Comments'
};

class Category extends Component {
  componentDidMount() {
    this.props
      .fetchPosts(get(this.props, 'match.params.category'))
      .catch(error => message.error(`An error occurred while fetching the posts.\nDetails: ${error}`, 5));
  }

  componentWillReceiveProps(nextProps) {
    const currentCategory = get(this.props, 'match.params.category');
    const nextCategory = get(nextProps, 'match.params.category');

    if (currentCategory !== nextCategory) {
      this.props.fetchPosts(nextCategory);
    }
  }

  componentWillUnmount() {
    this.props.resetPosts();
  }

  handleSortByChange = ({ key }) => {
    this.props.updateSortBy(key);
  };

  handleSortDirectionChange = ({ key }) => {
    this.props.updateSortDirection(key);
  };

  routeToCategory = link => {
    this.context.router.history.push(link);
  };

  sortPosts = posts => {
    const clone = posts.slice();
    const { sortBy, sortDirection } = this.props;

    const sortedPosts = clone.sort((a, b) => {
      const valueA = a[sortBy];
      const valueB = b[sortBy];

      if (valueA < valueB) {
        return -1;
      }

      if (valueA > valueB) {
        return 1;
      }

      return 0;
    });

    if (sortDirection === 'descending') {
      return sortedPosts.reverse();
    }

    return sortedPosts;
  };

  render() {
    const { categories, posts, match, postsLoading, sortBy, sortDirection } = this.props;
    const { category } = match.params;

    const sortByOptions = (
      <Menu onClick={this.handleSortByChange} selectedKeys={[sortBy]}>
        <Menu.Item key="voteScore">{SORT_BY_MAP.voteScore}</Menu.Item>
        <Menu.Item key="timestamp">{SORT_BY_MAP.timestamp}</Menu.Item>
        <Menu.Item key="title">{SORT_BY_MAP.title}</Menu.Item>
        <Menu.Item key="commentCount">{SORT_BY_MAP.commentCount}</Menu.Item>
      </Menu>
    );

    const sortDirectionOptions = (
      <Menu onClick={this.handleSortDirectionChange} selectedKeys={[sortDirection]}>
        <Menu.Item key="ascending">Ascending</Menu.Item>
        <Menu.Item key="descending">Descending</Menu.Item>
      </Menu>
    );

    return (
      <div>
        <Layout>
          <Layout.Header>
            <Row type="flex" justify="space-between">
              <Col>
                <Button.Group>
                  <Button
                    key="category_all"
                    onClick={() => this.routeToCategory('/')}
                    type={!category ? 'primary' : 'default'}
                    icon="home"
                  />
                  {categories.map(cat => (
                    <Button
                      key={`category_${cat.name}`}
                      type={category === cat.path ? 'primary' : 'default'}
                      onClick={() => this.routeToCategory(`/${cat.path}`)}
                    >
                      {capitalize(cat.name)}
                    </Button>
                  ))}
                </Button.Group>
              </Col>

              <Col>
                <Dropdown overlay={sortByOptions} placement="bottomRight">
                  <a className="ant-dropdown-link" href="#">
                    Sort by ({SORT_BY_MAP[sortBy]})<Icon type="down" />
                  </a>
                </Dropdown>
                <Dropdown overlay={sortDirectionOptions} placement="bottomRight">
                  <a className="ant-dropdown-link" href="#" style={{ marginLeft: 10 }}>
                    {capitalize(sortDirection)}{' '}
                    <Icon type={sortDirection === 'ascending' ? 'arrow-down' : 'arrow-up'} />
                  </a>
                </Dropdown>
              </Col>
            </Row>
          </Layout.Header>

          <Layout.Content>
            {postsLoading ? (
              <Loader text="Loading Posts" />
            ) : (
              <Posts posts={this.sortPosts(posts)} category={category} />
            )}
          </Layout.Content>
        </Layout>
      </div>
    );
  }
}

Category.contextTypes = {
  router: PropTypes.object.isRequired
};

Category.defaultProps = {
  categories: [],
  posts: []
};

Category.propTypes = {
  match: PropTypes.object.isRequired,
  categories: PropTypes.array,
  posts: PropTypes.array,
  postsLoading: PropTypes.bool.isRequired,
  sortBy: PropTypes.string.isRequired,
  sortDirection: PropTypes.string.isRequired,
  resetPosts: PropTypes.func.isRequired,
  fetchPosts: PropTypes.func.isRequired,
  updateSortBy: PropTypes.func.isRequired,
  updateSortDirection: PropTypes.func.isRequired
};

const mapStateToProps = ({ categories, posts, meta }) => ({
  postsLoading: meta.postsLoading,
  sortBy: meta.postsSortBy,
  sortDirection: meta.postsSortDirection,
  categories,
  posts
});

const mapDispatchToProps = dispatch => ({
  resetPosts: () => dispatch(resetPosts()),
  fetchPosts: category => dispatch(fetchPosts(category)),
  updateSortBy: value => dispatch(updatePostSortBy(value)),
  updateSortDirection: value => dispatch(updatePostSortDirection(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Category);
