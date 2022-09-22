
import React from 'react';
import './GaleryContainer.css';


function GaleryContainer() {
    return (
        <div className={'galeryGridContainer'} >
            <div className="item">
                <img src="https://picsum.photos/200/100" alt="img1" />
            </div>
            <div className="item">
                <img src="https://picsum.photos/200/200" alt="img1" />
            </div>
            <div className="item">
                <img src="https://picsum.photos/200/301" alt="img1" />
            </div>
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

