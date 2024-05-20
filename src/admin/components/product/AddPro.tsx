import React, { useEffect, useState } from 'react'
import { Typography, Col, Row, Button, Form, Input, InputNumber, Select, message, UploadFile } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { PlusSquareOutlined } from '@ant-design/icons'
import { UploadProps } from 'antd/es/upload'
import { RcFile } from 'antd/lib/upload'
import Dragger from 'antd/es/upload/Dragger'
import { upload } from '../../../api/images'
import { addPro } from '../../../api/products'
import styled from 'styled-components'

const { TextArea } = Input
const { Option } = Select
const optionsByCategory: any = {
  dienthoai: ['Apple', 'Samsung', 'Xiaomi', 'oppo', 'realme', 'nokia', 'oneplus', 'asus'],
  laptop: ['Dell', 'HP', 'Lenovo'],
  tablet: ['iPad', 'Samsung', 'Huawei'],
  amthanh: ['Sony', 'JBL', 'Bose'],
  dongho: ['Rolex', 'Casio', 'Omega'],
  phukien: ['Charger', 'Headphones', 'Cables'],
  hangcu: ['Used Phone', 'Used Laptop', 'Used Tablet']
}
const AddPro: React.FC = () => {
  const navigate = useNavigate()
  const [fileList, setfileList] = useState<UploadFile[] | any>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [brands, setBrands] = useState([])
  const [form] = Form.useForm()

  const handleCategoryChange = (value: string) => {
    setBrands(optionsByCategory[value] || [])
    setSelectedCategory(value)
    form.setFieldsValue({ brand: undefined })
  }

  const onFinish = async (values: any) => {
    console.log('Success:', values)
    const imgLink = await upload(fileList[0])
    const valueAdd = {
      image: imgLink,
      name: values.name,
      price: values.price,
      sale_price: values.sale_price,
      quantity: values.quantity,
      desc_img: values.desc_img,
      desc: values.desc,
      short_desc: values.short_desc,
      cateId: values.cateId
    }
    try {
      // const data = await addPro(valueAdd);
      // console.log('data', data);

      message.success('Thêm mới thành công')
      navigate('/admin/products')
      // console.log(data);
    } catch (err) {
      message.error('Có lỗi xảy ra')
    }
  }
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  const handleChangeImage: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setfileList(newFileList)
  }
  const onPreview = async (file: UploadFile) => {
    let src = file.url as string
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj as RcFile)
        reader.onload = () => resolve(reader.result as string)
      })
    }
    const image = new Image()
    image.src = src
    const imgWindow = window.open(src)
    imgWindow?.document.write(image.outerHTML)
  }
  // phần battery
  const [battery, setBattery] = useState<string>('')
  const [batteryValue, setBatteryValue] = useState<number | null>(null)
  const [unit, setUnit] = useState<string>('mah') // Đơn vị mặc định
  const handleInputBattery = (value: number | null) => {
    const newValue = value !== undefined ? `${value}${unit}` : ''
    setBattery(newValue)
  }

  const handleSelectBattery = (value: string) => {
    setUnit(value)
    const newValue = batteryValue !== undefined ? `${batteryValue}${value}` : ''
    setBattery(newValue)
  }

  const [screenSize, setScreenSize] = useState<string>('')
  const [screenSizeValue, setScreenSizeValue] = useState<number | null>(null)
  const [size, setSize] = useState<string>('inches') 
  const handleInputScreenSize = (value: number | null) => {
    const newValue = value !== undefined ? `${value}${size}` : ''
    setScreenSize(newValue)
  }

  const handleSelectScreenSize = (value: string) => {
    setSize(value)
    const newValue = screenSizeValue !== undefined ? `${screenSizeValue}${value}` : ''
    setScreenSize(newValue)
  }

  console.log(battery)
  console.log(screenSize)

  const onFormValuesChange = (changedValues: any, allValues: any) => {
    console.log('Changed values:', changedValues)
    console.log('All values:', allValues)

  }

  return (
    <div className='mt-[20px]'>
      <Breadcrumb>
        <Typography.Title level={2} style={{ margin: 0 }}>
          Thêm mới sản phẩm
        </Typography.Title>
      </Breadcrumb>

      {/* <Form initialValues={{}} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete='on'> */}
      <Form initialValues={{}} onValuesChange={onFormValuesChange} onFinishFailed={onFinishFailed} autoComplete='on'>
        <Row gutter={16}>
          <Col span={10}>
            <Form.Item name='image' labelCol={{ span: 24 }} label='Hình ảnh thumbal'>
              <UploadWrapper>
                <div style={{ textAlign: 'left', border: '0' }}>
                  <Dragger
                    listType='picture'
                    multiple={false}
                    maxCount={1}
                    beforeUpload={() => {
                      return false
                    }}
                    accept='image/png, image/jpg, image/jpeg, image/gif'
                    onChange={handleChangeImage}
                    onPreview={onPreview}
                    fileList={fileList}
                    style={{ border: '0' }}
                  >
                    <p className='ant-upload-drag-icon'>
                      <PlusSquareOutlined style={{ fontSize: '50px' }} />
                    </p>
                    <p>Thêm ảnh!</p>
                  </Dragger>
                </div>
              </UploadWrapper>
            </Form.Item>
            <Form.Item name='image' labelCol={{ span: 24 }} label='Hình ảnh sản phẩm chi tiết'>
              <UploadWrapper>
                <div style={{ textAlign: 'left', border: '0' }}>
                  <Dragger
                    listType='picture'
                    multiple={true}
                    maxCount={10}
                    beforeUpload={() => {
                      return false
                    }}
                    accept='image/png, image/jpg, image/jpeg, image/gif'
                    onChange={handleChangeImage}
                    onPreview={onPreview}
                    fileList={fileList}
                    style={{ border: '0' }}
                  >
                    <p className='ant-upload-drag-icon'>
                      <PlusSquareOutlined style={{ fontSize: '50px' }} />
                    </p>
                    <p>Thêm ảnh!</p>
                  </Dragger>
                </div>
              </UploadWrapper>
            </Form.Item>
          </Col>

          <Col span={14}>
            <Typography.Title level={3}>Thông tin sản phẩm</Typography.Title>

            <Form.Item
              name='name'
              labelCol={{ span: 24 }}
              label='Tên sản phẩm'
              rules={[{ required: true, message: 'Tên sản phẩm không để trống!' }]}
            >
              <Input size='large' />
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name='price'
                  label='Giá gốc'
                  labelCol={{ span: 24 }}
                  rules={[{ required: true, message: 'Gíá sản phẩm không để trống!' }]}
                >
                  <InputNumber style={{ width: '100%' }} size='large' />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name='sale_price'
                  label='Giá khuyến mại'
                  dependencies={['price']}
                  labelCol={{ span: 24 }}
                  rules={[
                    { required: true, message: 'Giá khuyến mại sản phẩm không để trống!' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('price') <= value) {
                          return Promise.reject(new Error('Giá khuyến mại phải nhỏ hơn giá gốc!'))
                        } else {
                          return Promise.resolve()
                        }
                      }
                    })
                  ]}
                >
                  <InputNumber style={{ width: '100%' }} size='large' />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label='Ngành hàng'
                  name='cateId'
                  labelCol={{ span: 24 }}
                  rules={[{ required: true, message: 'Ngành hàng sản phẩm không để trống!' }]}
                >
                  <Select
                    style={{ width: '100%' }}
                    size='large'
                    placeholder='Lựa chọn'
                    allowClear
                    showSearch
                    optionFilterProp='children'
                    onChange={handleCategoryChange}
                  >
                    <Select.Option value='dienthoai'>Điện thoại</Select.Option>
                    <Select.Option value='laptop'>Laptop</Select.Option>
                    <Select.Option value='tablet'>Tablet</Select.Option>
                    <Select.Option value='amthanh'>Âm thanh</Select.Option>
                    <Select.Option value='dongho'>Đồng hồ</Select.Option>
                    <Select.Option value='phukien'>Phụ kiện</Select.Option>
                    <Select.Option value='hangcu'>Hàng cũ</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label='Thương hiệu'
                  name='brand'
                  labelCol={{ span: 24 }}
                  rules={[{ required: true, message: 'Thương hiệu sản phẩm không để trống!' }]}
                >
                  <Select
                    style={{ width: '100%' }}
                    size='large'
                    placeholder='Lựa chọn'
                    allowClear
                    showSearch
                    optionFilterProp='children'
                  >
                    {brands.map((brand) => (
                      <Option key={brand} value={brand}>
                        {brand}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              {['dienthoai', 'laptop', 'tablet'].includes(selectedCategory) && (
                <>
                  <Col span={12}>
                    <Form.Item
                      label='Bộ nhớ lưu trữ thiết bị'
                      name='storage'
                      labelCol={{ span: 24 }}
                      rules={[{ required: true, message: 'Bộ nhớ lưu trữ không để trống!' }]}
                    >
                      <Select
                        style={{ width: '100%' }}
                        size='large'
                        placeholder='Lựa chọn'
                        allowClear
                        showSearch
                        optionFilterProp='children'
                      >
                        <Select.Option value='16GB'>16GB</Select.Option>
                        <Select.Option value='32GB'>32GB</Select.Option>
                        <Select.Option value='128GB'>128GB</Select.Option>
                        <Select.Option value='256GB'>256GB</Select.Option>
                        <Select.Option value='512GB'>512GB</Select.Option>
                        <Select.Option value='1TB'>1TB</Select.Option>
                        <Select.Option value='2TB'>2TB</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label='Ram thiết bị'
                      name='ram'
                      labelCol={{ span: 24 }}
                      rules={[{ required: true, message: 'Ram thiết bị không để trống!' }]}
                    >
                      <Select
                        style={{ width: '100%' }}
                        size='large'
                        placeholder='Lựa chọn'
                        allowClear
                        showSearch
                        optionFilterProp='children'
                      >
                        <Select.Option value='4GB'>4GB</Select.Option>
                        <Select.Option value='6GB'>6GB</Select.Option>
                        <Select.Option value='8GB'>8GB</Select.Option>
                        <Select.Option value='12GB'>12GB</Select.Option>
                        <Select.Option value='16GB'>16GB</Select.Option>
                        <Select.Option value='24GB'>24GB</Select.Option>
                        <Select.Option value='32GB'>32GB</Select.Option>
                        <Select.Option value='64GB'>64GB</Select.Option>
                        <Select.Option value='128GB'>128GB</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>{' '}
                  <Col span={24}>
                    <Form.Item
                      label='Chipset'
                      name='brand'
                      labelCol={{ span: 24 }}
                      rules={[{ required: true, message: 'Chipset sản phẩm không để trống!' }]}
                    >
                      <Input style={{ width: '100%' }} size='large' />
                    </Form.Item>
                  </Col>
                </>
              )}

              <Col span={12}>
                <Form.Item
                  label='Dung lượng pin sản phẩm'
                  name='battery'
                  labelCol={{ span: 24 }}
                  rules={[{ required: true, message: 'Dung lượng pin thiết bị không để trống!' }]}
                >
                  <div style={{ position: 'relative', width: '100%' }}>
                    <InputNumber style={{ width: '70%' }} size='large' onChange={handleInputBattery} />
                    <Select
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: '30%',
                        height: '100%'
                      }}
                      size='large'
                      defaultValue='mah'
                      onChange={handleSelectBattery}
                    >
                      <Select.Option value='mah'>mah</Select.Option>
                      <Select.Option value='kwh'>kwh</Select.Option>
                      <Select.Option value='cell'>cell</Select.Option>
                    </Select>
                  </div>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label='Hệ điều hành'
                  name='operating_system'
                  labelCol={{ span: 24 }}
                  rules={[{ required: true, message: 'Hệ điều hành không để trống!' }]}
                >
                  <Select
                    style={{ width: '100%' }}
                    size='large'
                    placeholder='Lựa chọn'
                    allowClear
                    showSearch
                    optionFilterProp='children'
                  >
                    <Select.Option value='Windows'>Windows</Select.Option>
                    <Select.Option value='Mac OS'>Mac OS</Select.Option>
                    <Select.Option value='Linux'>Linux</Select.Option>
                    <Select.Option value='Android'>Android</Select.Option>
                    <Select.Option value='iOS'>iOS</Select.Option>
                    <Select.Option value='Chrome OS'>Chrome OS</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label='Độ phân giải màn hình'
                  name='screen_reslution'
                  labelCol={{ span: 24 }}
                  rules={[{ required: true, message: 'Hệ điều hành không để trống!' }]}
                >
                  <Select
                    style={{ width: '100%' }}
                    size='large'
                    placeholder='Lựa chọn'
                    allowClear
                    showSearch
                    optionFilterProp='children'
                  >
                    <Select.Option value='HD (1280x720)'>HD (1280x720)</Select.Option>
                    <Select.Option value='Full HD (1920x1080)'>Full HD (1920x1080)</Select.Option>
                    <Select.Option value='WUXGA (1920x1200)'>WUXGA (1920x1200)</Select.Option>
                    <Select.Option value='UWHD (2560x1080)'>UWHD (2560x1080)</Select.Option>
                    <Select.Option value='2K QHD (2560x1440)'>2K QHD (2560x1440)</Select.Option>
                    <Select.Option value='WQHD (3440x1440)'>WQHD (3440x1440)</Select.Option>
                    <Select.Option value='4K (3840x2160)'>4K (3840x2160)</Select.Option>
                    <Select.Option value='Apple XDR (6016 x 3384)'>Apple XDR (6016 x 3384)</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label='Kích thước màn hình'
                  name='screen_size'
                  labelCol={{ span: 24 }}
                  rules={[{ required: true, message: 'Kích thước màn hình thiết bị không để trống!' }]}
                >
                  <div style={{ position: 'relative', width: '100%' }}>
                    <InputNumber style={{ width: '70%' }} size='large' onChange={handleInputScreenSize} />
                    <Select
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: '30%',
                        height: '100%'
                      }}
                      size='large'
                      defaultValue='inches'
                      onChange={handleSelectScreenSize}
                    >
                      <Select.Option value='inches'>inches</Select.Option>
                    </Select>
                  </div>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name='quantity'
                  label='Số lượng'
                  labelCol={{ span: 24 }}
                  rules={[{ required: true, message: 'Số lượng sản phẩm không để trống!' }]}
                >
                  <InputNumber style={{ width: '100%' }} size='large' />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name='short_desc'
              labelCol={{ span: 24 }}
              label='Mô tả nhỏ sản phẩm'
              rules={[{ required: true, message: 'Mô tả nhỏ sản phẩm không để trống!' }]}
            >
              <TextArea name='short_desc' />
            </Form.Item>
            <Form.Item
              name='desc'
              labelCol={{ span: 24 }}
              label='Mô tả sản phẩm'
              rules={[{ required: true, message: 'Mô tả sản phẩm không để trống!' }]}
            >
              <TextArea name='desc' />
            </Form.Item>

            <Form.Item>
              <Link to='/admin/products'>
                <Button type='primary' htmlType='submit' style={{ marginRight: '20px' }}>
                  Back
                </Button>
              </Link>
              <Button type='primary' htmlType='submit'>
                Thêm mới
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

const Breadcrumb = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  text-transform: uppercase;
`

const UploadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fafafa;
  justify-content: center;
  min-height: 300px;
  border: 1px solid gray;
  margin-bottom: 10px;
`

export default AddPro
