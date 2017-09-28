import React, { Component } from 'react';
import { Layout, Menu, Icon, Col } from 'antd';
const { SubMenu } = Menu;
const { Header, Content,/* Footer,*/ Sider } = Layout;
import { Link } from 'react-router-dom';
const MenuItem = Menu.Item;
import { PropTypes} from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';


import './css/app.css';
import './css/main.css'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: false,
    };
  }

  static propTypes = {
    // cookies: instanceOf(Cookies).isRequired,
    children: PropTypes.array,
  }

  onCollapse = (collapsed) =>{
    this.setState({ collapsed });
  }

  render() {
    return (
      <Layout style={{ height: '100%', width: '100%' }}>
        <Sider
          collapsible
          // defaultCollapsed
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
          // collapsedWidth={0}
        >
          <div className="logo">Rock</div>
          <Menu 
            theme="dark" 
            defaultSelectedKeys={['1']} 
            defaultOpenKeys={['sub1','sub2','sub3','sub4']}
            mode="inline"
          >

            <MenuItem key="1">
              <Link to='/home'><Icon type="desktop" /><span>Home</span>
              </Link>
            </MenuItem>

            <SubMenu
              key="sub1"
              title={<span><Icon type="file" /><span>项目</span></span>}
            >
              
              <MenuItem key="2"><Link to='/page1'>添加项目</Link></MenuItem>
              <MenuItem key="3"><Link to='/page2'>项目列表</Link></MenuItem>
            </SubMenu>

          </Menu>
        </Sider>

        <Layout style={{}}>
          <Header className="header">
            <Col style={{ color: '#fff', fontSize: 20 }} span={12} >React-Redux-Startkit</Col>
          </Header>
          <Content style={{ background: '#fff', padding: 24, margin: 0 }}>
            {this.props.children}
          </Content>
          {/*<Footer style={{textAlign: 'center'}}>
               Mijia ©2017 Created by Mijia UED
            </Footer>*/}
        </Layout>

      </Layout>

    )
  }
}

export default withCookies(App);