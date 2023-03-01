import Carousel from "../layout/Carousel";
import React, {useEffect, useState} from "react";
import Request from "../../api/Request"
import ImageUpDownloadComponent from "./ImageUpDownloadComponent";

export default function ImageCarouselView (){
    const [images, setImages] =  useState([]);
    useEffect(()=>{
        updateImg();
    }, []);

    const updateImg= ()=>{
        Request.get("/img/list", {}, {},
            (res) =>{
                const ret = res.data;
                const imglist = ret.map( a => "/img/download/" + a.filename);
                setImages(imglist);
            },
            (err) =>{
                console.log(err);
            });
    }


    return (<div className="div-data-content">
        <h1>앨범(Carousel layout)</h1>
         <Carousel images={images}></Carousel>
         <ImageUpDownloadComponent updateImg = {updateImg}></ImageUpDownloadComponent>
         </div>);
}