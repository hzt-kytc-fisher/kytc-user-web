import React from 'react';

import { Form, Input, Button, Row, Col } from 'antd';

@Form.create()
class ProjectSearchForm extends React.Component {
  componentDidMount() {
    const { form, handleSearchData } = this.props;
    handleSearchData && handleSearchData(form);
  }
  handleSearch = e => {
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
    return (
      <Form layout="inline" onSubmit={this.handleSearch}>
        <Row gutter={{ md: 7, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <Form.Item label="项目">
              {getFieldDecorator('title', {
                initialValue: '',
              })(<Input />)}
            </Form.Item>
          </Col>
          <Col md={9} sm={24}>
            <Form.Item label="发版计划">
              {getFieldDecorator('publishPlan', {})(<Input />)}
            </Form.Item>
          </Col>
          <Col md={7} sm={24}>
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
      </Form>
    );
  }
}

export default ProjectSearchForm;
