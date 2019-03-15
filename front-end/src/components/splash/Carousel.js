import React from 'react'
import './Splash.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

function CarouselFunc(props){
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
                <img className="mainLogo" src='../../../images/logo/logoOutline.png' alt="logo" />
                {/* <h1>sift</h1> */}
            </div>
            <Carousel {...settings} className="carouselImageRow" >
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
            </Carousel>
        </div>
      
    )
}

export default CarouselFunc;