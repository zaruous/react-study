import {Request, Response} from "express";
import RequestUtil from "../../../api/RequestUtil";


const ListIUImages =  (req : Request, res : Response) => {
    const type  = req.params.type;


    const ru = new RequestUtil({
        url: "http://localhost:8191/list"
        ,method:"get"
    });
    ru.request().then(res =>{
        res.data
    })

    const imageDataList = [
        'https://w7.pngwing.com/pngs/14/531/png-transparent-iu-monday-afternoon-actor-singer-kpop-celebrities-black-hair-photography-thumbnail.png',
        ,'https://w7.pngwing.com/pngs/666/908/png-transparent-iu-k-pop-singer-south-korea-asxfgf-shoe-palette-top-thumbnail.png'
        ,'https://w7.pngwing.com/pngs/742/29/png-transparent-iu-south-korea-k-pop-lee-ji-eun-black-hair-girl-fashion-model-thumbnail.png'
        ,'https://w7.pngwing.com/pngs/27/983/png-transparent-iu-south-korea-singer-shirt-k-pop-lee-ji-eun-white-girl-top-thumbnail.png'
        ,'https://mblogthumb-phinf.pstatic.net/MjAxNzAzMDhfMTIz/MDAxNDg4OTYwOTk0MDcy.OJThDpQBK0FSAn-NLsgFbYk65ZFD4SlHZw6n1mjSPB4g.Su0IzirSVkBQcC4wcpFGaRilK8us8uK4-tZDHY1IFM4g.JPEG.goyoungsuk/%EC%95%84%EC%9D%B4%EC%9C%A010.jpg?type=w2'
    ];

    console.log(imageDataList);
    res.send({ imageDataList });
};

export { ListIUImages } ;