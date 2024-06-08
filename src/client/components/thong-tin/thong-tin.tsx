import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DonHang from './DonHang'

const ThongTinAccount = () => {
  const [auth, setAuth] = useState<any>()
  const [selectedTab, setSelectedTab] = useState<string>('cap-nhat-thong-tin') // Trạng thái của tab được chọn
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('userInfo') as string)

  useEffect(() => {
    setAuth(user)
  }, [])

  const logout = () => {
    localStorage.removeItem('userInfo')
    localStorage.removeItem('token')
    setAuth(undefined)
    navigate('/')
    window.location.reload()
  }

  return (
    <div>
      <main className='my-[20px]'>
        <div className='w-[1080px] py-[10px] mx-auto flex-col border-b-2 border-[#f2f2f2]'>
          {/* Cột bên trái */}
          <div className='w-1/4 border-r'>
            <ul>
              <li className={`py-2 px-4 cursor-pointer`}>
                <Link to='/' className={`block`}>
                  Trang chủ
                </Link>
              </li>
              <li
                className={`py-2 px-4 cursor-pointer ${selectedTab === 'cap-nhat-thong-tin' ? 'bg-gray-200' : ''}`}
                onClick={() => setSelectedTab('cap-nhat-thong-tin')}
              >
                Cập nhật thông tin
              </li>
              <li
                className={`py-2 px-4 cursor-pointer ${selectedTab === 'don-hang-da-mua' ? 'bg-gray-200' : ''}`}
                onClick={() => setSelectedTab('don-hang-da-mua')}
              >
                Đơn hàng đã mua
              </li>
              <li className='py-2 px-4 cursor-pointer' onClick={logout}>
                Đăng xuất
              </li>
            </ul>
          </div>
          {/* Cột bên phải */}
          <div className='w-full'>
            {selectedTab === 'cap-nhat-thong-tin' && (
              <div className='p-4'>
                <h1>Cập nhật thông tin người dùng</h1>
              </div>
            )}
            {selectedTab === 'don-hang-da-mua' && (
              <div className='p-4'>
                <DonHang />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default ThongTinAccount
