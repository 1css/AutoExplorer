import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { populardata } from "../../Data/data";
import FeatureCard from "./FeatureCard";
import "../../styles/components/popular2.css";

function Popular2() {
  return (
    <div className="popular-slider">
      <p className="text-center my-3 tabs-title">Popular Cars</p>
      <Swiper
        spaceBetween={20} // Gap between slides
        slidesPerView={4} // Number of slides visible at a time
        navigation
        modules={[Navigation]}
        breakpoints={{
          1024: { slidesPerView: 3 },
          768: { slidesPerView: 2 },
          0: { slidesPerView: 1 },
        }}
      >
        {populardata.map((item, index) => (
          <SwiperSlide key={index}>
            <FeatureCard
              image={item.image}
              title={item.title}
              price={item.price}
              rating={item.rating}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Popular2;
