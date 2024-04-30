import { Request, Response, NextFunction } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
//   if(req.method=== "GET"){
//     console.log(`Request...`);
//   }else{
//     console.log("Another method different to get")
// }
 const {authorization} = req.headers
 if(!authorization || authorization !== "admin"){
res.status(404).json("not authorized")
  return 'you are not authorized'
} else{
  console.log("you are welcome")
 }
  
  next();
};