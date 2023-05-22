import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';


function AdminRoute({ children }) {
  const { user } = useSelector((state) => state.user);

  // Trường hợp chưa đăng nhập và maLoaiNguoiDung không phải là QuanTri, điều hướng về trang Home
  if (!user || user.maLoaiNguoiDung !== "QuanTri") {
    return <Navigate to="/" replace />;
}
return children;
}

export default AdminRoute