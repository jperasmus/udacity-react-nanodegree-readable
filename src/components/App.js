import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout, Menu, Icon, message } from 'antd';
import { fetchCategories } from '../actions';
import Loader from './Loader';
import NotFound from './NotFound';
import Category from './Category';
import AddEditPost from './AddEditPost';
import PostDetails from './PostDetails';
import './App.css';

const { Header, Content, Footer } = Layout;

class App extends Component {
  componentDidMount() {
    this.props
      .fetchCategories()
      .catch(error => message.error(`An error occurred while fetching the categories.\nDetails: ${error}`, 5));
  }

  render() {
    if (this.props.categoriesLoading) {
      return <Loader text="Loading Categories" />;
    }

    return (
      <Layout>
        <Header className="header" style={{ position: 'fixed', width: '100%', zIndex: 2 }}>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} style={{ lineHeight: '64px' }}>
            <Menu.Item key="home">
              <Link to="/">
                <Icon type="home" />Readable
              </Link>
            </Menu.Item>
            <Menu.Item key="add-post">
              <Link to="/add-post">
                <Icon type="plus-square-o" />Add Post
              </Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px', marginTop: 64, minHeight: 'calc(100vh - 134px)' }}>
          <Layout style={{ padding: '24px 0', background: '#fff', marginBottom: 64 }}>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              <Switch>
                <Route exact path="/" component={Category} />
                <Route exact path="/add-post" component={AddEditPost} />
                <Route exact path="/:category/:post_id/edit" component={AddEditPost} />
                <Route exact path="/:category/:post_id" component={PostDetails} />
                <Route exact path="/:category" component={Category} />
                <Route component={NotFound} />
              </Switch>
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center', position: 'fixed', width: '100%', zIndex: 2, bottom: 0 }}>
          Readable © 2017 Created by{' '}
          <a href="https://jperasmus.me" target="_blank" rel="noopener noreferrer">
            JP Erasmus
          </a>
        </Footer>
      </Layout>
    );
  }
}

App.propTypes = {
  categoriesLoading: PropTypes.bool.isRequired,
  fetchCategories: PropTypes.func.isRequired
};

const mapStateToProps = ({ meta }) => ({
  categoriesLoading: meta.categoriesLoading
});

const mapDispatchToProps = dispatch => ({
  fetchCategories: () => dispatch(fetchCategories())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
