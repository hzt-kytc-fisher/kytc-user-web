import React from 'react';

import { Form,Descriptions, Modal} from 'antd';

@Form.create()
class UserInfoDetailComponent extends React.Component {
	render() {
		const { visible, record, onCancel } = this.props;
		return (
			<Modal
				visible={visible}
				title={`用户基本信息详情`}
				width={600}
				footer={null}
				onCancel={onCancel}>
				<Descriptions bordered border column={2} size="small">
					<Descriptions.Item label="主键">{record==null?null:record.id}</Descriptions.Item>
					<Descriptions.Item label="用户名">{record==null?null:record.username}</Descriptions.Item>
					<Descriptions.Item label="用户昵称">{record==null?null:record.nickName}</Descriptions.Item>
					<Descriptions.Item label="头像">{record==null?null:record.headPicture}</Descriptions.Item>
					<Descriptions.Item label="身份证号">{record==null?null:record.idCard}</Descriptions.Item>
					<Descriptions.Item label="是否启用">{record==null?null:record.enabled}</Descriptions.Item>
					<Descriptions.Item label="手机号">{record==null?null:record.mobile}</Descriptions.Item>
					<Descriptions.Item label="是否删除">{record==null?null:record.isDeleted}</Descriptions.Item>
					<Descriptions.Item label="注册时间">{record==null?null:record.registerTime}</Descriptions.Item>
					<Descriptions.Item label="创建人员">{record==null?null:record.createdBy}</Descriptions.Item>
					<Descriptions.Item label="创建日期">{record==null?null:record.createdAt}</Descriptions.Item>
					<Descriptions.Item label="修改人员">{record==null?null:record.updatedBy}</Descriptions.Item>
					<Descriptions.Item label="修改日期">{record==null?null:record.updatedAt}</Descriptions.Item>
				</Descriptions>
			</Modal>
		);
	}
}
export default UserInfoDetailComponent;
