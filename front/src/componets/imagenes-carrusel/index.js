// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "./styles.css";

// import required modules
import { Navigation } from "swiper";

const Carrusel = ({imagen1, imagen2, imagen3, imagen4, imagen5}) => {
  
  const lista = [imagen1, imagen2, imagen3, imagen4, imagen5]
  return (
    <>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">

        {
          lista.map((imagen,index) => (
            imagen.length>1 &&
            <SwiperSlide key={index} > <img src={`${imagen}`} alt="" /> </SwiperSlide>)
            )
        }

      </Swiper>
    </>
  );
}

export default Carrusel