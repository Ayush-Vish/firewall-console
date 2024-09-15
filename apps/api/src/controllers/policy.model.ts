import { ApiError, RequestWithUser } from '@firewall/utils';
import { Request, Response, NextFunction  } from 'express';

export const storePolicy = async (req: RequestWithUser, res: Response , next :NextFunction) =>  {
      try {
            const nodeId = req.node.id;

      } catch (error) {
            return next(new ApiError('Server error: ' + error.message, 500));
      }
}



export const addPolicyAdmin = async (req: Request, res: Response, next: NextFunction) =>   {
      try {
            const { nodeId } = req.params;
            
      } catch (error) {
            return next(new ApiError('Server error: ' + error.message, 500));
      }
}