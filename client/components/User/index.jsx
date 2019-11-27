import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Router from 'next/router'
import { Menu, Dropdown, Icon } from 'antd'
import './index.less'

@inject('user')
@observer
class User extends Component {
  // 登出
  logout = () => {
    localStorage.setItem('token', '')
    Router.push('/login')
    this.props.user.setState({ isLogin: '' })
  }

  // 进入登录页
  login = () => {
    Router.push('/login')
  }

  initMenu = () => {
    const { isLogin } = this.props.user
    if (isLogin) {
      return (
        <Menu>
          <Menu.Item>
            <Icon type="home" />
            <span>我的主页</span>
          </Menu.Item>
          <Menu.Item>
            <Icon type="setting" />
            <span>设置</span>
          </Menu.Item>
          <Menu.Item onClick={this.logout}>
            <Icon type="logout" />
            <span>登出</span>
          </Menu.Item>
        </Menu>
      )
    }
    return (
      <Menu>
        <Menu.Item onClick={this.login}>
          <Icon type="login" />
          <span>登录</span>
        </Menu.Item>
      </Menu>
    )
  }

  render() {
    const { isLogin } = this.props.user
    return (
      <>
        {!isLogin && (
          <Dropdown overlay={this.initMenu()} trigger={['click']}>
            <Icon type="user" className="global-user"/>
          </Dropdown>
        )}
        {isLogin && (
          <Dropdown overlay={this.initMenu()} trigger={['click']}>
            <img src="/static/user-test.png" alt="user-icon" className="login-user"/>
          </Dropdown>
        )}
      </>
    )
  }
}

export default User
