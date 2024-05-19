import { CloseOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, total }: any = useSelector((store) => store);
  console.log(total);

  const dipatch = useDispatch();
  return (
    <div>
      <main className="mt-[20px]">
        <div className="max-w-[600px] mx-auto">
          <div className="text-red-600 hover:text-red-600 flex justify-between items-center w-[600px] h-[50px] bg-white font-bold ">
            <div className="ml-[20px]">
              <Link to="/" className="text-red-600 hover:text-red-600">
                <i className="fa-solid fa-angle-left"></i> Trở về
              </Link>
            </div>
            <div className="text-[24px]">Giỏ hàng</div>
            <div></div>
          </div>
          <div className="list-cart">
            {cart.map((item: any, index: number) => {
              return (
                <div key={index} className="cart-item">
                  <div className="cart-img">
                    <img src={item.image} alt="" className="w-[200px] h-[200px]" />
                  </div>
                  <div className="cart-content">
                    <h3 className="product-name1">{item.name}</h3>{' '}
                    <div className="price-product">
                      <p className="price saleOffPrice">
                        <span>
                          {' '}
                          {item.sale_price.toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                          })}
                        </span>
                      </p>

                      <p className="price originalPrice">
                        <span>
                          {' '}
                          {item.price.toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                          })}
                        </span>
                      </p>
                    </div>
                    <div>
                      <strong>Chọn số lương: </strong>
                      <div className="quantity">
                        <Button
                          onClick={() => {
                            dipatch({
                              type: 'cart/increase',
                              payload: item._id,
                            });
                          }}
                        >
                          +
                        </Button>
                        <div className="qtt">{item.quantity1}</div>
                        <Button
                          onClick={() => {
                            dipatch({
                              type: 'cart/decrease',
                              payload: item._id,
                            });
                          }}
                        >
                          -
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Button
                      className="remove-item-cart"
                      onClick={() => {
                        dipatch({
                          type: 'cart/delete',
                          payload: item._id,
                        });
                      }}
                    >
                      <CloseOutlined />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="total">
            <div className="font-semibold">Tổng tiền tạm tính: </div>
            <div className="total-text">
              {total.toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
              })}
            </div>
          </div>
          <div className="uppercase">
            <button className="w-[600px] h-[50px] bg-[#d70018] text-white mb-[20px] uppercase font-semibold  rounded-[10px]">
              Tiến hành đặt hàng
            </button>
            <Link to="/">
              <div className="max-w-[600px] h-[50px] border-[1px] border-red-500 text-red-500 uppercase font-semibold hover:bg-[#dc3545] hover:text-white rounded-[10px] flex justify-center items-center">
                Chọn thêm sản phẩm khác
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Cart;
