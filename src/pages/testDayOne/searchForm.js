import React, { useContext } from 'react';
import { Form, Input, Button } from 'antd';
import { observer } from 'mobx-react';
import Store from './page-list';

const SearchForm = () => {
  const pageStore = useContext(Store);
  const [form] = Form.useForm();
  const handleReset = () => {
    form.resetFields();
    pageStore.resetFields();
  };
  const handleSubmit = (values) => {
    pageStore.searchParams = values;
    pageStore.getList();
  };
  return (
    <Form form={form} layout="inline" onFinish={handleSubmit}>
      <Form.Item label="标题" name="title">
        <Input placeholder="请输入标题" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          查询
        </Button>
        <Button style={{ marginLeft: '10px' }} onClick={handleReset}>
          重置
        </Button>
      </Form.Item>
    </Form>
  );
};

export default observer(SearchForm);
