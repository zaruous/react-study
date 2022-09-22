
import React from 'react';
import './GaleryContainer.css';


function GaleryContainer() {
    return (
        <div className={'galeryGridContainer'} >
            <div className="item">
                <img src="https://picsum.photos/200/300" alt="img1" />
            </div>
            <div className="item">
                <img src="/images/20190812_113208.jpg"/>
            </div>
            <div className="item">C</div>
            <div className="item">D</div>
            <div className="item">E</div>
            <div className="item">F</div>
            <div className="item">G</div>
            <div className="item">H</div>
            <div className="item">I</div>
        </div>
    );
}

export default  GaleryContainer;

