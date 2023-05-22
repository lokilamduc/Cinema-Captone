import React, { useState, useEffect } from "react";
import { apiGetBanners } from "../../../apis/movieAPI";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./Banner.module.scss";
import "swiper/css/navigation";

import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper";
import SwiperCore, { EffectFade } from "swiper";
import "swiper/swiper-bundle.css";

function Banner() {
  const [banners, setBanners] = useState([]);
  const [error, setError] = useState(null);

  const getBanners = async () => {
    try {
      const data = await apiGetBanners();
      console.log(data);
      setBanners(data.content);
    } catch (error) {
      setError(error.response?.data?.content);
    }
  };
  useEffect(() => {
    getBanners();
  }, []);

  if (error) return null;

  // carousel: slick, swiper

  return (
    <Swiper
      navigation={true}
      pagination={{ clickable: true }}
      modules={[Navigation, Pagination, EffectFade]}
      className={styles.mySwiper}
    >
      {banners.map((item, index) => (
        <SwiperSlide key={index} className="swiper-slide">
          <img
            src={item.hinhAnh}
            alt={item.maBanner}
            className={styles.bannerImg}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Banner;
