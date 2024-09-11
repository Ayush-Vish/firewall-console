import { Node, User } from "@firewall/db";
import { ApiError, getDeviceMetadata, RequestWithUser } from "@firewall/utils";
import { Request, Response, NextFunction } from "express";
import crypto from 'crypto';  
import os from 'os';



export const registerNode = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const { username } = req.user;
        
        const user = await User.findOne({ username });
        if (!user) {
            return next(new ApiError('User not found', 404));
        }

        const deviceMetadata = getDeviceMetadata();
        const ip = req.ip || req.connection.remoteAddress; 
        
        // Generate API key for the node
        const apiKey = crypto.randomBytes(20).toString('hex');
        
        // Create a new node entry in the database
        const newNode = new Node({
            deviceName: deviceMetadata.deviceName,
            platform: deviceMetadata.platform,
            ip,  // First-time IP is captured here
            apiKey,
            userId: user._id,
            metadata: deviceMetadata // Store all device-related information
        });

        await newNode.save();

        res.status(201).json({
            message: 'Node registered successfully',
            apiKey
        });
    } catch (error) {
        return next(new ApiError('Server error: ' + error.message, 500));
    }
};
