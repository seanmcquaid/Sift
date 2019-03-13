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
    }

    return(
        <div className="carouselWrapper">
            <div className="carouselText">
                <img className="mainLogo" src='../../../images/logo/logoOutline2.png' alt="logo" />
                <h1>sift</h1>
            </div>
            <Slider {...settings} className="carouselImageRow" >
                    <div className="slick-image">
                        <img src="/images/carousel/1.jpg" alt="carouselImage"/>
                    </div>
                    <div className="slick-image">
                        <img src="/images/carousel/2.jpg" alt="carouselImage"/>
                    </div>
                    <div className="slick-image">
                        <img src="/images/carousel/3.jpg" alt="carouselImage"/>
                    </div>
                    <div className="slick-image">
                        <img src="/images/carousel/4.jpg" alt="carouselImage"/>
                    </div>
                    <div className="slick-image">
                        <img src="/images/carousel/5.jpg" alt="carouselImage"/>
                    </div>
                    <div className="slick-image">
                        <img src="/images/carousel/6.jpg" alt="carouselImage"/>
                    </div>
            </Slider>
        </div>
      
    )
}

export default Carousel;