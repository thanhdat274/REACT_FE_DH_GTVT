import { Button, Col, Form, Input, message, Row, Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { addCate } from '../../../api/category';
import styled from 'styled-components';

const AddCate: React.FC = () => {
  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    console.log('Success:', values);
    try {
      const data = await addCate(values);
      console.log(data);
      message.success('Thêm mới thành công');
      navigate('/admin/categories');
    } catch (err) {
      message.error('Có lỗi xảy ra');
    }
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
      <Breadcrumb>
        <Typography.Title level={2} style={{ margin: 0 }}>
          Thêm mới danh mục
        </Typography.Title>
      </Breadcrumb>
      <Row gutter={16}>
        <Col span={16}>
          <Form
            initialValues={{}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="on"
            labelCol={{ span: 24 }}
          >
            <Form.Item
              name="name"
              labelCol={{ span: 24 }}
              label="Tên danh mục"
              rules={[{ required: true, message: 'Tên danh mục không được trống!' }]}
            >
              <Input size="large" />
            </Form.Item>
            <Form.Item
              name="link_image"
              labelCol={{ span: 24 }}
              label="Hình ảnh dnah mục"
              rules={[{ required: true, message: 'Đường link ảnh danh mục không được trống!' }]}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Thêm mới
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

const Breadcrumb = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  text-transform: uppercase;
`;
export default AddCate;
