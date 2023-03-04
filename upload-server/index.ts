import express from "express";
import multer, {DiskStorageOptions} from "multer";
import path from "path";
const config = require("./config.json");
const fs = require('fs');
const app = express();
import { Response, Request } from "express";
import {Model} from "sequelize";
const { Sequelize, DataTypes } = require('sequelize');
import {fileDownloadAuthMiddleware} from './FileDownloadAuthMiddleware';

interface File {
    filename: string;
    originalname: string;
    mimetype: string;
    size: number;
}

class Image extends Model {

    public filename!: string;
    public originalname! : string;

}

const sequelize = new Sequelize(config.db.mysql.database, config.db.mysql.user, config.db.mysql.password, {
    host: config.db.mysql.host,
    dialect: 'mysql'
});

// 데이터베이스 모델 정의
Image.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        filename: {
            type: DataTypes.STRING,
            allowNull: false
        },
        originalFileName:{
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'Image'
    }
);

// 데이터베이스 연결
sequelize.authenticate()
    .then(() => console.log('데이터베이스에 연결되었습니다.'))
    .catch((err : any)  => console.error('데이터베이스 연결 오류:', err));

// 파일 업로드를 처리할 미들웨어 생성
const storage = multer.diskStorage({
    destination: function(req : Request, file : File, cb) {
        cb(null, config.server.imageDir);
    },
    filename: function(req : Request, file : File, cb) {
        const ext = path.extname(file.originalname);
        //한글 깨짐 수정
        const filename = decodeURIComponent(path.basename(file.originalname, ext));
        //console.log(filename + '-' + Date.now() + ext);
        cb(null, filename + '-' + Date.now() + ext);
    },
} as DiskStorageOptions);

const upload = multer(
    { storage: storage,
    limits:{
        fileSize: 1024 * 1024 * 1024 * 20 /*20MB*/,
    }

} as  multer.Options);

app.get("/img/list", (req: Request, res : Response) =>{

    const fetchCount = req.params["fetchCount"];
    let intCount : number = 100;
    if(fetchCount)
    {
        intCount = Number.parseInt( fetchCount, 10);
    }

    if(intCount > 100)
        intCount = 100;

    Image.findAll({ limit: intCount, order: [
        ['updatedAt', 'DESC']
        ] })
        .then(images => {
            res.json(images);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('이미지 조회 오류');
        });
});

// 파일 업로드를 처리하는 라우터 생성
app.post('/img/upload', upload.array('files'), (req : Request, res: Response) => {

    if(!req.files)
    {
        res.send("업로드할 파일이 존재하지 않습니다.");
        return;
    }
    const files: File[] = req.files as File[];

    files.forEach((file : File) => {
        // @ts-ignore
        const originalFileName = decodeURIComponent(file.originalname);
        const filename = file.filename;

        console.log(`${filename} //  ${originalFileName}`);
        Image.create({ filename , originalFileName } )
            .then((image: Model<any, any>) => {
                console.log('파일 정보가 데이터베이스에 저장되었습니다.');
            })
            .catch((err: any) => {
                console.error('파일 정보 저장 오류:', err);
            });
    });

    res.send('파일이 업로드되었습니다.');
});

// 파일 다운로드를 처리하는 라우터 생성
app.get('/img/download/:filename', fileDownloadAuthMiddleware , function(req : Request, res: Response) {
    const filename = decodeURIComponent(req.params.filename);

    // 파일명 유효성 검사
    const regex = /^[a-zA-Z0-9_-]+.[a-zA-Z]{3,4}$/; // 파일명이 알파벳, 숫자, 하이픈, 언더스코어로만 이루어진 파일명일 경우
    if (!regex.test(filename)) {
        res.status(400).send('파일명이 올바르지 않습니다.');
        return;
    }

    const filepath = path.join(config.server.imageDir, filename);
    console.log(filepath);
    if (fs.existsSync(filepath)) {
        res.set([
            {'Cache-Control': 'public, max-age=86400'},
            {'Expires': new Date(Date.now() + 86400 * 1000).toUTCString()}
        ]);
        res.download(filepath, filename);
    } else {
        res.status(404).send('파일이 존재하지 않습니다.');
    }
});

const PORT = config.server.port || 8191;
// 서버 실행
app.listen(PORT, function() {
    console.log('서버가 시작되었습니다.');
});