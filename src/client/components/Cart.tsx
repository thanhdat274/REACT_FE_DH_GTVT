// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { ProductType } from '@/type/Product'
import { deleteCartService, getCartService, updateCartService } from '@/api/carts'
import { IAddCart } from '@/type/cart'
// import { ProductType } from '@/type/Product'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// import { formatNumber } from ''
// import { formatNumber } from '@/util/contant'
// import { formatNumber } from 'src/util/contant.ts'

const Cart = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '')
  const [carts, setCart] = useState<any>([])
  const [priceCarts, setPriceCart] = useState(0)
  const getCart = async () => {
    await getCartService(userInfo.id).then((result) => {
      setCart(result.data.data)
    })
  }
  useEffect(() => {
    getCart()
  }, [])
  useEffect(() => {
    const total = carts.reduce((arr: any, cur: any) => arr + cur.products.price * cur.quantity, 0)
    setPriceCart(total)
  }, [carts])
  const formatNumber = (number: number) => {
    let [integerPart, decimalPart] = number.toString().split('.')

    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.')

    return decimalPart ? `${integerPart}.${decimalPart}` + 'VND' : integerPart + 'VND'
  }
  const incrementQuantity = async (product: any) => {
    const data = {
      id: product.id,
      quantity: product.quantity + 1
    }
    await updateCartService(data)
    getCart()
  }

  const decrementQuantity = async (product: any) => {
    const data = {
      id: product.id,
      quantity: product.quantity -1
    }
    if (product.quantity == 1) {
      await deleteCartService(product.id)
      // return
    } else {
      await updateCartService(data)
    }
    getCart()
  }
  return (
    <div>
      <main className='mt-[20px]'>
        <div className='max-w-[600px] mx-auto'>
          <div className='text-red-600 hover:text-red-600 flex justify-between items-center w-[600px] h-[50px] bg-white font-bold '>
            <div className='ml-[20px]'>
              <Link to='/' className='text-red-600 hover:text-red-600'>
                <i className='fa-solid fa-angle-left'></i> Trở về
              </Link>
            </div>
            <div className='text-[24px]'>Giỏ hàng</div>
          </div>
          <div className='list-cart flex flex-col gap-5'>
            {carts.map((item: any) => (
              <div className='flex gap-5 items-center'>
                <div className='w-52 h-32'>
                  <img className='w-full h-full' src={item.products.thumbnail} alt={item.products.name} />
                </div>
                <div>
                  <p className='m-0'>{item.products.name}</p>
                </div>
                <div>
                  <button className='bg-slate-400 rounded w-5 h-5' onClick={() => decrementQuantity(item)}>
                    -
                  </button>
                </div>
                <div>
                  <button className='bg-slate-400 rounded w-5 h-5' onClick={() => incrementQuantity(item)}>
                    +
                  </button>
                </div>
                <div>
                  <span>{item.quantity}</span>
                </div>
                <div>
                  <span>{formatNumber(item.products.price)}</span>
                </div>
              </div>
            ))}
          </div>
          <div className='total'>
            <div className='font-semibold'>Tổng tiền tạm tính: </div>
            <div className='total-text'>{formatNumber(priceCarts)}</div>
          </div>
          <div className='uppercase'>
            <button className='w-[600px] h-[50px] bg-[#d70018] text-white mb-[20px] uppercase font-semibold  rounded-[10px]'>
              Tiến hành đặt hàng
            </button>
            <Link to='/'>
              <div className='max-w-[600px] h-[50px] border-[1px] border-red-500 text-red-500 uppercase font-semibold hover:bg-[#dc3545] hover:text-white rounded-[10px] flex justify-center items-center'>
                Chọn thêm sản phẩm khác
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Cart
