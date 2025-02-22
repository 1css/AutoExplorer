import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { populardata } from "../../Data/data";
import UpcomingCard from "./UpcomingCard";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchUpcomingCars } from "../../actions/FeaturedAction";

function Upcoming() {
  const upcomingcars = useSelector((state) => state.upcomingcars);
  const { upcom, loading } = upcomingcars || {};

  return (
    <div>
      <p className="text-center my-3 tabs-title">Upcoming Cars</p>
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
        height={400}
      >
        {upcom?.map((item, index) => (
          <SwiperSlide key={index}>
            <UpcomingCard
              image={item.image}
              title={item.name}
              price={item.transmissionType}
              rating={item.status}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Upcoming;
