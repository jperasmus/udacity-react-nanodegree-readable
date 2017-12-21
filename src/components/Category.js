import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from 'antd/lib/button';
import { Menu, Dropdown, Icon, message, Layout, Row, Col } from 'antd';
import get from 'lodash.get';
import capitalize from 'lodash.capitalize';

import Posts from './Posts';

import { fetchCategories, fetchPosts } from '../actions';

class Category extends Component {
  constructor(props) {
    super(props);

    this.menu = (
      <Menu onClick={this.filterPostsChange}>
        <Menu.Item key="voteScore_asc">Vote score (smallest first)</Menu.Item>
        <Menu.Item key="voteScore_desc">Vote score (biggest first)</Menu.Item>
        <Menu.Item key="timestamp_asc">Date (earliest)</Menu.Item>
        <Menu.Item key="timestamp_desc">Date (latest)</Menu.Item>
        <Menu.Item key="title_asc">Title (a-z)</Menu.Item>
        <Menu.Item key="title_desc">Title (z-a)</Menu.Item>
      </Menu>
    );
  }

  componentDidMount() {
    this.props
      .fetchCategories()
      .then(() => this.props.fetchPosts(get(this.props, 'match.params.category')))
      .catch(error => message.error(`An error occurred while fetching the posts.\nDetails: ${error}`, 5));
  }

  filterPostsChange = ({ key }) => {
    message.info(`Click on item ${key}`);
  };

  routeToCategory = link => {
    this.context.router.history.push(link);
  };

  render() {
    const { categories, posts, match } = this.props;
    const { category } = match.params;

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
                <Dropdown overlay={this.menu} placement="bottomRight">
                  <a className="ant-dropdown-link" href="#">
                    Sort by <Icon type="down" />
                  </a>
                </Dropdown>
              </Col>
            </Row>
          </Layout.Header>

          <Layout.Content>
            <Posts posts={posts} category={category} />
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
  fetchCategories: PropTypes.func.isRequired,
  fetchPosts: PropTypes.func.isRequired
};

const mapStateToProps = ({ categories, posts }) => ({
  categories,
  posts
});

const mapDispatchToProps = dispatch => ({
  fetchCategories: () => dispatch(fetchCategories()),
  fetchPosts: category => dispatch(fetchPosts(category))
});

export default connect(mapStateToProps, mapDispatchToProps)(Category);
