import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signout } from "../../slices/userSlice";
import styles from "./Header.module.scss";

function Header() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(signout());
    localStorage.removeItem("user");
  };

  const handleSignin = () => {
    //chuyển sang trang /signin
    navigate("/signin");
  };

  return (
    <div className={styles.header}>
      <div className={styles.header__logo}>
        <h3 style={{ fontSize: "x-large" }}>Cybermovie</h3>
      </div>
      <div className={styles.header__menu}>
        <a href="#movie">
          <h4>Lịch Chiếu</h4>
        </a>
        <a href="#showtime">
          <h4>Cụm Rạp</h4>
        </a>
        <a href="#phim">
          <h4>Phim Hot</h4>
        </a>
        <a href="#footer">
          <h4>Ứng Dụng</h4>
        </a>
      </div>
      <div className={styles.header__right}>
        {user ? (
          <>
            <p className={styles["header__right--user"]}>{user.hoTen}</p>
            <button onClick={handleLogout}>Đăng xuất</button>
          </>
        ) : (
          <button onClick={handleSignin}>Đăng Nhập </button>
        )}
      </div>
    </div>
  );
}

export default Header;
