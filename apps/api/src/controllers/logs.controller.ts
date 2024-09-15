import { Log } from '@firewall/db';
import { Node } from '@firewall/db';
import { ApiError, RequestWithUser } from '@firewall/utils';
import { NextFunction, Request, Response } from 'express';

// Assuming API key validation and user-node matching middleware is already in place
export const storeLog = async (req :RequestWithUser, res:  Response, next : NextFunction) => {
    try {
        const { logType, message, additionalInfo } = req.body;

        // Extract node information from the request, added by the API key middleware
        const { id: nodeId } = req.node;
        const nodeIp = req.ip || req.headers['x-forwarded-for'];  // Capture the IP address from the request

        // Create and save a new log entry
        const log = new Log({
            nodeId,  
            ip: nodeIp,  
            logType,  
            message,
            additionalInfo  
        });

        await log.save();  // Save the log to the database

        // Respond with success
        res.status(201).json({ message: 'Log stored successfully' });
    } catch (error) {
        next(new ApiError('Server error: ' + error.message, 500));
    }
};

export const getNodeLogs = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const nodeId = req.node.id;  // Extract node ID from the request

        // Find all logs associated with this node
        const logs = await Log.find({ nodeId });
        if (!logs || logs.length === 0) {
            return res.status(404).json({ message: 'No logs found for this node' });
        }

        // Respond with the logs
        res.status(200).json(logs);
    } catch (error) {
        return next(new ApiError('Server error: ' + error.message, 500));
    }
  };

export const getNodelogsAdmin = async (req: Request, res: Response, next: NextFunction) =>  {
    try {
        const { nodeId } = req.params;
        const logs = await Log.find({ nodeId });
        if (!logs || logs.length === 0) {
            return res.status(404).json({ message: 'No logs found for this node' });
        }
        res.status(200).json(logs);
    } catch (error) {
        return next(new ApiError('Server error: ' + error.message, 500));
    }
  }
