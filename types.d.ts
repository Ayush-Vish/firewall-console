export interface ResponseWithUser extends Response  {
      user : {
            id : string;
            email : string;
            username : string;
            role : string;
      },
      node : {
            id : string;
            apiKey : string;
            userId : string;
      }
      
}