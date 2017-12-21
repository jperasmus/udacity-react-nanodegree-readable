import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

import NotFound from './NotFound';
import Category from './Category';
import './App.css';

// const ButtonGroup = Button.Group;

// const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

class App extends Component {
  render() {
    return (
      <Layout>
        <Header className="header">
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="home">Readable</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Layout style={{ padding: '24px 0', background: '#fff' }}>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              <Switch>
                <Route exact path="/" component={Category} />
                <Route exact path="/category/:category" component={Category} />
                <Route component={NotFound} />
              </Switch>
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Readable ©2017 Created by JP Erasmus</Footer>
      </Layout>
    );
  }
}

export default App;
