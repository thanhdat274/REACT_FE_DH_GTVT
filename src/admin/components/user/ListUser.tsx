import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Image, message, Modal, Space, Table, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { deleteUser, listUser } from '../../../api/user';
import { UserType } from '../../../type/user';

const ListUser = () => {
  const [user, setUser] = useState<UserType[]>([]);
  const data = user.map((item, index) => {
    return {
      key: index + 1,
      _id: item._id,
      image: item.image,
      name: item.name,
      email: item.email,
      password: item.password,
      phone: item.phone,
      address: item.address,
      role: item.role,
    };
  });
  const columns: ColumnsType<UserType> = [
    {
      title: 'ID',
      dataIndex: 'key',
      key: 'id',
    },
    {
      title: 'Tên khách hàng',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <p style={{ width: '200px' }}>{text}</p>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (text: string, record: UserType) => {
        return <Image width={100} src={text} />;
      },
    },
    {
      title: 'Chức vụ',
      dataIndex: 'role',
      key: 'role',
      render: (text) => <p style={{ width: '200px' }}>{text ? 'Nhân viên' : 'Khách hàng'}</p>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: UserType) => (
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
        const data = await listUser();
        setUser(data.data);
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
        const { data } = await deleteUser(id);
        if (data) {
          setUser(user.filter((item) => item._id !== id));
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
          Danh sách tài khoản
        </Typography.Title>
        <Link to="/admin/user/add">
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

export default ListUser;
