import { Swiper, SwiperSlide } from 'swiper/react';
import './Header.css' 
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import LazyLoad from "react-lazy-load";
import { useNavigate } from 'react-router-dom';

import 'swiper/css/effect-fade';    
import { EffectFade, Pagination, Navigation, Autoplay } from 'swiper/modules';

export default function Header({setActiveState}){


const navigateToFAQ = useNavigate()
const revertToFAQ =()=>{
  setActiveState((prev)=> prev === "Selected")
  return navigateToFAQ("/faqPage")
}




  return(
      <LazyLoad>
        <div className='header'>
            <div>
            <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
 
        effect={"fade"}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[EffectFade, Pagination, Navigation, Autoplay]}
        className="mySwiper"
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
      >

        
<SwiperSlide>
          <div className="header" style={{
            backgroundImage:
              "url(/foodhubcover1.webp)",
              backgroundPosition : "center",
              backgroundSize : "cover",
          }}>
            <div className='first-cover-2'>
            <h3> We know the value</h3>
            <h3>Use the Smart Filter feature to <br/> accomodate your budget</h3>
            <a href="#prod-display-menu1"><button> Take me to smart filter</button></a>
            </div>
            </div>   
            </SwiperSlide>



        
            <SwiperSlide>
          <div className="header"style={{
            backgroundImage:
              "url(/foodhubcover2.webp)",
              backgroundSize : "cover",
              backgroundRepeat : "no-repeat",
          }}>
                <div className="first-cover-1">
                  <div className='first-cover-post'>
                <p> One Stop Solutions. <br/> To all the store needs  </p>
                <a href="#productsShow"><button>See more</button></a>
                </div>
                </div>
            </div>   
            </SwiperSlide>



            <SwiperSlide>
          <div className="header"style={{
            backgroundImage : "url(/product-banner.png)",
            backgroundColor: "#ff5733", // Replace with your desired solid color
            backgroundSize: "cover", // Ensure the image covers the entire div
            backgroundPosition: "center", // Center the background image
          }}>
                <div className="first-cover-3">
                <h3>If any queries <br/> Please vist our FAQ Page</h3>
                <button onClick={revertToFAQ}>Visit FAQ</button>
                </div>
                
         
         
            </div>   
            </SwiperSlide>



            </Swiper>
        </div>
        </div>
        </LazyLoad>
    )
}