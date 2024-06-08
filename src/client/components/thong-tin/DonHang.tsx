import { listAllOrderByUser } from '@/api/orders'
import { OrderTypeData } from '@/type/OrderType'
import { Button, Table } from 'antd'
import moment from 'moment'
import React, { useState, useEffect } from 'react'

const DonHang = () => {
  const [donHang, setDonHang] = useState<OrderTypeData[]>([])
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')

  useEffect(() => {
    const getDonHang = async () => {
      try {
        const { data } = await listAllOrderByUser(userInfo?.id)
        setDonHang(data.data)
      } catch (error) {
        console.error('Error fetching orders:', error)
      }
    }
    getDonHang()
  }, [userInfo?.id])

  const handleChiTietDonHang = (donHang: OrderTypeData) => {
    console.log('Chi tiết đơn hàng:', donHang)
  }

  const columns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'orderCode',
      key: 'orderCode'
    },
    {
      title: 'Tên khách hàng',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: 'Tổng số tiền',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (text: number) => <span>{text.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
    },
    {
      title: 'Trạng thái',
      dataIndex: 'orderStatus',
      key: 'orderStatus'
    },
    {
      title: 'Ngày đặt hàng',
      dataIndex: 'orderDate',
      key: 'orderDate',
      render: (text: string) => moment(text).format('DD/MM/YYYY HH:mm:ss')
    },
    {
      title: 'Ngày giao hàng',
      dataIndex: 'deliveryDate',
      key: 'deliveryDate',
      render: (text: string) => moment(text).format('DD/MM/YYYY HH:mm:ss')
    },
    {
      title: 'Chi tiết',
      key: 'chiTiet',
      render: (record: OrderTypeData) => <Button onClick={() => handleChiTietDonHang(record)}>Xem chi tiết</Button>
    }
  ]

  const expandedRowRender = (record: OrderTypeData) => {
    const columns = [
      { title: 'Sản phẩm', dataIndex: 'name', key: 'name' },
      { title: 'Số lượng', dataIndex: 'quantity', key: 'quantity' },
      {
        title: 'Đơn giá',
        dataIndex: 'unitPrice',
        key: 'unitPrice',
        render: (text: number) => <span>{text.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
      }
    ]

    return <Table columns={columns} dataSource={record.orderDetails} pagination={false} />
  }

  return (
    <div className=' mt-5'>
      <h1>Danh sách đơn hàng</h1>

      <Table bordered columns={columns} dataSource={donHang} expandable={{ expandedRowRender }} rowKey='id' />
    </div>
  )
}

export default DonHang
