import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

//Component làm nhiệm vụ kiểm tra khi truy cập vào 1 route cần yêu cầu đăng nhập mới có thể truy cập được
//sử dụng: <ProtectedRoute>  <Booking/>  </ProtectedRoute>
function ProtectedRoutes({ children }) {
  const { user } = useSelector((state) => state.user);
  const { pathname } = useLocation();

  //trường hợp chưa đăng nhập, điều hướng về trang đăng nhập
  if (!user) {
    return <Navigate to={`/signin?redirectUrl=${pathname}`} replace />;
  }
  //trường hợp đã đăng nhập => cho phép truy cập

  return children;
}

export default ProtectedRoutes;
