import axiosClient from "./axiosClient";

const bookingMovieAPI = {
  getListBooking : (maLichChieu) => {
      return axiosClient.get("QuanLyDatVe/LayDanhSachPhongVe", {
          params: {
              MaLichChieu: maLichChieu,
          }
      })
  },

  postBookingTicket : (DanhSachVe) => {
      return axiosClient.post("QuanLyDatVe/DatVe", DanhSachVe)
  }   
}

export default bookingMovieAPI;