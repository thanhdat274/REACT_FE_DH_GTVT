import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listCate } from '../../api/category';
import { getAll } from '../../api/products';
import { CateType } from '../../type/category';
import { ProductType } from '../../type/Product';

const Home = () => {
  const [pro, setPro] = useState<ProductType[]>([]);
  const [cate, setCate] = useState<CateType[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getAll();
        setPro(data);
        console.log(data);

        const data1 = await listCate();
        setCate(data1.data);
        console.log(data1.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <div className="content">
        <div className="menu-container">
          <div className="menu-wrapper">
            <div className="menu-tree">
              <ul className="menu-tree">
                {cate.map((item, index) => {
                  return (
                    <li key={index} className="label-menu-tree">
                      <Link to={`category/${item._id}`} className="label-item">
                        <img
                          className="icons-cate"
                          src={item.link_image}
                          alt=""
                        />
                        <span>{item.name}</span>
                        <div data-v-78fbd3bf className="icon-right">
                          <svg height={15} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                            <path d="M96 480c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L242.8 256L73.38 86.63c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25l-192 192C112.4 476.9 104.2 480 96 480z"></path>
                          </svg>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className="banner">
          <div className="banner-content">
            <img
              src="https://res.cloudinary.com/dvj4wwihv/image/upload/v1659541791/250bt_cqptzn.png"
              alt=""
              className="banner-img"
            />
            <div className="banner-title">
              <div className="banner-outer-active">
                <div data-v-78fbd3bf className="">
                  GALAXY S22 SERIES
                  <br />
                  Ưu đãi đến 9 triệu
                </div>
              </div>
              <div className="banner-outer">
                <div data-v-78fbd3bf className="">
                  POCO X4 GT
                  <br />
                  Cấu hình mạnh mẽ
                </div>
              </div>
              <div className="banner-outer">
                <div data-v-78fbd3bf className="">
                  MACBOOK AIR M2
                  <br />
                  Ưu đãi đến 5 triệu
                </div>
              </div>
              <div className="banner-outer">
                <div data-v-78fbd3bf className="">
                  TIVI XIAOMI 4K P1
                  <br />
                  Mở bán quà khủng
                </div>
              </div>
              <div className="banner-outer">
                <div data-v-78fbd3bf className="">
                  HUAWEI WEEK
                  <br />
                  Deal ngon giá sốc
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="box-right-banner">
          <div className="right-banner">
            <a href="/" className="right-banner-item">
              <img
                alt="GALAXY FOLD3 <br>Giá rẻ bất ngờ"
                data-src="https://res.cloudinary.com/dvj4wwihv/image/upload/v1660663966/1_RightBanner_Galaxy_Z_Fold3_yeanwu.png"
                className="right-banner-img"
                src="https://res.cloudinary.com/dvj4wwihv/image/upload/v1660663966/1_RightBanner_Galaxy_Z_Fold3_yeanwu.png"
              />
            </a>
            <a href="/" className="right-banner-item">
              <img
                alt="iPad Pro m1<br>Hiệu năng cực khủng"
                data-src="https://res.cloudinary.com/dvj4wwihv/image/upload/v1660664043/RightBanner_ipad_m1_desk_u4xpic.png"
                className="right-banner-img"
                src="https://res.cloudinary.com/dvj4wwihv/image/upload/v1660664043/RightBanner_ipad_m1_desk_u4xpic.png"
              />
            </a>
            <a href="/" className="right-banner-item">
              <img
                alt="ASUS ZENBOOK 14<br>MỎNG NHẸ SANG TRỌNG"
                data-src="https://cdn2.cellphones.com.vn/690x300/https://dashboard.cellphones.com.vn/storage/zenbook 14.png"
                className="right-banner-img"
                src="https://cdn2.cellphones.com.vn/690x300/https://dashboard.cellphones.com.vn/storage/zenbook 14.png"
              />
            </a>
          </div>
        </div>
      </div>
      <section>
        <div className="box-content">
          <div className="box-title">
            <Link to={'/'} className="title">
              Tất cả sản phẩm
            </Link>
            <a href="/" className="title1">
              Xem tất cả
            </a>
            {/* <div className="list-tag" style={{ display: 'flex' }}>
              <a href="/" className="related-tag">
                Apple
              </a>
              <a href="/" className="related-tag">
                Samsung
              </a>
              <a href="/" className="related-tag">
                Oppo
              </a>
              <a href="/" className="related-tag">
                Realme
              </a>
              <a href="/" className="related-tag">
                Xiaomi
              </a>
              <a href="/" className="related-tag">
                Asus
              </a>
              <a href="/" className="related-tag">
                Vivo
              </a>
              <a href="/" className="related-tag">
                Nokia
              </a>
              <a href="/" className="related-tag">
                Tecno
              </a>
            </div> */}
          </div>
          <div className="product-list">
            {pro.map((item, index) => {
              return (
                <div key={index} className="product">
                  <Link to={`/products/${item._id}`} className="product">
                    <div className="product-img">
                      <img src={item.image} alt="" className="img-product" />
                    </div>
                    <h3 className="product-name">{item.name}</h3>
                    <div className="product-price">
                      <span className="salePrice">
                        {item.sale_price.toLocaleString('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                        })}
                      </span>
                      <span className="costPrice">
                        {item.price.toLocaleString('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                        })}
                      </span>
                    </div>
                    <div className="product-desc">
                      <div className="promotion">
                        <p>[HOT] Thu cũ lên đời giá cao - Thủ tục nhanh - Trợ giá lên tới 1.000.000đ</p>
                      </div>
                    </div>
                    <div className="product-sao">
                      <div data-v-78fbd3bf className="icon-star">
                        <svg height={12} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                          <path d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z"></path>
                        </svg>
                      </div>
                      <div data-v-78fbd3bf className="icon-star">
                        <svg height={12} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                          <path d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z"></path>
                        </svg>
                      </div>
                      <div data-v-78fbd3bf className="icon-star">
                        <svg height={12} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                          <path d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z"></path>
                        </svg>
                      </div>
                      <div data-v-78fbd3bf className="icon-star">
                        <svg height={12} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                          <path d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z"></path>
                        </svg>
                      </div>
                      <div data-v-78fbd3bf className="icon-star">
                        <svg height={12} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                          <path d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z"></path>
                        </svg>
                      </div>
                      &nbsp; &nbsp;
                      <span className="evaluate">7 đánh giá</span>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
        <div className="box-content">
          <div className="box-title">
            <a href="/" className="title">
              Phụ kiện
            </a>
            <a href="/" className="title-cate">
              Xem tất cả
            </a>
          </div>
          <div className="cate-list">
            <div className="item-categories-outer">
              <a
                href="/"
                className="item-categories"
                data-src="https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/icons/category/cate-1644.svg"
                style={{
                  backgroundColor: 'rgb(255, 163, 163)',
                  backgroundImage:
                    'url("https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/icons/category/cate-1644.svg")',
                }}
              >
                <span className="item-cate-title">Nổi bật</span>
              </a>
            </div>
            <div className="item-categories-outer">
              <a
                href="/"
                className="item-categories"
                style={{
                  backgroundColor: 'rgb(255, 184, 184)',
                  backgroundImage:
                    'url("https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/icons/category/cate-43.svg")',
                }}
                data-src="https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/icons/category/cate-43.svg"
              >
                <span className="item-cate-title">Phụ kiện Apple</span>
              </a>
            </div>
            <div className="item-categories-outer">
              <a
                href="/"
                className="item-categories"
                style={{
                  backgroundColor: 'rgb(255, 148, 235)',
                  backgroundImage:
                    'url("https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/icons/category/cate-286.svg")',
                }}
                data-src="https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/icons/category/cate-286.svg"
              >
                <span className="item-cate-title">Dán màn hình</span>
              </a>
            </div>
            <div className="item-categories-outer">
              <a
                href="/"
                className="item-categories"
                style={{
                  backgroundColor: 'rgb(224, 179, 255)',
                  backgroundImage:
                    'url("https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/icons/category/cate-108.svg")',
                }}
                data-src="https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/icons/category/cate-108.svg"
              >
                <span className="item-cate-title">Ốp lưng - Bao da</span>
              </a>
            </div>
            <div className="item-categories-outer">
              <a
                href="/"
                className="item-categories"
                style={{
                  backgroundColor: 'rgb(198, 216, 251)',
                  backgroundImage:
                    'url("https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/icons/category/cate-114.svg")',
                }}
                data-src="https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/icons/category/cate-114.svg"
              >
                <span className="item-cate-title">Cáp, sạc</span>
              </a>
            </div>
            <div className="item-categories-outer">
              <a
                href="/"
                className="item-categories"
                style={{
                  backgroundColor: 'rgb(77, 145, 255)',
                  backgroundImage:
                    'url("https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/icons/category/cate-122.svg")',
                }}
                data-src="https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/icons/category/cate-122.svg"
              >
                <span className="item-cate-title">Pin dự phòng</span>
              </a>
            </div>
            <div className="item-categories-outer">
              <a
                href="/"
                className="item-categories"
                style={{
                  backgroundColor: 'rgb(133, 255, 177)',
                  backgroundImage:
                    'url("https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/icons/category/cate-676.svg")',
                }}
                data-src="https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/icons/category/cate-676.svg"
              >
                <span className="item-cate-title">Thiết bị mạng</span>
              </a>
            </div>
            <div className="item-categories-outer">
              <a
                href="/"
                className="item-categories"
                style={{
                  backgroundColor: 'rgb(245, 214, 61)',
                  backgroundImage:
                    'url("https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/icons/category/cate-363.svg")',
                }}
                data-src="https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/icons/category/cate-363.svg"
              >
                <span className="item-cate-title">Camera</span>
              </a>
            </div>
            <div className="item-categories-outer">
              <a
                href="/"
                className="item-categories"
                style={{
                  backgroundColor: 'rgb(253, 163, 99)',
                  backgroundImage:
                    'url("https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/icons/category/cate-663.svg")',
                }}
                data-src="https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/icons/category/cate-663.svg"
              >
                <span className="item-cate-title">Chuột, bàn phím</span>
              </a>
            </div>
            <div className="item-categories-outer">
              <a
                href="/"
                className="item-categories"
                style={{
                  backgroundColor: 'rgb(255, 102, 102)',
                  backgroundImage:
                    'url("https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/icons/category/cate-109.svg")',
                }}
                data-src="https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/icons/category/cate-109.svg"
              >
                <span className="item-cate-title">Thẻ nhớ, USB</span>
              </a>
            </div>
            <div className="item-categories-outer">
              <a
                href="/"
                className="item-categories"
                style={{
                  backgroundColor: 'rgb(214, 214, 214)',
                  backgroundImage:
                    'url("https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/icons/category/cate-966.svg")',
                }}
                data-src="https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/icons/category/cate-966.svg"
              >
                <span className="item-cate-title">Apple Care</span>
              </a>
            </div>
            <div className="item-categories-outer">
              <a
                href="/"
                className="item-categories"
                style={{
                  backgroundColor: 'rgb(255, 173, 182)',
                  backgroundImage:
                    'url("https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/icons/category/cate-929.svg")',
                }}
                data-src="https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/icons/category/cate-929.svg"
              >
                <span className="item-cate-title">Dây đeo Airtag</span>
              </a>
            </div>
            <div className="item-categories-outer">
              <a
                href="/"
                className="item-categories"
                style={{
                  backgroundColor: 'rgb(150, 253, 181)',
                  backgroundImage:
                    'url("https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/icons/category/cate-669.svg")',
                }}
                data-src="https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/icons/category/cate-669.svg"
              >
                <span className="item-cate-title">Gaming Gear</span>
              </a>
            </div>
            <div className="item-categories-outer">
              <a
                href="/"
                className="item-categories"
                style={{
                  backgroundColor: 'rgb(107, 206, 255)',
                  backgroundImage:
                    'url("https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/icons/category/cate-852.svg")',
                }}
                data-src="https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/icons/category/cate-852.svg"
              >
                <span className="item-cate-title">Phụ kiện chụp ảnh</span>
              </a>
            </div>
            <div className="item-categories-outer">
              <a
                href="/"
                className="item-categories"
                style={{
                  backgroundColor: 'rgb(216, 168, 255)',
                  backgroundImage:
                    'url("https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/icons/category/cate-44.svg")',
                }}
                data-src="https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/icons/category/cate-44.svg"
              >
                <span className="item-cate-title">Phụ kiện Laptop</span>
              </a>
            </div>
            <div className="item-categories-outer">
              <a
                href="/"
                className="item-categories"
                style={{
                  backgroundColor: 'rgb(239, 194, 255)',
                  backgroundImage:
                    'url("https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/icons/category/cate-775.svg")',
                }}
                data-src="https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/icons/category/cate-775.svg"
              >
                <span className="item-cate-title">Quạt mini</span>
              </a>
            </div>
            <div className="item-categories-outer">
              <a
                href="/"
                className="item-categories"
                style={{
                  backgroundColor: 'rgb(255, 133, 192)',
                  backgroundImage:
                    'url("https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/icons/category/cate-70.svg")',
                }}
                data-src="https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/icons/category/cate-70.svg"
              >
                <span className="item-cate-title">Balo, túi chống sốc</span>
              </a>
            </div>
            <div className="item-categories-outer">
              <a
                href="/"
                className="item-categories"
                style={{
                  backgroundColor: 'rgb(255, 189, 189)',
                  backgroundImage:
                    'url("https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/icons/category/cate-707.svg")',
                }}
                data-src="https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/icons/category/cate-707.svg"
              >
                <span className="item-cate-title">Dây đeo đồng hồ</span>
              </a>
            </div>
            <div className="item-categories-outer">
              <a
                href="/"
                className="item-categories"
                style={{
                  backgroundColor: 'rgb(255, 209, 225)',
                  backgroundImage:
                    'url("https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/icons/category/cate-750.svg")',
                }}
                data-src="https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/icons/category/cate-750.svg"
              >
                <span className="item-cate-title">Ổ cứng đi động</span>
              </a>
            </div>
          </div>
        </div>
        <div className="box-content">
          <div className="box-title">
            <a href="/" className="title">
              LINH KIỆN MÁY TÍNH
            </a>
            <a href="/" className="title-cate">
              Xem tất cả
            </a>
          </div>
          <div className="cate-list">
            <div className="item-categories-outer">
              <a
                href="/"
                className="item-categories"
                style={{
                  backgroundColor: 'rgb(252, 165, 165)',
                  backgroundImage:
                    'url("https://cdn2.cellphones.com.vn/180x/https://cellphones.com.vn/media/icons/category/cate-868.svg")',
                }}
                data-src="https://cdn2.cellphones.com.vn/180x/https://cellphones.com.vn/media/icons/category/cate-868.svg"
              >
                <span className="item-cate-title">PC ráp sẵn CellphoneS</span>
              </a>
            </div>
            <div className="item-categories-outer">
              <a
                href="/"
                className="item-categories"
                data-src="https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/catalog/product/c/p/cpu_1.png"
                style={{
                  backgroundColor: 'rgb(253, 164, 175)',
                  backgroundImage:
                    'url(https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/catalog/product/c/p/cpu_1.png)',
                  backgroundRepeat: 'repeat',
                }}
              >
                <span className="item-cate-title">CPU</span>
              </a>
            </div>
            <div className="item-categories-outer">
              <a
                href="/"
                className="item-categories "
                style={{
                  backgroundColor: 'rgb(249, 168, 212)',
                  backgroundImage:
                    'url("https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/catalog/product/m/a/mainboard_1.png")',
                }}
                data-src="https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/catalog/product/m/a/mainboard_1.png"
              >
                <span className="item-cate-title">Mainboard</span>
              </a>
            </div>
            <div className="item-categories-outer">
              <a
                href="/"
                className="item-categories"
                style={{
                  backgroundColor: 'rgb(196, 181, 253)',
                  backgroundImage:
                    'url("https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/catalog/product/r/a/ram_2.png")',
                }}
                data-src="https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/catalog/product/r/a/ram_2.png"
              >
                <span className="item-cate-title">RAM</span>
              </a>
            </div>
            <div className="item-categories-outer">
              <a
                href="/"
                className="item-categories"
                style={{
                  backgroundColor: 'rgb(165, 180, 252)',
                  backgroundImage:
                    'url("https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/catalog/product/s/s/ssd_2.png")',
                }}
                data-src="https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/catalog/product/s/s/ssd_2.png"
              >
                <span className="item-cate-title">Ổ cứng</span>
              </a>
            </div>
            <div className="item-categories-outer">
              <a
                href="/"
                className="item-categories"
                style={{
                  backgroundColor: 'rgb(147, 197, 253)',
                  backgroundImage:
                    'url("https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/catalog/product/v/g/vga.png")',
                }}
                data-src="https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/catalog/product/v/g/vga.png"
              >
                <span className="item-cate-title">Card màn hình</span>
              </a>
            </div>
            <div className="item-categories-outer">
              <a
                href="/"
                className="item-categories"
                style={{
                  backgroundColor: 'rgb(110, 231, 183)',
                  backgroundImage:
                    'url("https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/catalog/product/p/s/psu.png")',
                }}
                data-src="https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/catalog/product/p/s/psu.png"
              >
                <span className="item-cate-title">Nguồn máy tính</span>
              </a>
            </div>
            <div className="item-categories-outer">
              <a
                href="/"
                className="item-categories"
                style={{
                  backgroundColor: 'rgb(252, 211, 75)',
                  backgroundImage:
                    'url("https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/catalog/product/t/_/t_n_nhi_t_2.png")',
                }}
                data-src="https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/catalog/product/t/_/t_n_nhi_t_2.png"
              >
                <span className="item-cate-title">Tản nhiệt</span>
              </a>
            </div>
            <div className="item-categories-outer">
              <a
                href="/"
                className="item-categories"
                data-src="https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/catalog/product/c/a/case_1.png"
                style={{
                  backgroundColor: 'rgb(253, 186, 116)',
                  backgroundImage:
                    'url("https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/catalog/product/c/a/case_1.png")',
                }}
              >
                <span className="item-cate-title">Case máy tính</span>
              </a>
            </div>
          </div>
        </div>
        <div className="box-content">
          <div className="box-title">
            <a href="/" className="title">
              HÀNG CŨ
            </a>
            <a href="/" className="title-cate">
              Xem tất cả
            </a>
          </div>
          <div className="cate-list">
            <div className="item-categories-outer">
              <a
                href="/"
                className="item-categories "
                data-src="https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/icons/category/cate-940.svg"
                style={{
                  backgroundColor: 'rgb(251, 60, 89)',
                  backgroundImage:
                    'url("https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/icons/category/cate-940.svg")',
                }}
              >
                <span className="item-cate-title">Điện thoại cũ</span>
              </a>
            </div>
            <div className="item-categories-outer">
              <a
                href="/"
                className="item-categories "
                data-src="https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/icons/category/cate-941.svg"
                style={{
                  backgroundColor: 'rgb(248, 53, 137)',
                  backgroundImage:
                    'url("https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/icons/category/cate-941.svg")',
                }}
              >
                <span className="item-cate-title">Máy tính bảng cũ</span>
              </a>
            </div>
            <div className="item-categories-outer">
              <a
                href="/"
                className="item-categories "
                data-src="https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/icons/category/cate-392.svg"
                style={{
                  backgroundColor: 'rgb(210, 200, 86)',
                  backgroundImage:
                    'url("https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/icons/category/cate-392.svg")',
                }}
              >
                <span className="item-cate-title">Mac cũ</span>
              </a>
            </div>
            <div className="item-categories-outer">
              <a
                href="/"
                className="item-categories "
                data-src="https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/icons/category/cate-878.svg"
                style={{
                  backgroundColor: 'rgb(180, 225, 91)',
                  backgroundImage:
                    'url("https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/icons/category/cate-878.svg")',
                }}
              >
                <span className="item-cate-title">Laptop cũ</span>
              </a>
            </div>
            <div className="item-categories-outer">
              <a
                href="/"
                className="item-categories "
                data-src="https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/icons/category/cate-897.svg"
                style={{
                  backgroundColor: 'rgb(86, 225, 153)',
                  backgroundImage:
                    'url("https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/icons/category/cate-897.svg")',
                }}
              >
                <span className="item-cate-title">Loa, tai nghe cũ</span>
              </a>
            </div>
            <div className="item-categories-outer">
              <a
                href="/"
                className="item-categories "
                data-src="https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/icons/category/cate-451.svg"
                style={{
                  backgroundColor: 'rgb(47, 111, 97)',
                  backgroundImage:
                    'url("https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/icons/category/cate-451.svg")',
                }}
              >
                <span className="item-cate-title">Đồng hồ thông minh cũ</span>
              </a>
            </div>
            <div className="item-categories-outer">
              <a
                href="/"
                className="item-categories "
                data-src="https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/icons/category/cate-846.svg"
                style={{
                  backgroundColor: 'rgb(115, 179, 221)',
                  backgroundImage:
                    'url("https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/icons/category/cate-846.svg")',
                }}
              >
                <span className="item-cate-title">Nhà thông minh cũ</span>
              </a>
            </div>
            <div className="item-categories-outer">
              <a
                href="/"
                className="item-categories "
                data-src="https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/icons/category/cate-681-2.svg"
                style={{
                  backgroundColor: 'rgb(84, 105, 176)',
                  backgroundImage:
                    'url("https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/icons/category/cate-681-2.svg")',
                }}
              >
                <span className="item-cate-title">Phụ kiện cũ</span>
              </a>
            </div>
            <div className="item-categories-outer">
              <a
                href="/"
                className="item-categories "
                data-src="https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/icons/category/cate-962.svg"
                style={{
                  backgroundColor: 'rgb(94, 73, 188)',
                  backgroundImage:
                    'url("https://cdn2.cellphones.com.vn/180x/https://cdn.cellphones.com.vn/media/icons/category/cate-962.svg")',
                }}
              >
                <span className="item-cate-title">Màn hình cũ</span>
              </a>
            </div>
          </div>
        </div>
        <div className="band-banner">
          <div className="box-title">
            <a href="/" className="title">
              Ưu đãi thanh toán
            </a>
          </div>
          <div className="brand-banner__content">
            <a href="/" className="brand-banner__item">
              <img
                alt="Ưu đãi Evo"
                data-src="https://res.cloudinary.com/dvj4wwihv/image/upload/v1660664074/citi-bank-mo-the_sz4x6c.png"
                className="brand-banner__img"
                src="https://res.cloudinary.com/dvj4wwihv/image/upload/v1660664074/citi-bank-mo-the_sz4x6c.png"
              />
            </a>
            <a href="/" className="brand-banner__item">
              <img
                alt="Ưu đãi VNPay"
                data-src="https://cdn2.cellphones.com.vn/x/https://dashboard.cellphones.com.vn/storage/VNPAY.png"
                className="brand-banner__img"
                src="https://cdn2.cellphones.com.vn/x/https://dashboard.cellphones.com.vn/storage/VNPAY.png"
              />
            </a>
            <a href="/" className="brand-banner__item">
              <img
                alt="Ưu đãi Kredivo"
                data-src="https://cdn2.cellphones.com.vn/x/https://dashboard.cellphones.com.vn/storage/uu-dai-thanh-toan-kredivo.png"
                className="brand-banner__img"
                src="https://cdn2.cellphones.com.vn/x/https://dashboard.cellphones.com.vn/storage/uu-dai-thanh-toan-kredivo.png"
              />
            </a>
            <a href="/" className="brand-banner__item">
              <img
                alt="Ưu đãi đối tác Sacombank"
                data-src="https://cdn2.cellphones.com.vn/x/https://dashboard.cellphones.com.vn/storage/uu-dai-thanh-toan-sacom0991764.png"
                className="brand-banner__img"
                src="https://cdn2.cellphones.com.vn/x/https://dashboard.cellphones.com.vn/storage/uu-dai-thanh-toan-sacom0991764.png"
              />
            </a>
          </div>
        </div>
        <div className="band-banner">
          <div className="box-title">
            <a href="/" className="title">
              CHUYÊN TRANG THƯƠNG HIỆU
            </a>
          </div>
          <div className="brand-banner__content">
            <a href="/" className="brand-banner__item">
              <img
                alt="Samsung"
                data-src="https://cdn2.cellphones.com.vn/x/https://dashboard.cellphones.com.vn/storage/samsung.png"
                className="brand-banner__img"
                src="https://cdn2.cellphones.com.vn/x/https://dashboard.cellphones.com.vn/storage/samsung.png"
              />
            </a>
            <a href="/" className="brand-banner__item">
              <img
                alt="Sis Apple"
                data-src="https://cdn2.cellphones.com.vn/x/https://dashboard.cellphones.com.vn/storage/apple.png"
                className="brand-banner__img"
                src="https://cdn2.cellphones.com.vn/x/https://dashboard.cellphones.com.vn/storage/apple.png"
              />
            </a>
            <a href="/" className="brand-banner__item">
              <img
                alt="Asus"
                data-src="https://cdn2.cellphones.com.vn/x/https://dashboard.cellphones.com.vn/storage/SIS asus.png"
                className="brand-banner__img"
                src="https://cdn2.cellphones.com.vn/x/https://dashboard.cellphones.com.vn/storage/SIS asus.png"
              />
            </a>
            <a href="/" className="brand-banner__item">
              <img
                alt="Xiaomi"
                data-src="https://cdn2.cellphones.com.vn/x/https://dashboard.cellphones.com.vn/storage/xiaomi.png"
                className="brand-banner__img"
                src="https://cdn2.cellphones.com.vn/x/https://dashboard.cellphones.com.vn/storage/xiaomi.png"
              />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
