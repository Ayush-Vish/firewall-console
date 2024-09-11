import { ApiError } from "./utils"
import jwt from "jsonwebtoken"
import { Node, User } from "@firewall/db"
import { NextFunction , Request  , Response} from "express"
import { RequestWithUser } from "./types"
export const verifyJWT = (async(req : RequestWithUser , res : Response, next : NextFunction) => {
      try {
          const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

          if (!token) {
              throw new ApiError( "Unauthorized request",401)
          }
      
          const decodedToken = jwt.verify(token, "SOME_SECRET")
      
          const user = await User.findById(decodedToken?.id).select("-password -refreshToken")
      
          if (!user) {
              
              throw new ApiError( "Invalid Access Token" ,401)
          }
      
          req.user = {
            id :user.id, 
            email : user.email, 
            role : user.role, 
            username : user.username
          };
          next()
      } catch (error) {
          return next(new ApiError('An error occurred ' +  error.message, 500));
      }
      
  })



  export const apiKeyAuthMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Unauthorized, no API Key provided' });
        }
        const apiKey = authHeader.split(' ')[1]; // Extract the API Key

        // Find the node by API key
        const node = await Node.findOne({ apiKey });
        if (!node) {
            return res.status(401).json({ error: 'Unauthorized, invalid API Key' });
        }

        // Find the user associated with the node
        const user = await User.findById(node.userId);
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized, user not found' });
        }

        // First-time IP check and update
        const nodeIp = req?.ip  ; // Capture IP from request
        if (!node.ip) {
            node.ip = nodeIp; // Store IP if it's not already set
            node.lastPing = new Date(); // Update the last ping timestamp
            await node.save();
        }

        // Attach node and user info to Responsethe request object for further use
        req.node = {
            id: node._id as unknown as string,
            apiKey: node.apiKey,
            userId: node.userId as unknown as string
        };
        req.user = {
            id: user._id as unknown as string,
            email: user.email,
            username: user.username,
            role: user.role
        };

        // Proceed to the next middleware or route handler
        next();
    } catch (err) {
        console.error('API Key middleware error:', err);
        return next(new ApiError("API_KEY DEPRECATED" , 400 ) ) ;
    }
};


export const adminAuthMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Forbidden: Admins only' });
        }
        next();
    } catch (error) {
        return next(new ApiError('Server error: ' + error.message, 500));
    }
};