import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const ThongTinAccount = () => {
  const [auth, setAuth] = useState<any>();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('userInfo') as string)
  useEffect(() => {
    const getA = () => {
      setAuth(user)
    }
    getA()
  }, [user])
  const logout = () => {
    console.log(1);

    localStorage.removeItem('userInfo')
    // setAuth(localStorage.removeItem("user"));
    setAuth(undefined);
    navigate('/')
    window.location.reload();
    console.log(auth);
  };
  return (
    <div>
      <main className='mt-[20px]'>
        <div className='w-[1080px] h-auto mx-auto'>

        <button onClick={() => {
          logout()
        }}>Đăng xuất</button>
        </div>
      </main>
    </div>
  )
}

export default ThongTinAccount