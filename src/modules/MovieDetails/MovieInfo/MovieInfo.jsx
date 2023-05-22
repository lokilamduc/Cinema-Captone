import React, { useEffect, useState } from "react";
import { apiGetMovieDetails } from "../../../apis/movieAPI";
import bookingMovieAPI from "../../../apis/bookingMovieAPI";
import styles from "./MovieInfo.module.scss";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import ReactPlayer from "react-player";

function MovieInfo({ movieId }) {
  const [movie, setMovie] = useState({});

  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();
  const [trailer, setTrailer] = useState("");

  const getMovieDetails = async () => {
    try {
      const data = await apiGetMovieDetails(movieId);
      setMovie(data.content);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovieDetails();
  }, []);

  const handleOpenModal = (trailer) => {
    setOpen(true);
    setTrailer(trailer);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className={styles.OverView}>
        <div className="container">
          <div className={styles.OverViewContent}>
            <div className="col-4">
              <div className={styles.ImgMovie}>
                <img src={movie.hinhAnh} alt="" />
              </div>
            </div>
            <div className="col-7" style={{ marginLeft: "50px" }}>
              <div className="DetailMovie">
                <h1>{movie.tenPhim}</h1>
                <p>{movie.moTa}</p>
                <p>Đánh giá: {movie.danhGia} / 10</p>
                <p>
                  Ngày khởi chiếu:
                  {moment(movie.ngayKhoiChieu).format("DD/MM/YYYY")}
                </p>
                <div className={styles.button}>
                  <button onClick={() => handleOpenModal(movie.trailer)}>
                    Xem trailer
                  </button>

                  <button
                    className={styles.buyTicket}
                    onClick={() => navigate(`/booking`)}
                  >
                    Mua vé ngay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ position: "relative" }}>
        <Modal
          show={isOpen}
          onHide={handleCloseModal}
          backdropOpacity={0.7}
          style={{
            position: "absolute !important",
            top: "100% !important",
            width: "50% !important",
            height: "650px !important",
            zIndex: "10 !important",
            marginLeft: "25% !important",
            marginRight: "25% !important",
            marginTop: "180px !important",
          }}
        >
          <Modal.Header closeButton style={{ padding: "10px" }}></Modal.Header>
          <Modal.Body
            style={{
              height: "500px",
            }}
          >
            <ReactPlayer
              className={styles.reactPlayer}
              url={trailer}
              width="100%"
              height="100%"
              controls={true}
              playing={isOpen}
              // onPause={handleCloseModal}
            />
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default MovieInfo;
