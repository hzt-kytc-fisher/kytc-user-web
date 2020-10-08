import React from 'react';

import { Form, Input, Modal, Row, Col, DatePicker, Select } from 'antd';

import { connect } from 'dva';

@Form.create()
@connect(({ project, loading }) => ({
  project: project,
  loading: loading.models.project,
}))
class ProjectUpdateComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onSuccess: null,
      type: null,
    };
  }
  onOk = () => {
    const form = this.props.form;
    const { dispatch, onSuccess, type } = this.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      var that = this;
      console.log(values);
      if (type == 'cr') {
        dispatch({
          type: 'project/updateCr',
          payload: { ...values },
          callback: () => {
            onSuccess && onSuccess();
          },
        });
      } else if (type == 'branch') {
        dispatch({
          type: 'project/addBranch',
          payload: { ...values },
          callback: () => {
            onSuccess && onSuccess();
          },
        });
      }
    });
  };

  render() {
    const { visible, form, record, onCancel, type } = this.props;
    const { getFieldDecorator } = form;
    let serviceNames = [
      'open-trade-sdk-center',
      'open-trade-data-center',
      'open-trade-listener-center',
    ];
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
    const config = {
      rules: [{ type: 'object', required: true, message: 'Please select date!' }],
    };
    return (
      <Modal
        visible={visible}
        title={type == 'cr' ? '设置CR' : '添加项目'}
        okText="确认"
        width={600}
        onCancel={onCancel}
        confirmLoading={this.props.loading}
        onOk={this.onOk}
      >
        <Form {...FormItemLayout}>
          <Form.Item>
            {getFieldDecorator('id', {
              initialValue: record ? record.id : null,
            })(<Input type="hidden" />)}
          </Form.Item>
          <Row>
            <Form.Item label="项目名称">
              {getFieldDecorator('title', {
                initialValue: record ? record.title : null,
              })(<Input />)}
            </Form.Item>
          </Row>
          {type === 'cr' && (
            <Row>
              <Form.Item label="crno">
                {getFieldDecorator('crno', {
                  initialValue: '',
                })(<Input />)}
              </Form.Item>
            </Row>
          )}
        </Form>
      </Modal>
    );
  }
}
export default ProjectUpdateComponent;
