import { Route, Routes } from 'react-router-dom'
import AdminLayout from './admin/AdminLayout'
import AddCate from './admin/components/cate/AddCate'
import ListCate from './admin/components/cate/ListCate'
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
import EditCate from './admin/components/cate/EditCate'
import EditUSer from './admin/components/user/EditUSer'
import Signup from './client/components/auth/signup'
import ProductDetail from './client/components/product/productDetail'
import PrivateRouter from './admin/PrivateRouter'
import Cart from './client/components/Cart'
import ProductList from './client/components/product/ProductList'
import ThongTinAccount from './client/components/thong-tin/thong-tin'

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
          {/* phần quản lý thông tin cá nhân */}
          <Route path='smember' element={<ThongTinAccount />} />

          {/* phàn sản phảm theo danh mục */}
          <Route path='category/:id' element={<ProductList />} />
          {/* phàn product */}
          <Route path='products/:id' element={<ProductDetail />} />
        </Route>
        {/* phần admin */}
        <Route
          path='/admin'
          element={
            // <PrivateRouter>
            <AdminLayout />
            // </PrivateRouter>
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
        </Route>
      </Routes>
    </>
  )
}

export default App
