import React, { useEffect, useState } from 'react';
import { Typography, Button, Table, Space, Image, Modal, message } from 'antd';
import { Link } from 'react-router-dom';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

import { ProductType } from '../../../type/Product';
import { getAll, remove } from '../../../api/products';
import styled from 'styled-components';

const ListPro = () => {
  const [pro, setPro] = useState<ProductType[]>([]);
  const data = pro.map((item, index) => {
    return {
      key: index + 1,
      _id: item._id,
      image: item.image,
      name: item.name,
      price: item.price,
      sale_price: item.sale_price,
      quantity: item.quantity,
      desc_img: item.desc_img,
      desc: item.desc,
      short_desc: item.short_desc,
      cateId: item.cateId,
    };
  });
  const columns: ColumnsType<ProductType> = [
    {
      title: 'ID',
      dataIndex: 'key',
      key: 'id',
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <p style={{ width: '200px' }}>{text}</p>,
    },
    {
      title: 'Giá gốc',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Giá khuyến mãi',
      dataIndex: 'sale_price',
      key: 'sale_price',
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (text: string, record: ProductType) => {
        return <Image width={200} src={text} />;
      },
    },
    {
      title: 'Mô tả',
      dataIndex: 'desc',
      key: 'desc',
      render: (text) => <textarea cols={6} rows={12} style={{ width: '500px' }}>{text}</textarea>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: ProductType) => (
        <Space size="middle">
          <Link to={`${record._id}/edit`}>
            <button style={{ border: '0px', fontSize: '20px' }} onClick={() => console.log(`${record._id}`)}>
              {' '}
              <EditOutlined />
            </button>
          </Link>
          <button style={{ border: '0px', fontSize: '20px' }}>
            <DeleteOutlined
              style={{ color: 'red' }}
              onClick={() => {
                onDelete(record._id as string);
              }}
            />
          </button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAll();
        setPro(data.data);
        console.log(data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const onDelete = async (id: string) => {
    console.log(id);

    Modal.confirm({
      title: 'Bạn có muốn xóa không?',
      onOk: async () => {
        const { data } = await remove(id);
        if (data) {
          setPro(pro.filter((item) => item._id !== id));
        }
        message.success('Xóa thành công');
      },
    });
    console.log();
  };
  return (
    <>
      <Breadcrumb>
        <Typography.Title level={2} style={{ margin: 0 }}>
          Danh sách sản phẩm
        </Typography.Title>
        <Link to="/admin/products/add">
          <Button type="dashed" shape="circle" icon={<PlusOutlined />} />
        </Link>
      </Breadcrumb>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

const Breadcrumb = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  text-transform: uppercase;
`;

export default ListPro;
