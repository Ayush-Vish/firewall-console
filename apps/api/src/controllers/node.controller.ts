import { Node, User } from "@firewall/db";
import { ApiError, getDeviceMetadata, RequestWithUser } from "@firewall/utils";
import { Request, Response, NextFunction } from "express";
import crypto from 'crypto';  
import os from 'os';


export const registerNode = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const { username } = req.user;

        // Find the user by their username
        const user = await User.findOne({ username });
        if (!user) {
            return next(new ApiError('User not found', 404));
        }

        // Get the device metadata (using the utility function)
        const deviceMetadata = getDeviceMetadata();
        const ip = req.ip || req.connection.remoteAddress;  // Capture the IP address from request

        // Generate a secure API key for the node
        const apiKey = crypto.randomBytes(20).toString('hex');

        // Create a new node entry and save it to the database
        const newNode = new Node({
            deviceName: deviceMetadata.deviceName,
            platform: deviceMetadata.platform,
            ip,  // Store the IP address of the device
            apiKey,  // Generated API key
            userId: user._id,  // Reference the user who is registering the node
            metadata: deviceMetadata  // Store additional metadata related to the device
        });

        await newNode.save();  // Save the node information in the database

        // Respond with success and the generated API key
        res.status(201).json({
            message: 'Node registered successfully',
            apiKey
        });
    } catch (error) {
        return next(new ApiError('Server error: ' + error.message, 500));
    }
};
