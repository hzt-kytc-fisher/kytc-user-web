import React, { Fragment } from 'react';

import { connect } from 'dva';

import { Card, Icon, Button, Table, Card, Icon, Button, Table, Tag,Popover,Modal } from 'antd';

import { Link } from 'umi';

import ProjectSearchForm from './Search';

import ProjectEditComponent from './Edit';

import ProjectUpdateComponent from './Update';

import ProjectMergeComponent from './Merge';

import * as CookieUtils from '../../utils/cookie';

@connect(({ project, loading }) => ({
  project: project,
  loading: loading.models.project,
}))
export default class ProjectPage extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      visible: false,
      record: null,
      searchForm: null,
      detailVisible: false,
      data: [],
      pagination: {},
      loading: false,
      type: null,
      updateVisible: false,
      mergeVisible: false,
      selectedRows: [],
      merge: false,
    };
  }
  handleSearchData = form => {
    const { dispatch } = this.props;
    this.setState({
      searchForm: form,
    });
    dispatch({
      type: 'project/listProject',
      payload: {
        title: form.getFieldValue('title'),
        publishplan:
          form.getFieldValue('publishPlan'),
        page: 0,
        size: 10,
      },
    });
  };

  searchData = (page, pageSize) => {
    const { dispatch } = this.props;
    const searchForm = this.state.searchForm;
    dispatch({
      type: 'project/listProject',
      payload: {
        title: searchForm.getFieldValue('title'),
        publishPlan: searchForm.getFieldValue('publishPlan'),
        page: page,
        size: pageSize,
      },
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };
  handleEditSuccess = () => {
    this.setState({
      visible: false,
    });
    this.handleSearchData(this.state.searchForm);
  };

  onCancel = () => {
    this.setState({
      visible: false,
      detailVisible: false,
      loading: false,
      updateVisible: false,
      mergeVisible: false,
    });
  };
  handleProject = (e, record) => {
    e.preventDefault();
    this.setState({
      visible: true,
      record: record,
    });
  };
  handleFisheye = (e, record) => {
    e.preventDefault();
    const { dispatch } = this.props;
    let that = this;
    dispatch({
      type: 'project/createFisheye',
      payload: { id: record.id },
      callback: function(){
        that.searchData(0,10)
      }
    });
  };
  onChange = data => {
    this.searchData(data.current - 1, data.pageSize);
  };
  merge1 = (e,record,branch) => {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch({
      type: 'project/merge1Project',
      payload: { id: record.id,targetbranch: branch },
    });
  };
  deleted = (e,record) => {
    e.preventDefault();
    const { dispatch } = this.props;
    let that = this;
    Modal.confirm({
      title: '删除项目?',
      content: '确定要删除项目吗?删除之后该分支代码将丢弃掉',
      onOk() {
        dispatch({
          type: 'project/deleteProject',
          payload: { id: record.id },
          callback: function(){
            that.searchData(0,10)
          }
        })
      },
      onCancel() {
        console.log('Cancel');
      },
    })
  };
  render() {
    const {
      project: { data, page, size, pagination },
    } = this.props;
    const username = CookieUtils.getCookie('username');
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({ selectedRows });
      },
      getCheckboxProps: record => ({
        name: record.name,
      }),
    };
    const columns = [
      {
        title: 'id',
        dataIndex: 'id',
      },
      {
        title: '标题',
        render: record => {
          return (
            <div>
              {record.source != null && record.source.startsWith('http') && (
                <a href={record.source} target="_blank">
                  {record.title}
                </a>
              )}
              {(record.source == null || !record.source.startsWith('http')) && (
                <span>{record.title}</span>
              )}
            </div>
          );
        },
      },
      {
        title: '分支号',
        dataIndex: 'branchNo',
        width: 140,
      },
      {
        title: '发版计划',
        dataIndex: 'publishPlan',
        width: 100,
      },
      {
        title: 'fisheye状态',
        width: 120,
        render: record => {
          return (
            <div>
              {record.fisheyeStatus != null && record.fisheyeStatus === 'Closed' && (
                <Tag color="green">{'close'}</Tag>
              )}
              {record.fisheyeStatus != null && record.fisheyeStatus !== 'Closed' &&(
                <Tag color="red">{record.fisheyeStatus}</Tag>
              )}
            </div>
          );
        },
      },
      {
        title: '合并状态',
        render: record => {
          return (
            <div>
              {record.status != null && record.status === 'close' && (
                <Tag color="green">{'已合并'}</Tag>
              )}
              {record.status != null && record.status !== 'close' && (
                <Tag color="red">{'未合并'}</Tag>
              )}
            </div>
          );
        },
      },
      {
        title: '操作',
        width: 250,
        fixed: 'right',
        render: record => {
          return (
            <div>
              {record.crNo == null && (
                <Link to="" onClick={e => this.handleFisheye(e, record)}>
                  <Icon type="plus" />
                  创建fisheye
                </Link>
              )}
              {record.crNo != null && (
                <a
                  href={`http://172.16.20.217:8060/cru/` + record.crNo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon type="eye" />查看fisheye
                </a>
              )}
              <Popover content={
                <div>
                  <p><Link to="" type="link" onClick={e => this.merge1(e,record,"dev")}>开发(dev)</Link></p>
                  <p><Link to="" type="link" onClick={e => this.merge1(e,record,"test")}>测试(test)</Link></p>
                  <p><Link to="" type="link" onClick={e => this.merge1(e,record,"master")}>上线(master)</Link></p>
                </div>} title="合并到" trigger="click">
                <Button type="link"><Icon type="swap" />合并</Button>
              </Popover>
              {record.status != "close" && (
                <Link to="" type="link" onClick={e => this.deleted(e,record)}><Icon type="delete" />删除</Link>
              )}
            </div>
          );
        },
      },
    ];
    return (
      <Fragment>
        <Card>
          <ProjectSearchForm handleSearchData={this.handleSearchData} />
          {
            username !== '' && (<Button
            style={{ marginBottom: '10px' }}
            type="primary"
            icon="plus"
            onClick={e => this.handleProject(e, null)}
          >
            添加
          </Button>
            )
          }
          <Table
            rowKey="id"
            pagination={{
              current: data.page,
              total: data.total,
              pageSize: data.size,
            }}
            dataSource={data.rows}
            columns={columns}
            loading={this.props.loading}
            onChange={this.onChange}
          />
          <ProjectEditComponent
            wrappedComponentRef={this.saveFormRef}
            record={this.state.record}
            visible={this.state.visible}
            onCancel={this.onCancel}
            onSuccess={this.handleEditSuccess}
          ></ProjectEditComponent>
        </Card>
      </Fragment>
    );
  }
}
