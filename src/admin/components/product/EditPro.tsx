import React, { useEffect, useState } from 'react'
import { Typography, Col, Row, Button, Form, Input, InputNumber, Select, message, UploadFile } from 'antd'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { PlusSquareOutlined } from '@ant-design/icons'
import Dragger from 'antd/lib/upload/Dragger'
import { UploadProps } from 'antd/es/upload'
import { RcFile } from 'antd/lib/upload'
import { upload } from '../../../api/images'
import { editPro, listOnePro } from '../../../api/products'
import styled from 'styled-components'
import ReactQuill from 'react-quill'
import { ProductType } from '@/type/Product'
const { Option } = Select
const optionsByCategory: any = {
  dienthoai: ['Apple', 'Samsung', 'Xiaomi', 'Oppo', 'Realme', 'Nokia', 'Oneplus', 'Asus'],
  laptop: ['Dell', 'HP', 'Lenovo'],
  tablet: ['iPad', 'Samsung', 'Huawei'],
  amthanh: ['Sony', 'JBL', 'Bose'],
  dongho: ['Rolex', 'Casio', 'Omega'],
  phukien: ['Charger', 'Headphones', 'Cables'],
  hangcu: ['Used Phone', 'Used Laptop', 'Used Tablet']
}

const EditPro: React.FC = () => {
  const navigate = useNavigate()
  const [rawHTML, setRawHTML] = useState('')
  const [fileList, setfileList] = useState<UploadFile[] | any>([])
  const [mutiFileList, setMutiFileList] = useState<UploadFile[] | any>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [brands, setBrands] = useState([])
  const [form] = Form.useForm()
  const { id } = useParams()
  const [pro, setPro] = useState<ProductType>()
  // phần chọn ngành hàng và select ra thương hiệu
  const handleCategoryChange = (value: string) => {
    if (pro && pro?.type === value) {
      setBrands(optionsByCategory[pro?.brand] || [])
      setSelectedCategory(value)
    } else {
      setBrands(optionsByCategory[value] || [])
      setSelectedCategory(value)
    }
    form.setFieldsValue({ brand: undefined })
  }
  //---------------------------------------------------

  // phầm ảnh sản phẩm
  const handleChangeImage: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setMutiFileList(newFileList)
  }
  const handleChangeThumbnail: UploadProps['onChange'] = ({ fileList: newFileList }) => {
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
  //---------------------------------------

  useEffect(() => {
    const getPro = async (id: number) => {
      const { data } = await listOnePro(id)
      setPro(data?.data)
      if (data?.data?.type) {
        handleCategoryChange(data?.data?.type)
      }
      form.setFieldsValue(data?.data)
      // if (data?.data) {
      //   const convertImages = {
      //     image: data?.data?.image,
      //     thumbnail: data?.data?.image,
      //     url: data?.data?.image
      //   };
      //    const convertImagesThumb = {
      //      image: data?.data?.thumbnail,
      //      thumbnail: data?.data?.thumbnail,
      //      url: data?.data?.thumbnail
      //    }
      //   setfileList([convertImages]);
      //   setMutiFileList([convertImagesThumb]);
      // }
    }

    getPro(Number(id))
  }, [id])

  const onFinish = async (values: any) => {
    const imgLink = fileList[0]
    const mutiImgLink = mutiFileList[0]

    if (imgLink) {
      values.thumbnail = await upload(imgLink)
    } else {
      values.thumbnail = pro?.thumbnail
    }
    if (mutiImgLink) {
      values.image = await upload(mutiImgLink)
    } else {
      values.image = pro?.image
    }
    if (rawHTML) {
      values.rawHTML = rawHTML
    } else {
      values.rawHTML = pro?.description
    }
    const valueEdit = {
      id: Number(id),
      image: values.image,
      name: values?.name,
      type: values?.type,
      brand: values?.brand,
      description: values.rawHTML,
      battery: values?.battery,
      cpu: values?.cpu,
      operatingSystem: values?.operatingSystem,
      ram: values?.ram,
      screenReslution: values?.screenReslution,
      screenSize: values?.screenSize,
      storage: values?.storage,
      thumbnail: values.thumbnail,
      weight: values?.weight,
      price: values?.price,
      salePrice: values?.salePrice,
      quantity: values?.quantity,
      status: values?.status,
      productView: values?.productView
    }
    try {
      const data = await editPro(valueEdit)
      message.success('Cập nhật thành công')
      navigate('/admin/products')
    } catch (err) {
      message.error('Có lỗi xảy ra')
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <>
      <Breadcrumb>
        <Typography.Title level={2} style={{ margin: 0 }}>
          Cập nhât sản phẩm
        </Typography.Title>
      </Breadcrumb>
      <Form form={form} initialValues={pro} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete='on'>
        <Row gutter={16}>
          <Col span={10}>
            <Form.Item name='thumbnail' labelCol={{ span: 24 }} label='Hình ảnh thumbal'>
              <UploadWrapper>
                <div style={{ textAlign: 'left', border: '0' }}>
                  <Dragger
                    listType='picture'
                    multiple={false}
                    maxCount={1}
                    beforeUpload={() => {
                      return false
                    }}
                    accept='image/png, image/jpg, image/jpeg, image/gif, image/webp'
                    onChange={handleChangeThumbnail}
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
                    multiple={false}
                    maxCount={1}
                    beforeUpload={() => {
                      return false
                    }}
                    accept='image/png, image/jpg, image/jpeg, image/gif, image/webp'
                    onChange={handleChangeImage}
                    onPreview={onPreview}
                    fileList={mutiFileList}
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
              <Input size='large' disabled />
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name='price'
                  label='Giá gốc'
                  labelCol={{ span: 24 }}
                  rules={[{ required: true, message: 'Gíá sản phẩm không để trống!' }]}
                >
                  <InputNumber
                    style={{ width: '100%' }}
                    size='large'
                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value) => (value ? value.replace(/\$\s?|(,*)/g, '') : '')}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name='salePrice'
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
                  <InputNumber
                    style={{ width: '100%' }}
                    size='large'
                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value) => (value ? value.replace(/\$\s?|(,*)/g, '') : '')}
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label='Ngành hàng'
                  name='type'
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
                    disabled
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
                    disabled
                  >
                    {brands?.map((brand) => (
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
                        disabled
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
                        disabled
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
                      name='cpu'
                      labelCol={{ span: 24 }}
                      rules={[{ required: true, message: 'Chipset sản phẩm không để trống!' }]}
                    >
                      <Input style={{ width: '100%' }} size='large' disabled />
                    </Form.Item>
                  </Col>
                </>
              )}

              <Col span={12}>
                <Form.Item
                  label='Dung lượng pin sản phẩm (mah, cell, kwh)'
                  name='battery'
                  labelCol={{ span: 24 }}
                  rules={[{ required: true, message: 'Dung lượng pin thiết bị không để trống!' }]}
                >
                  <Input style={{ width: '100%' }} size='large' disabled />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label='Hệ điều hành'
                  name='operatingSystem'
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
                    disabled
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
                  name='screenReslution'
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
                    disabled
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
                  label='Kích thước màn hình (inches)'
                  name='screenSize'
                  labelCol={{ span: 24 }}
                  rules={[{ required: true, message: 'Kích thước màn hình thiết bị không để trống!' }]}
                >
                  <Input style={{ width: '100%' }} size='large' disabled />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name='quantity'
                  label='Số lượng'
                  labelCol={{ span: 24 }}
                  rules={[{ required: true, message: 'Số lượng sản phẩm không để trống!' }]}
                >
                  <InputNumber
                    style={{ width: '100%' }}
                    size='large'
                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value) => (value ? value.replace(/\$\s?|(,*)/g, '') : '')}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name='weight'
                  label='Trọng lượng'
                  labelCol={{ span: 24 }}
                  rules={[{ required: true, message: 'Trọng lượng sản phẩm không để trống!' }]}
                >
                  <Input style={{ width: '100%' }} size='large' disabled />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              name='description'
              labelCol={{ span: 24 }}
              label='Mô tả sản phẩm'
              rules={[{ required: true, message: 'Mô tả sản phẩm không để trống!' }]}
            >
              <ReactQuill theme='snow' value={rawHTML} onChange={setRawHTML} id='content' />
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
    </>
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

export default EditPro
