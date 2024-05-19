import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [auth, setAuth] = useState<any>();
  useEffect(() => {
    const getA = () => {
      setAuth(JSON.parse(localStorage.getItem("user") as string));
    };
    getA();
  }, []);
  return (
    <div className="header-top">
      <div className="header-container">
        <div className="navbar">
          <Link to="/" className="nav-brand">
            <div className="box-logo-desktop">
              <img
                src="https://cdn.sforum.vn/sforum/wp-content/uploads/2021/08/logo_cps-1.png"
                alt=""
                className="header-img"
              />
            </div>
          </Link>
          <div className="box-search">
            <form method="get">
              <input type="text" className="search" autoComplete="off" placeholder="Tìm kiếm sản phẩm ..." />
              <button type="submit" className="btn-search">
                <i className="fa-solid fa-magnifying-glass" />
              </button>
            </form>
          </div>
          <Link to="/" className="header-item">
            <div className="about__box-icon">
              <i className="fa-solid fa-phone" />
            </div>
            <div className="about__box-content">
              <p className="">
                Gọi mua hàng
                <br />
                1800.2044
              </p>
            </div>
          </Link>
          <Link to="/" className="header-item">
            <div className="about__box-icon">
              <i className="fa-solid fa-location-dot" />
            </div>
            <div className="about__box-content">
              <p className="">
                Cửa hàng
                <br />
                gần bạn
              </p>
            </div>
          </Link>
          <Link to="/" className="header-item">
            <div className="about__box-icon">
              <i className="fa-solid fa-truck" />
            </div>
            <div className="about__box-content">
              <p className="">
                Tra cứu
                <br />
                đơn hàng
              </p>
            </div>
          </Link>
          <Link to="/cart" className="header-item about__cart">
            <div className="about__box-icon">
              <i className="fa-solid fa-basket-shopping-simple" />
            </div>
            <div className="about__box-content">
              <p className="">
                Giỏ
                <br />
                hàng
              </p>
            </div>
          </Link>
          {auth && auth ?(
            <Link to="/smember" className="header-item">
            <div className="about__box-icon">
              <i className="fa-solid fa-circle-user" style={{ textAlign: 'center' }} />
              <div className="about__box-content">
                <p className="" style={{ textAlign: 'center' }}>
                  Smember
                </p>
              </div>
            </div>
          </Link>
          ):(
            <Link to="/signin" className="header-item">
            <div className="about__box-icon">
              <i className="fa-solid fa-circle-user" style={{ textAlign: 'center' }} />
              <div className="about__box-content">
                <p className="" style={{ textAlign: 'center' }}>
                  Smember
                </p>
              </div>
            </div>
          </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
