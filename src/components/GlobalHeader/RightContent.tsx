import React from 'react';
import { connect } from 'dva';
import { ConnectProps, ConnectState } from '@/models/connect';

import { Menu, Dropdown, Icon, Button } from 'antd';
import styles from './index.less';
import * as CookieUtils from '@/utils/cookie';

export type SiderTheme = 'light' | 'dark';
export interface GlobalHeaderRightProps extends ConnectProps {
  theme?: SiderTheme;
  layout: 'sidemenu' | 'topmenu';
}

const GlobalHeaderRight: React.SFC<GlobalHeaderRightProps> = props => {
  const { theme, layout } = props;
  let className = styles.right;
  const nickName = CookieUtils.getCookie('nickname');
  if (theme === 'dark' && layout === 'topmenu') {
    className = `${styles.right}  ${styles.dark}`;
  }
  function handleLoginout() {
    const { dispatch } = props;
    dispatch({
      type: 'login/logout',
    });
  }
  const menu = (
    <Menu>
      <Menu.Item>
        <a onClick={handleLoginout} href="javascript:void(0)">
          退出登录
        </a>
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={menu} className={className}>
      <a className="ant-dropdown-link" href="#">
        {nickName} <Icon type="down" />
      </a>
    </Dropdown>
  );
};

export default connect(({ login, settings }: ConnectState) => ({
  theme: settings.navTheme,
  layout: settings.layout,
  login: login,
}))(GlobalHeaderRight);
