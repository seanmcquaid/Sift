import React from 'react'
import './Splash.css'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Carousel(props){
    const settings = {
        accessibility: false,
        arrows:false,
        infinite: true,
        speed: 400,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        // adaptiveHeight:true
    }

    return(
        <Slider {...settings} className="carouselRow" >
                <div className="slick-image">
                    <img src="/images/carousel/1.jpg"/>
                </div>
                <div className="slick-image">
                    <img src="/images/carousel/2.jpg"/>
                </div>
                <div className="slick-image">
                    <img src="/images/carousel/3.jpg"/>
                </div>
                <div className="slick-image">
                    <img src="/images/carousel/4.jpg"/>
                </div>
                <div className="slick-image">
                    <img src="/images/carousel/5.jpg"/>
                </div>
                <div className="slick-image">
                    <img src="/images/carousel/6.jpg"/>
                </div>
        </Slider>
      
    )
}

export default Carousel;