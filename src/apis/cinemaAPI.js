import axiosClient from "./axiosClient";

export const apiGetHeThongRap = async () => {
  const { data } = await axiosClient.get("/QuanLyRap/LayThongTinHeThongRap");
  return data;
};

export const apiGetCumRap = async (cinemaID) => {
  const { data } = await axiosClient.get(
    "/QuanLyRap/LayThongTinCumRapTheoHeThong",
    {
      params: {
        maHeThongRap: cinemaID,
      },
    }
  );
  return data;
};

export const apiGetLichChieuRap = async (cinemaID) => {
  const { data } = await axiosClient.get(
    "/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP14",
    {
      params: {
        maHeThongRap: cinemaID,
      },
    }
  );
  return data;
};

// export const apiGetLichChieuPhim = async (maPhim) => {
//   const { data } = await axiosClient.get(
//     "/QuanLyRap/LayThongTinLichChieuPhim",
//     {
//       params: {
//         MaPhim: maPhim,
//       },
//     }
//   );
//   return data;
// };
