import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';

import NotFound from './NotFound';
import Category from './Category';
import NewPost from './NewPost';
import PostDetails from './PostDetails';
import './App.css';

const { Header, Content, Footer } = Layout;

class App extends Component {
  render() {
    return (
      <Layout>
        <Header className="header">
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
        <Content style={{ padding: '0 50px' }}>
          <Layout style={{ padding: '24px 0', background: '#fff' }}>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              <Switch>
                <Route exact path="/" component={Category} />
                <Route exact path="/add-post" component={NewPost} />
                <Route exact path="/:category" component={Category} />
                <Route exact path="/:category/:post_id" component={PostDetails} />
                <Route component={NotFound} />
              </Switch>
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Readable © 2017 Created by{' '}
          <a href="https://jperasmus.me" target="_blank" rel="noopener noreferrer">
            JP Erasmus
          </a>
        </Footer>
      </Layout>
    );
  }
}

export default App;
