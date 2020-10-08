import React from 'react';

import { Form, Input, Button, Row, Col } from 'antd';

@Form.create()
class UserSearchForm extends React.Component {
  componentDidMount() {
		const {
			form,
			handleSearchData,
		} = this.props;
		handleSearchData && handleSearchData(form);
	}
	handleSearch = e => {
    console.log("sousuo")
		const { form, handleSearchData } = this.props;
		e.preventDefault();
		form.validateFields((err, fieldsValue) => {
			if (err) {
				return;
			}
			handleSearchData && handleSearchData(form);
		});
	};
	handleFormReset = () => {
		const { form, handleSearchData } = this.props;
		form.resetFields();
		handleSearchData && handleSearchData(form);
	};
	render() {
		const { getFieldDecorator } = this.props.form;
		return (<Form layout="inline" onSubmit={this.handleSearch}>
			<Row gutter={{ md: 8, lg: 24, xl: 48 }}>
				<Col md={8} sm={24}>
					<Form.Item label="用户名">
						{getFieldDecorator('username',{
							initialValue:''
						})(
						<Input/>)}
					</Form.Item>
				</Col>
				<Col md={8} sm={24}>
					<Form.Item label="用户昵称">
						{getFieldDecorator('nickName',{
							initialValue:''
						})(
						<Input/>)}
					</Form.Item>
				</Col>
				<Col md={8} sm={24}>
					<Form.Item label="头像">
						{getFieldDecorator('headPicture',{
							initialValue:''
						})(
						<Input/>)}
					</Form.Item>
				</Col>
				<Col md={8} sm={24}>
					<Form.Item label="身份证号">
						{getFieldDecorator('idCard',{
							initialValue:''
						})(
						<Input/>)}
					</Form.Item>
				</Col>
				<Col md={8} sm={24}>
					<Form.Item label="是否启用">
						{getFieldDecorator('enabled',{
							initialValue:''
						})(
						<Input/>)}
					</Form.Item>
				</Col>
				<Col md={8} sm={24}>
					<Form.Item label="手机号">
						{getFieldDecorator('mobile',{
							initialValue:''
						})(
						<Input/>)}
					</Form.Item>
				</Col>
				<Col md={8} sm={24}>
					<Form.Item label="是否删除">
						{getFieldDecorator('isDeleted',{
							initialValue:''
						})(
						<Input/>)}
					</Form.Item>
				</Col>
				<Col md={8} sm={24}>
					<Form.Item label="注册时间">
						{getFieldDecorator('registerTime',{
							initialValue:''
						})(
						<Input/>)}
					</Form.Item>
				</Col>
				<Col md={8} sm={24}>
					<span>
						<Button type="primary" htmlType="submit">
							查询
						</Button>
						<Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
							重置
						</Button>
					</span>
				</Col>
			</Row>
		</Form>)
	}
}

export default UserSearchForm;
