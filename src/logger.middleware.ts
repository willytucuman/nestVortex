import { Request, Response, NextFunction } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
    if(req.method == "GET"){
      console.log(`Request...`);
    }else{
      console.log("Another method different to get")
  }
  next();
};