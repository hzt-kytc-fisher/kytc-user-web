import { Alert, Result } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';

import { Dispatch, AnyAction } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { connect } from 'dva';
import { StateType } from '@/models/login';
import LoginComponents from './components/Login';
import styles from './style.less';
import { LoginParamsType } from '@/services/login';
import { ConnectState } from '@/models/connect';
import { red } from 'color-name';

const { UserName, Password, Submit } = LoginComponents;

interface LoginProps {
  dispatch: Dispatch<AnyAction>;
  userLogin: StateType;
  submitting: boolean;
}
interface LoginState {
  type: string;
  autoLogin: boolean;
  error: string;
}

@connect(({ login, loading }: ConnectState) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))
class Login extends Component<LoginProps, LoginState> {
  loginForm: FormComponentProps['form'] | undefined | null = undefined;

  state: LoginState = {
    type: 'account',
    autoLogin: true,
    error: '',
  };

  handleSubmit = (err: unknown, values: LoginParamsType) => {
    const { type } = this.state;
    if (!err) {
      const { dispatch, history } = this.props;
      var that = this;
      dispatch({
        type: 'login/login',
        payload: {
          ...values,
          type,
        },
        callback: function(data) {
          console.log('login', data);
          if (data.code === '200') {
          } else {
            that.setState({
              error: data.reason,
            });
          }
        },
      });
    }
  };

  renderMessage = (content: string) => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );

  render() {
    const { submitting } = this.props;
    return (
      <div className={styles.main}>
        <LoginComponents
          onSubmit={this.handleSubmit}
          onCreate={(form?: FormComponentProps['form']) => {
            this.loginForm = form;
          }}
        >
          <UserName
            name="username"
            placeholder={`${formatMessage({ id: 'user-login.login.userName' })}`}
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'user-login.userName.required' }),
              },
            ]}
          />
          <Password
            name="userpwd"
            placeholder={`${formatMessage({ id: 'user-login.login.password' })}`}
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'user-login.password.required' }),
              },
            ]}
            onPressEnter={e => {
              e.preventDefault();
              if (this.loginForm) {
                this.loginForm.validateFields(this.handleSubmit);
              }
            }}
          />
          <label style={{ color: 'red', textAlign: 'center' }}>{this.state.error}</label>
          <Submit loading={submitting}>
            <FormattedMessage id="user-login.login.login" />
          </Submit>
        </LoginComponents>
      </div>
    );
  }
}

export default Login;
