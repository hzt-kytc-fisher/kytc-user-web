import React, { Fragment } from 'react';

import { connect } from 'dva';

import { Card, Button, Table, Modal, Divider, Icon } from 'antd';

import { Link } from 'umi';

import UserSearchForm from './Search';
import UserEditComponent from './Edit';
import UserDetailComponent from './Detail';

import * as CookieUtils from '../../utils/cookie';

@connect(({ userManager, loading }) => ({
  userManager: userManager,
  loading: loading.models.userManager,
}))
export default class UserManagerPage extends React.Component {
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
    };
  }
  handleSearchData = form => {
    const { dispatch, userManager,searchForm } = this.props;
    console.log(111)
		dispatch({
			type: 'userManager/listUser',
			payload: {
				username: form.getFieldValue('username'), 
				nickname: form.getFieldValue('nickName'), 
				headpicture: form.getFieldValue('headPicture'), 
				idcard: form.getFieldValue('idCard'), 
				enabled: form.getFieldValue('enabled'), 
				mobile: form.getFieldValue('mobile'), 
				isdeleted: form.getFieldValue('isDeleted'), 
				//registertime: form.getFieldValue('registerTime'), 
				page: 0,
				pageSize: 10,
			},
		});
	}
	handleUserInfoDetail = (e, record) => {
		e.preventDefault();
		this.setState({
			detailVisible: true,
			record: record,
		})
	}

	handleEditSuccess = () =>{
		this.setState({
			visible: false,
		})
		this.handleSearchData(this.state.searchForm);
	}

	onCancel = () => {
		this.setState({ visible: false });
	}
	saveFormRef = formRef => {
		this.formRef = formRef;
	}
	handleUserInfo = (e,record)=>{
		e.preventDefault();
		this.setState({
			visible: true,
			record: record
		})
	}
	handleCancelUserInfoDetail = (e,record)=>{
		e.preventDefault();
		this.setState({
			detailVisible: false
		})
	}
	deleteUserInfo = (e,record)=>{
		e.preventDefault();
		const { dispatch,userManager: {data} } = this.props;
		const that = this;
		Modal.confirm({
			title: '删除',
			content: `确定要删除"${record.id}"吗?`,
			onOk() {
				dispatch({
					type: "userManager/deleteUserInfo",
					payload:record.id,
					callback:()=>{
						that.handleSearchData(that.state.searchForm);
					}
				})
			},
			onCancel() {
			},
		});
	}

  render() {
    const {
      userManager: { data, page, size, pagination },
    } = this.props;
    const username = CookieUtils.getCookie('username');
    const columns = [
      {
				title: '主键',
				dataIndex: 'id',
			},
			{
				title: '用户名',
				dataIndex: 'username',
			},
			{
				title: '用户昵称',
				dataIndex: 'nickName',
			},
			{
				title: '头像',
				dataIndex: 'headPicture',
			},
			{
				title: '身份证号',
				dataIndex: 'idCard',
			},
			{
				title: '是否启用',
				dataIndex: 'enabled',
			},
			{
				title: '手机号',
				dataIndex: 'mobile',
			},
			{
				title: '注册时间',
				dataIndex: 'registerTime',
			},
			{
				title:'操作',
				width:160,
				render:(record) => {
					return (
						<div>
							<Link to="" onClick={(e) => this.handleUserInfo(e,record)}><Icon type="edit"/>修改</Link>
							<Divider type="vertical" />
							<Link to="" onClick={(e) => this.deleteUserInfo(e,record)}><Icon type="delete"/>删除</Link>
							<Divider type="vertical" />
							<Link to="" onClick={(e) => this.handleUserInfoDetail(e,record)}><Icon type="profile"/>详情</Link>
						</div>
					);
				}
			}
    ];
    return (
      <Fragment>
        <Card>
          <UserSearchForm handleSearchData={this.handleSearchData} />
            <Button
              style={{ marginBottom: '10px' }}
              type="primary"
              icon="plus"
              onClick={e => this.handleUserInfo(e, null)}
            >
              添加
            </Button>
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
          <UserEditComponent
            wrappedComponentRef={this.saveFormRef}
            record={this.state.record}
            visible={this.state.visible}
            onCancel={this.onCancel}
            onSuccess={this.handleEditSuccess}
          ></UserEditComponent>
          <UserDetailComponent visible={this.state.detailVisible} record={this.state.record} onCancel={this.handleCancelUserInfoDetail}></UserDetailComponent>
        </Card>
      </Fragment>
    );
  }
}
