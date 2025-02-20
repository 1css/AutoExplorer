import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { populardata } from "../../Data/data";
import TrendingCard from "./TrendingCard";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

function Trending() {
  const trendingcars = useSelector((state) => state.trendingcars);
  const { trending, loading } = trendingcars || {};
  return (
    <div>
      <p className="text-center my-3 tabs-title">Trending Cars</p>
      <Swiper
        spaceBetween={20}
        slidesPerView={4}
        navigation
        modules={[Navigation]}
        breakpoints={{
          1024: { slidesPerView: 3 },
          768: { slidesPerView: 2 },
          0: { slidesPerView: 1 },
        }}
      >
        {trending.map((item, index) => (
          <SwiperSlide key={index}>
            <TrendingCard
              image={item.image}
              title={item.name}
              price={item.fuelType}
              rating={item.carPrice}
              priceunit={item.priceUnit}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Trending;
