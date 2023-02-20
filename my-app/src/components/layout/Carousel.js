import React, {useEffect, useState} from 'react';
import './Carousel.css';
import Request from "../../api/Request"

const Carousel = () => {

    const [images, setImages] =  useState([]);

    useEffect(()=>{

        Request.get("/api-service/images/IU", {}, {},
            (res) =>{
                const ret = res.data;
                console.log(ret.imageDataList);
                setImages(ret.imageDataList);
            },
         (err) =>{
            console.log(err);
        });
    }, images);


    const [currentIndex, setCurrentIndex] = useState(0);
    const handlePrevClick = () => {
        if (currentIndex === 0) {
            setCurrentIndex(images.length - 1);
        } else {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleNextClick = () => {
        if (currentIndex === images.length - 1) {
            setCurrentIndex(0);
        } else {
            setCurrentIndex(currentIndex + 1);
        }
    };

    return (
        <div className="carousel">
            <h1>Carousel layout</h1>
            <div className="carousel-slide" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {images.map((image, index) => (
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
                {images.map((image, index) => (
                    <div className="carousel-prev-slide-item" style={{ borderStyle:'solid'}}>
                        <img key={index} src={image} alt="a" />
                    </div>
                ))}
            </div>
        </div>
    );
};
export default Carousel;