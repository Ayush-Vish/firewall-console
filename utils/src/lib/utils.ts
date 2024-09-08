
import { sign } from 'jsonwebtoken';
import { Response } from 'express';
import { Mongoose, ObjectId, Schema } from 'mongoose';


export function utils(): string {
  return 'utils';
}


export class ApiResponse  {
  constructor (res:Response , statusCode : number , message : string , data : unknown ) {
    res.status(statusCode).json({
      message,
      data
    })
  }
}

export class ApiError extends Error {
    status:number;
    constructor(message:string , status:number) {
      super(message);
      this.status = status;
      console.log( "Error Message: =>",  message);
      Error.captureStackTrace(this, this.constructor);


    }
}
type CookieOptions =  {
  maxAge: number;
  httpOnly: boolean;
  secure: boolean;
  sameSite: "none";

}
export const cookieOptions : CookieOptions = {
  maxAge: 7 * 24 * 60 * 60 * 100,
  httpOnly: true,
  secure: true,
  sameSite: "none",
};

