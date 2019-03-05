import React from 'react'
import './Splash.css'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { relative } from 'path';

function Carousel(props){
    const settings = {
        accessibility: false,
        arrows:false,
        infinite: true,
        speed: 400,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        // position:relative
    }

    return(
        <div className="carouselWrapper">
            <div className="carouselText">
                <h1>Sift</h1>
            </div>
            <Slider {...settings} className="carouselImageRow" >
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
        </div>
      
    )
}

export default Carousel;