import React from 'react';

import { Form, Input, Select,Modal, Row,Col} from 'antd';

import { connect } from 'dva';

@Form.create()
@connect(({ userManager, loading }) => ({
	user_info: userManager,
	loading: loading.models.userManager,
}))
class UserEditComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			onSuccess:null
		}
	}
	onCreated = () => {
		const form = this.props.form;
		const { dispatch, onSuccess } = this.props;
		form.validateFields((err, values) => {
			if (err) {
				return;
			}
			var that = this;
			if(values.id==null){
				dispatch({
					type: "userManager/addUserInfo",
					payload:{...values},
					callback:()=>{
						onSuccess && onSuccess();
					}
				})
			}else{
				dispatch({
					type: "userManager/updateUser",
					payload:{...values},
					callback:()=>{
						onSuccess && onSuccess();
					}
				})
			}
		})
	}
	render() {
		const { visible, form, record, onCancel,onSuccess } = this.props;
		const { getFieldDecorator } = form;
		const FormItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 8 },
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 16 },
			},
		};
		return (
			<Modal
				visible={visible}
				title={record==null?"新增":"修改"}
				okText="确认"
				width={600}
				onCancel={onCancel}
				onOk={this.onCreated}>
				<Form {...FormItemLayout}>
					<Form.Item>
						{getFieldDecorator('id', {
							initialValue: record ? record.id:null
						})(<Input type="hidden"/>)}
            {getFieldDecorator('enabled', {
							initialValue: record ? record.enabled:null
						})(<Input type="hidden"/>)}
            {getFieldDecorator('isDeleted', {
							initialValue: record ? record.isDeleted:null
						})(<Input type="hidden"/>)}
					</Form.Item>
					<Row>
						<Col sm={12}>
							<Form.Item label="用户名">
								{getFieldDecorator('username',{
									initialValue:record ? record.username:'',
								})(
								<Input/>)}
							</Form.Item>
						</Col>
						<Col sm={12}>
							<Form.Item label="用户昵称">
								{getFieldDecorator('nickName',{
									initialValue:record ? record.nickName:'',
								})(
								<Input/>)}
							</Form.Item>
						</Col>
						<Col sm={12}>
							<Form.Item label="头像">
								{getFieldDecorator('headPicture',{
									initialValue:record ? record.headPicture:'',
								})(
								<Input/>)}
							</Form.Item>
						</Col>
						<Col sm={12}>
							<Form.Item label="身份证号">
								{getFieldDecorator('idCard',{
									initialValue:record ? record.idCard:'',
								})(
								<Input/>)}
							</Form.Item>
						</Col>
						<Col sm={12}>
							<Form.Item label="手机号">
								{getFieldDecorator('mobile',{
									initialValue:record ? record.mobile:'',
								})(
								<Input/>)}
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</Modal>
		);
	}
}
export default UserEditComponent;
