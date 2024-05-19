import { Button, Col, Form, Input, message, Row, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { listOneCate, update } from '../../../api/category';
import styled from 'styled-components';

const EditCate: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [cate, setCate] = useState([]);

  useEffect(() => {
    const getCate = async (id: string) => {
      const { data } = await listOneCate(id);
      console.log(id);
      console.log(data);
      form.setFieldsValue(data);
    };

    getCate(id as string);
  }, []);
  const onFinish = async (values: any) => {
    console.log('Success:', values);
    const valueEdit = {
      _id: id,
      name: values.name,
      link_image: values.link_image,
    };
    console.log(valueEdit);
    try {
      const data = await update(valueEdit);
      message.success('Cập nhật thành công');
      navigate('/admin/categories');
      console.log(data);
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
          Cập nhật danh mục
        </Typography.Title>
      </Breadcrumb>
      <Row gutter={16}>
        <Col span={16}>
          <Form
            form={form}
            initialValues={cate}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="on"
            labelCol={{ span: 24 }}
          >
            <Form.Item
              name="name"
              labelCol={{ span: 24 }}
              label="Tên sản phẩm"
              rules={[{ required: true, message: 'Tên danh mục không được trống!' }]}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Cập nhật
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
const Label = styled.div`
  font-size: 13px;
`;
export default EditCate;
