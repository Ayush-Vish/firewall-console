import { Node, User } from "@firewall/db";
import { ApiError, getDeviceMetadata, RequestWithUser } from "@firewall/utils";
import { Request, Response, NextFunction } from "express";
import crypto from 'crypto';  

export const registerNode = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const { username } = req.user;
        const user = await User.findOne({ username });
        if (!user) {
            return next(new ApiError('User not found', 404));
        }
        const deviceMetadata = getDeviceMetadata();
        const ip = req.ip || req.connection.remoteAddress; 

        const apiKey = crypto.randomBytes(20).toString('hex');


        const newNode = new Node({
            deviceName: deviceMetadata.deviceName,
            platform: deviceMetadata.platform,
            ip,  
            apiKey,  
            userId: user._id, 
            metadata: deviceMetadata  
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
