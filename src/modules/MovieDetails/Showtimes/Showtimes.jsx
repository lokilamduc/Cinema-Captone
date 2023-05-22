import React, { useState, useEffect } from "react";
import styles from "./ShowTime.module.scss";
import {
  apiGetHeThongRap,
  apiGetCumRap,
  apiGetLichChieuRap,
  apiGetLichChieuPhim,
} from "../../../apis/cinemaAPI";
import { apiGetMovies } from "../../../apis/movieAPI";
import { Tabs } from "antd";
import moment from "moment";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Showtimes() {
  const { TabPane } = Tabs;
  const [heThongRap, setHeThongRap] = useState([]);
  const [cumRap, setCumRap] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tabPosition, setTabPosition] = useState("left");
  const [maHeThongRap, setMaHeThongRap] = useState("BHDStar");
  const [maLichChieuPhim, setMaLichChieuPhim] = useState;

  const getHeThongRap = async () => {
    try {
      const data = await apiGetHeThongRap();
      setHeThongRap(data.content);
    } catch (error) {
      console.log(error);
    }
  };

  const getMaLichChieuPhim = async () => {
    try {
      const data = await apiGetLichChieuPhim(maLichChieuPhim);
      console.log(data.content);
      setMaLichChieuPhim(data.content);
      return data.content;
    } catch (error) {
      console.log(error);
    }
  };

  const getLichChieuRap = async () => {
    try {
      const data = await apiGetLichChieuRap(maHeThongRap);
      console.log(data.content);
      setCumRap(data.content);
      return data.content;
      // return data;
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(heThongRap);

  useEffect(() => {
    getHeThongRap();
    // getCumRap();
    getLichChieuRap();
    getMaLichChieuPhim();
  }, [maHeThongRap]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [isModalOpen]);

  const handleChangeTabPosition = (value, e) => {
    setTabPosition(value);
  };
  // console.log(cumRap);
  return (
    <>
      <div style={{ backgroundColor: "rgb(10 32 41)" }}>
        <div dir="left" className={styles.container}>
          <Tabs tabPosition={tabPosition}>
            {heThongRap.map((heThong, index) => {
              // console.log("he thong rap", heThong);
              return (
                <TabPane
                  style={{ height: "580px" }}
                  key={index}
                  tab={
                    <img
                      style={{ height: "50px" }}
                      src={heThong.logo}
                      alt="logo"
                      onClick={() => setMaHeThongRap(heThong.maHeThongRap)}
                    />
                  }
                >
                  <Tabs tabPosition={tabPosition}>
                    {cumRap[0]?.lstCumRap
                      ?.slice(0, 6)
                      .map((cumRap, subIndex) => {
                        // console.log("lst cum rap", cumRap);
                        return (
                          <TabPane
                            className={styles.cinemaTabPanel}
                            key={subIndex}
                            tab={
                              <>
                                <h1
                                  style={{
                                    fontSize: "large",
                                    textAlign: "justify",
                                    width: "500px",
                                  }}
                                >
                                  {cumRap.tenCumRap}
                                </h1>
                                <p
                                  style={{
                                    textAlign: "justify",
                                    width: "500px",
                                    color: "gray",
                                  }}
                                >
                                  {cumRap.diaChi}
                                </p>
                              </>
                            }
                          >
                            {cumRap?.LichChieuPhim.map((phim, index) => {
                              // console.log("phim", phim);
                              return (
                                <div className={styles.movie}>
                                  <div>
                                    <img
                                      src={phim.hinhAnh}
                                      style={{
                                        width: "100px",
                                        height: "150px",
                                      }}
                                      alt="img"
                                    />
                                  </div>
                                  <div style={{ marginLeft: "10px" }}>
                                    <p
                                      style={{
                                        fontSize: "large",
                                        textAlign: "justify",
                                        fontWeight: "700",
                                        textTransform: "capitalize",
                                      }}
                                    >
                                      {phim.tenPhim}
                                    </p>
                                    <div>
                                      <Container style={{ width: "345px" }}>
                                        <Row>
                                          {phim?.lstLichChieuTheoPhim
                                            .slice(0, 4)
                                            ?.map((lich, index) => {
                                              return (
                                                <Col xs={6} md={6}>
                                                  <p
                                                    key={index}
                                                    style={{
                                                      textAlign: "justify",
                                                    }}
                                                  >
                                                    {moment(
                                                      lich.ngayChieuGioChieu
                                                    ).format("hh:mm A")}
                                                  </p>
                                                </Col>
                                              );
                                            })}
                                        </Row>
                                      </Container>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </TabPane>
                        );
                      })}
                  </Tabs>
                </TabPane>
              );
            })}
          </Tabs>
        </div>
      </div>
    </>
  );
}

export default Showtimes;
