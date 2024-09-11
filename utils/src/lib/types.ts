
import { Request } from "express";
export interface RequestWithUser extends Request  {
      user : {
            id : string;
            email : string;
            username : string;
            role : string;
      },
      node : {
            id? : string;
            apiKey? : string;
            userId : string;
            ip?:string,
      }
      
}

