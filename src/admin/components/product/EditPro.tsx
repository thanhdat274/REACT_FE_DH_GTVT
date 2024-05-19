import React, { useEffect, useState } from 'react';
import { Typography, Col, Row, Button, Checkbox, Form, Input, InputNumber, Select, message, UploadFile } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PlusCircleOutlined, PlusSquareOutlined } from '@ant-design/icons';
import Dragger from 'antd/lib/upload/Dragger';
import { UploadProps } from 'antd/es/upload';
import { RcFile } from 'antd/lib/upload';
import { CateType } from '../../../type/category';
import { listCate } from '../../../api/category';
import { upload } from '../../../api/images';
import { editPro, listOnePro } from '../../../api/products';
import styled from 'styled-components';

const { TextArea } = Input;

const EditPro: React.FC = () => {
  const navigate = useNavigate();
  const [fileList, setfileList] = useState<UploadFile[] | any>([]);
  const { id } = useParams();
  const [cate, setCate] = useState<CateType[]>([]);
  const [pro, setPro] = useState([]);
  const [form] = Form.useForm();
  useEffect(() => {
    const getCate = async () => {
      try {
        const data = await listCate();
        setCate(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCate();
  }, []);

  useEffect(() => {
    const getPro = async (id: string) => {
      const { data } = await listOnePro(id);
      console.log(id);
      console.log(data);
      form.setFieldsValue(data);
    };
    getPro(id as string);
  }, []);

  const onFinish = async (values: any) => {
    console.log('Success:', values);
    const file = fileList[0];
    console.log(file);

    if (file) {
      values.image = await upload(file);
    }
    const valueEdit = {
      _id: id,
      image: values.image,
      name: values.name,
      price: values.price,
      sale_price: values.sale_price,
      quantity: values.quantity,
      desc_img: values.desc_img,
      desc: values.desc,
      short_desc: values.short_desc,
      cateId: values.cateId,
    };
    try {
      const data = await editPro(valueEdit);
      message.success('Cập nhật thành công');
      navigate('/admin/products');
      console.log(data);
    } catch (err) {
      message.error('Có lỗi xảy ra');
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const handleChangeImage: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setfileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <>
      <Breadcrumb>
        <Typography.Title level={2} style={{ margin: 0 }}>
          Cập nhât sản phẩm
        </Typography.Title>
      </Breadcrumb>
      <Form form={form} initialValues={pro} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="on">
        <Row gutter={16}>
          <Col span={10}>
            <Form.Item name="image" labelCol={{ span: 24 }} label="Hình ảnh sản phẩm">
              <UploadWrapper>
                <div style={{ textAlign: 'center', border: '0' }}>
                  <Dragger
                    listType="picture"
                    multiple={false}
                    maxCount={1}
                    beforeUpload={() => {
                      return false;
                    }}
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    onChange={handleChangeImage}
                    onPreview={onPreview}
                    fileList={fileList}
                    style={{ border: '0' }}
                  >
                    <p className="ant-upload-drag-icon">
                      <PlusSquareOutlined style={{ fontSize: '50px' }} />
                    </p>
                    <p>Thêm ảnh!</p>
                  </Dragger>
                </div>
              </UploadWrapper>
            </Form.Item>
            <Form.Item
              name="desc_img"
              labelCol={{ span: 24 }}
              label="Mô tả nhỏ hình ảnh"
              rules={[{ required: true, message: 'Mô tả nhỏ hình ảnh không để trống!' }]}
            >
              <TextArea name="desc_img" />
            </Form.Item>
          </Col>
          <Col span={14}>
            <Typography.Title level={3}>Thông tin sản phẩm</Typography.Title>
            <Form.Item
              name="name"
              labelCol={{ span: 24 }}
              label="Tên sản phẩm"
              rules={[{ required: true, message: 'Tên sản phẩm không để trống!' }]}
            >
              <Input size="large" />
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="price"
                  label="Giá gốc"
                  labelCol={{ span: 24 }}
                  rules={[{ required: true, message: 'Gíá sản phẩm không để trống!' }]}
                >
                  <InputNumber style={{ width: '100%' }} size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="sale_price"
                  label="Giá khuyến mại"
                  dependencies={['price']}
                  labelCol={{ span: 24 }}
                  rules={[
                    { required: true, message: 'Giá khuyến mại sản phẩm không để trống!' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('price') <= value) {
                          return Promise.reject(new Error('Giá khuyến mại phải nhỏ hơn giá gốc!'));
                        } else {
                          return Promise.resolve();
                        }
                      },
                    }),
                  ]}
                >
                  <InputNumber style={{ width: '100%' }} size="large" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Danh mục"
                  name="cateId"
                  labelCol={{ span: 24 }}
                  rules={[{ required: true, message: 'Danh mục sản phẩm không để trống!' }]}
                >
                  <Select
                    style={{ width: '100%' }}
                    size="large"
                    placeholder="Lựa chọn"
                    allowClear
                    showSearch
                    optionFilterProp="children"
                  >
                    {cate.map((item, index) => (
                      <Select.Option value={item._id} key={index + 1}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="quantity"
                  label="Số lượng"
                  labelCol={{ span: 24 }}
                  rules={[{ required: true, message: 'Số lượng sản phẩm không để trống!' }]}
                >
                  <InputNumber style={{ width: '100%' }} size="large" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="short_desc"
              labelCol={{ span: 24 }}
              label="Mô tả nhỏ sản phẩm"
              rules={[{ required: true, message: 'Mô tả nhỏ sản phẩm không để trống!' }]}
            >
              <TextArea name="short_desc" />
            </Form.Item>
            <Form.Item
              name="desc"
              labelCol={{ span: 24 }}
              label="Mô tả sản phẩm"
              rules={[{ required: true, message: 'Mô tả sản phẩm không để trống!' }]}
            >
              <TextArea name="desc" />
            </Form.Item>

            <Form.Item>
              <Link to="/admin/products">
                <Button type="primary" htmlType="submit" style={{ marginRight: '20px' }}>
                  Back
                </Button>
              </Link>
              <Button type="primary" htmlType="submit">
                Cập nhật
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

const Breadcrumb = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  text-transform: uppercase;
`;
const UploadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fafafa;
  justify-content: center;
  min-height: 300px;
  border: 1px solid gray;
  margin-bottom: 10px;
`;

export default EditPro;
