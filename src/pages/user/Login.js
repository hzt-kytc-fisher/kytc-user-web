import React, { Fragment } from 'react';

import { connect } from 'dva';

import { Link } from 'umi';

import { Card, Icon,Button,Modal,Divider,Table,Form,Input, Checkbox } from 'antd';

import { UserOutlined, LockOutlined } from '@ant-design/icons';

@connect(({ userManager, loading }) => ({
	userManager: userManager,
	loading: loading.models.userManager,
  }))
@Form.create()
export default class LoginPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			record: null,
			searchForm:null,
			detailVisible:false
		}
	}
	handleSubmit = e => {
		e.preventDefault();
		const form = this.props.form;
		const { dispatch, onSuccess, history } = this.props;
		this.props.form.validateFields((err, values) => {
		  console.log(err,values)
		  var that = this;
        dispatch({
          type: 'userManager/userLogin',
          payload: { ...values },
          callback: (data) => {
			  console.log(data)
				history.push({pathname: '/user/index'})
          },
        });
    });
	  };
	render() {
		const layout = {
			labelCol: { span: 10 },
			wrapperCol: { span: 6 },
		  };
		  const tailLayout = {
			wrapperCol: { offset: 10, span: 6 },
		  };
		  const { getFieldDecorator } = this.props.form;
	return (
		<Form
			{...layout}
			name="basic"
			onSubmit={this.handleSubmit} 
			className="login-form"
			>
			<Form.Item label="用户名:">
				{getFieldDecorator('userName', {
					rules: [{ required: true, message: '请输入用户名!' }],
				})(
					<Input
					prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
					placeholder="用户名"
					/>,
				)}
			</Form.Item>

			<Form.Item label="密码:">
				{getFieldDecorator('userPwd', {
					rules: [{ required: true, message: '请输入密码!' }],
				})(
					<Input.Password
					prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
					type="password"
					placeholder="密码"
					/>,
				)}
			</Form.Item>

			<Form.Item {...tailLayout} name="remember" valuepropname="checked">
				{getFieldDecorator('remember', {
					valuePropName: 'checked',
					initialValue: true,
				})(<Checkbox>记住我</Checkbox>)}
			</Form.Item>

			<Form.Item {...tailLayout}>
				<Button type="primary" htmlType="submit">
				登录
				</Button>
			</Form.Item>
		</Form>
		);
	}
}
