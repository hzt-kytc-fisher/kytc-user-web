import React from 'react';

import { Form, Input, Modal, Row, Radio, Col } from 'antd';

import { connect } from 'dva';
import { Link } from 'umi';

@Form.create()
@connect(({ project, loading }) => ({
  project: project,
  loading: loading.models.project,
}))
class ProjectMergeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onSuccess: null,
      type: null,
      other: false,
      onCancel: null,
      selectedRows: [],
    };
  }
  onOk = (e) => {
    console.log(111);
    const form = this.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.onMerge(e,values.originalBranch, values.targetBranch);
    });
  };
  onMerge = (e,originalBranch, targetBranch) => {
    const { dispatch, onSuccess, selectedRows } = this.props;
    let ids = new Array();
    selectedRows.map(item => {
      ids.push(item.id);

    });
    console.log("111",ids,targetBranch,originalBranch)
    dispatch({
      type: 'project/mergeExceptionProject',
      payload: {
        ids: ids,
        targetbranch: targetBranch,
        originalBranch: originalBranch,
      },
      callback: () => {
        console.log(111)
        onSuccess && onSuccess();
        console.log(222)
      },
    });
  };
  render() {
    const { visible, form, record, onCancel } = this.props;

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
        title="合并到"
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
            <Col md={12} sm={24}>
              <span>开发分支到提测</span>
            </Col>
            <Col md={12} sm={24}>
              <Link to="" onClick={e => this.onMerge(e, 'pre-test', 'test')}>
                >>合并
              </Link>
            </Col>
          </Row>
          <Row>
            <Col md={12} sm={24}>
              <span>提测分支到master</span>
            </Col>
            <Col md={12} sm={24}>
              <Link to="" onClick={e => this.onMerge(e, 'test', 'master')}>
                >>合并
              </Link>
            </Col>
          </Row>
          <Row>
            <Col md={12} sm={24}>
              <Form.Item label="源分支">
                {getFieldDecorator('originalBranch', {
                  rules: [
                    {
                      required: true,
                      message: '请输入源分支!',
                    },
                  ],
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col md={12} sm={24}>
              <Form.Item label="目标分支">
                {getFieldDecorator('targetBranch', {
                  rules: [
                    {
                      required: true,
                      message: '请输入目标分支!',
                    },
                  ],
                })(<Input />)}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}
export default ProjectMergeComponent;
