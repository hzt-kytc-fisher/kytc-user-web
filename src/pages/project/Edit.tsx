import React from 'react';

import { Form, Input, Modal, Row, Col, Switch, Select, Radio, TreeSelect,Select } from 'antd';

import { connect } from 'dva';

import * as CookieUtils from '../../utils/cookie';

@Form.create()
@connect(({ project, loading }) => ({
  project: project,
  loading: loading.models.project,
}))
class ProjectEditComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onSuccess: null,
      repository: [],
      treeData:[],
      chandaoId:null,
      plan:"",
      source:"",
      fisheyeUser:[]
    };
    const { dispatch } = this.props;
    var that = this;
    dispatch({
      type: 'project/listGitRepository',
      payload: {},
      callback: data => {
        that.setState({
          repository: data,
        });
      },
    });
    dispatch({
      type: 'project/taskDropList',
      payload: {},
      callback: data => {
        console.log(data)
        that.setState({
          treeData: data,
        });
      },
    });
    dispatch({
      type: 'project/listFisheyeUser',
      payload: {},
      callback: data => {
        that.setState({
          fisheyeUser: data,
        });
      },
    });
  }
  onCreated = () => {
    const form = this.props.form;
    const { dispatch, onSuccess } = this.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      values.branchNo = values.source;
      values.title = this.state.title;
      values.chandaoId = this.state.chandaoId;
      values.source = this.state.source;
      values.branchSource = "master";
      if (values.id == null) {
        dispatch({
          type: 'project/addProject',
          payload: { ...values },
          callback: () => {
            onSuccess && onSuccess();
          },
        });
      } else {
        dispatch({
          type: 'project/editProject',
          payload: { ...values },
          callback: () => {
            onSuccess && onSuccess();
          },
        });
      }
    });
  };
  listRepository = () => {
    const { dispatch } = this.props;
    var that = this;
    dispatch({
      type: 'project/listGitRepository',
      payload: {},
      callback: data => {
        that.setState({
          repository: data,
        });
      },
    });
  };
  onChange = (value1,value2) =>{
    const form = this.props.form;
    this.setState({
      chandaoId: value2.props.value,
      plan:value2.props.plan,
      source:value2.props.url,
      title:value2.props.title
    });
    form.setFieldsValue({publishPlan: value2.props.plan})
  }
  onSwitchChange = (checked) =>{
    const form = this.props.form;
    dispatch({
      type: 'project/taskDropList',
      payload: {all:checked},
      callback: data => {
        that.setState({
          treeData: data,
        });
      },
    });
  }
  render() {
    const username = CookieUtils.getCookie('username');
    const { visible, form, record, onCancel, repository,treeData } = this.props;
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
        title={record == null ? '新增' : '修改'}
        okText="确认"
        width={600}
        onCancel={onCancel}
        confirmLoading={this.props.loading}
        onOk={this.onCreated}
      >
        <Form {...FormItemLayout}>
          <Row>
            <Col sm={24}>
              <Form.Item label={
                <span>
                  禅道任务&nbsp;
                  <Switch onChange={this.onSwitchChange} />
                </span>
              }>
                {getFieldDecorator('source', {
                  rules: [
                    {
                      required: true,
                      message: '请选择禅道任务!',
                    },
                  ],
                })(
                  <Select
                    style={{ width: 250 }}
                    dropdownStyle={{ maxHeight: 400,maxWidth: 390 }}
                    dropdownMenuStyle={{maxWidth: 390 }}
                    placeholder="请选择禅道任务"
                    dropdownMatchSelectWidth={false}
                    onChange = {this.onChange} 
                    showSearch
                    filterOption={(input, option) =>{
                      return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }}
                  >
                    {this.state.treeData.map(function(data) {
                      return (
                        <Select.Option value={data.id} key={data.value} {...data}>
                          {data.title}
                        </Select.Option>
                      );
                    })}
                  </Select>
                )}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {getFieldDecorator('index', {
                    initialValue:"1"
                  })(
                    <Select style={{ width: 90 }}>
                      <Select.Option value="1">第1次</Select.Option>
                      <Select.Option value="2">第2次</Select.Option>
                      <Select.Option value="3">第3次</Select.Option>
                      <Select.Option value="4">第4次</Select.Option>
                      <Select.Option value="5">第5次</Select.Option>
                      <Select.Option value="6">第6次</Select.Option>
                      <Select.Option value="7">第7次</Select.Option>
                      <Select.Option value="8">第8次</Select.Option>
                      <Select.Option value="9">第9次</Select.Option>
                      <Select.Option value="10">第10次</Select.Option>
                    </Select>
                  )}
              </Form.Item>
            </Col>
            <Col sm={24}>
              <Form.Item label="发版计划">
                {getFieldDecorator('publishPlan', {
                  rules: [
                    {
                      required: true,
                      message: '请输入发版计划!',
                    },
                  ],
                })(<Input/>)}
              </Form.Item>
            </Col>
            <Col sm={24}>
              <Form.Item label="项目">
                {getFieldDecorator('serviceNames', {
                  rules: [
                    {
                      required: true,
                      message: '请选择项目!',
                    },
                  ],
                  initialValue: [],
                })(
                  <Select
                    mode="multiple"
                    size="default"
                    tokenSeparators={[',']}
                    placeholder="请选择项目"
                    style={{ width: '100%' }}
                  >
                    {this.state.repository.map(function(data) {
                      return (
                        <Select.Option value={data.name} key={data.name}>
                          {data.displayName}
                        </Select.Option>
                      );
                    })}
                  </Select>,
                )}
              </Form.Item>
            </Col>
            <Col sm={24}>
              <Form.Item label="审核人">
                {getFieldDecorator('reviewPersonArr', {
                  rules: [
                    {
                      required: true,
                      message: '请选择审核人!',
                    },
                  ],
                  initialValue: [],
                })(
                  <Select
                    mode="multiple"
                    size="default"
                    tokenSeparators={[',']}
                    placeholder="请选择审核人"
                    style={{ width: '100%' }}
                  >
                    {this.state.fisheyeUser.map(function(data) {
                      return (
                        <Select.Option value={data.userName} key={data.userName} disabled={username===data.userName}>
                          {data.displayName}
                        </Select.Option>
                      );
                    })}
                  </Select>,
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}
export default ProjectEditComponent;
