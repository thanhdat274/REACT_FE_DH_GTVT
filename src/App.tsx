import { Route, Routes } from 'react-router-dom'
import AdminLayout from './admin/AdminLayout'
import Dashboard from './admin/Dashboard'
import './index.css'
import Signin from './client/components/auth/signin'
import Home from './client/components/Home'
import UserLayout from './client/UserLayout'
import ListPro from './admin/components/product/ListPro'
import AddPro from './admin/components/product/AddPro'
import ListUser from './admin/components/user/ListUser'
import AddUser from './admin/components/user/AddUser'
import EditPro from './admin/components/product/EditPro'
import EditUSer from './admin/components/user/EditUSer'
import Signup from './client/components/auth/signup'
import ProductDetail from './client/components/product/productDetail'
import PrivateRouter from './admin/PrivateRouter'
import Cart from './client/components/Cart'
import ProductList from './client/components/product/ProductList'
import ThongTinAccount from './client/components/thong-tin/thong-tin'
import ListOrders from './admin/components/orders/ListOrders'
import AddOrders from './client/components/orders/AddOrders'
import OrderDetail from './admin/components/orders/OrderDetail'

function App() {
  return (
    <>
      <Routes>
        {/* phần user*/}
        <Route path='/' element={<UserLayout />}>
          <Route index element={<Home />} />
          {/* phần auth */}
          <Route path='signin' element={<Signin />} />
          <Route path='signup' element={<Signup />} />
          {/* phần cart */}
          <Route path='cart' element={<Cart />} />
          <Route path='orders'>
            <Route path='add' element={<AddOrders />} />
            <Route path='detail/:id' element={<OrderDetail />} />
          </Route>
          {/* phần quản lý thông tin cá nhân */}
          <Route path='thong-tin' element={<ThongTinAccount />} />

          {/* phàn sản phảm theo danh mục */}
          <Route path='product/:type' element={<ProductList />} />
          {/* phàn product */}
          <Route path='products/:id' element={<ProductDetail />} />
        </Route>

        {/* phần admin */}
        <Route
          path='/admin'
          element={
            <PrivateRouter>
              <AdminLayout />
            </PrivateRouter>
          }
        >
          <Route index element={<Dashboard />} />
          {/* phần sản phẩm */}
          <Route path='products'>
            <Route index element={<ListPro />} />
            <Route path='add' element={<AddPro />} />
            <Route path=':id/edit' element={<EditPro />} />
          </Route>
          {/* Phần user */}
          <Route path='user'>
            <Route index element={<ListUser />} />
            <Route path='add' element={<AddUser />} />
            <Route path=':id/edit' element={<EditUSer />} />
          </Route>
          <Route path='orders'>
            <Route index element={<ListOrders />} />
            <Route path='add' element={<AddOrders />} />
            <Route path='detail/:id' element={<OrderDetail />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
