

import { Request, Response, NextFunction } from 'express';


export const fileDownloadAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    next();
    // const token = req.headers.authorization?.split(' ')[1];
    //
    // if (!token) {
    //     return res.status(401).json({ message: '인증 정보가 없습니다.' });
    // }

    // jwt.verify(token, 'secret-key', (err, decoded) => {
    //     if (err) {
    //         return res.status(401).json({ message: '인증에 실패했습니다.' });
    //     }
    //
    //     req.user = decoded;
    //     next();
    // });
};
