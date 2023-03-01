import React, {useEffect, useState} from 'react';
import './Carousel.css';


const Carousel = (props) => {
    const [currentIndex, setCurrentIndex] = useState(0);


    const handlePrevClick = () => {
        if (currentIndex === 0) {
            setCurrentIndex(props.images.length - 1);
        } else {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleNextClick = () => {
        if (currentIndex === props.images.length - 1) {
            setCurrentIndex(0);
        } else {
            setCurrentIndex(currentIndex + 1);
        }
    };

    return (
        <div className="carousel">
            <div className="carousel-slide" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {props.images.map((image, index) => (
                    <div key={index} className="carousel-slide-item">
                        <img src={image} alt="a" />
                    </div>
                ))}
            </div>
            <div>{currentIndex}</div>


            <div className="carousel-controls">
                <button onClick={handlePrevClick}>Prev</button>
                <button onClick={handleNextClick}>Next</button>
            </div>
            <div className="carousel-preview" style={{ transform: `translateX(-${(currentIndex) * 100}%)` }}>
                {props.images.map((image, index) => (
                    <div className="carousel-prev-slide-item">
                        <img key={index} src={image} alt="a" />
                    </div>
                ))}
            </div>
        </div>
    );
};
export default Carousel;