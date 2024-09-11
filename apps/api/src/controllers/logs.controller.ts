import { Log } from '@firewall/db';
import { Node } from '@firewall/db';
import { ApiError, RequestWithUser } from '@firewall/utils';
import { NextFunction, Request, Response } from 'express';

// Assuming API key validation and user-node matching middleware is already in place
export const storeLog = async (req, res, next) => {
    try {
        const { logType, message, additionalInfo } = req.body;

        // Get node information from the request, which was attached by the middleware
        const { id: nodeId } = req.node;
        const nodeIp = req.ip || req.headers['x-forwarded-for'];  // Capture IP address from request

        // Create and store the log entry
        const log = new Log({
            nodeId,
            ip: nodeIp,
            logType,
            message,
            additionalInfo
        });

        await log.save();

        res.status(201).json({ message: 'Log stored successfully' });
    } catch (error) {
        next(new ApiError('Server error: ' + error.message, 500));
    }
};

export const getNodeLogs = async (req: RequestWithUser, res: Response, next: NextFunction) => {
      const nodeId = req.node.id; // Node ID comes from middleware
      try {
          const logs = await Log.find({ nodeId });
          if (!logs || logs.length === 0) {
              return res.status(404).json({ message: 'No logs found for this node' });
          }
          res.status(200).json(logs);
      } catch (error) {
          return next(new ApiError('Server error: ' + error.message, 500));
      }
  };

