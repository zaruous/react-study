
import React from 'react';
import './GaleryContainer.css';


function GaleryContainer() {


    return (
        <div className='galeryContainer'>

                <div className='galeryGridContainer' >
                    <div className='item divShowImage'></div>
                    <div className="item title">
                        <img src="./images/melon.png" alt="img1" />
                        <div>1</div>
                    </div>
                    <div className="item title2">
                        <img src="https://picsum.photos/200/101" alt="img1" />
                        <div>2</div>
                    </div>
                    <div className="item">
                        <img src="https://picsum.photos/200/102" alt="img1" />
                        <div>3</div>
                    </div>
                    <div className="item">
                        <img src="https://picsum.photos/200/103" alt="img1" />
                        <div>4</div>
                    </div>
                    <div className="item">
                        <img src="https://picsum.photos/200/104" alt="img1" />
                        <div>5</div>
                    </div>
                    <div className="item">
                        <img src="https://picsum.photos/200/105" alt="img1" />
                        <div>6</div>
                    </div>
                    <div className="item">
                        <img src="https://picsum.photos/200/106" alt="img1" />
                        <div>7</div>
                    </div>
                    <div className="item"><div>8</div></div>
                    <div className="item"><div>9</div></div>
                </div>

        </div>
    );
}

export default  GaleryContainer;

