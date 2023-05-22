import React from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { signin } from "../../../slices/userSlice";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { MdAccountCircle } from "react-icons/md";
import { Checkbox } from "@mantine/core";
import styles from "./SignIn.module.scss";
import swal from "sweetalert";

// Định nghĩa các xác thực cho từng input
const schema = yup.object({
  taiKhoan: yup.string().required("Tài khoản không được để trống"),
  matKhau: yup
    .string()
    .required("Mật khẩu không được để trống")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      "Mật khẩu ít nhất 8 kí tự, phải có 1 chữ hoa, 1 chữ thường và 1 số"
    ),
});

function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // Khai báo các giá trị khởi tạo cho các input
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
    },
    mode: "onTouched",
    // Khai báo schema validation bằng yup
    resolver: yupResolver(schema),
  });

  const { user, isLoading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  const onSubmit = (values) => {
    dispatch(signin(values));
  };

  const onError = (errors) => {
    console.log(errors);
  };

  // Kiểm tra nếu có thông tin user => đã đăng nhập => điều hướng về trang Home
  if (user) {
    // swal("Đăng nhập thành công", "" , "success" );
    const url = searchParams.get("redirectUrl") || "/";
    return <Navigate to={url} />;
  }

  return (
    <div className={styles.signIn}>
      <div className={styles.signInContent}>
        <div className={styles.iconSignIn}>
          <MdAccountCircle />
        </div>

        <h1>Đăng nhập</h1>

        <form className={styles.formSignIn} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputSignIn}>
            <label>Tài khoản</label>
            <input
              type="text"
              placeholder="Tài khoản"
              {...register("taiKhoan", {
                required: {
                  value: true,
                  message: "Tài khoản không được để trống!",
                },
              })}
            />
            {errors.taiKhoan && (
              <p className={styles.txtError}>{errors.taiKhoan.message}</p>
            )}
          </div>

          <div className={styles.inputSignIn}>
            <label>Mặt khẩu</label>
            <input
              type="text"
              placeholder="Mật khẩu"
              {...register("matKhau", {
                required: {
                  value: true,
                  message: "Mật khẩu không được để trống",
                },
              })}
            />
            {errors.matKhau && (
              <p className={styles.txtError}>{errors.matKhau.message}</p>
            )}
          </div>

          <div className="text-start my-3">
            <Checkbox label="Nhớ tài khoản" color="orange" />
          </div>

          {error && <p className={styles.txtError}>{error}</p>}
          <div className={styles.btnSignIn}>
            <button>Đăng nhặp</button>
          </div>
        </form>
        <div className={styles.linkSignUp}>
          <p>
            Chưa có tài khoản
            <span>
              <Link to="/SignUp">Đăng kí ngay </Link>
            </span>
            !
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signin;

// const handleSubmit = (obSubmit) => {
//   return () => {
//     // logic ...
//     obSubmit(values)
//   }
// }

// onSubmit={handleSubmit(obSubmit)}
