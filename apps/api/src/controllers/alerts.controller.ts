import { Alert } from '@firewall/db';
import { ApiError, RequestWithUser } from '@firewall/utils';
import { Request, Response, NextFunction } from 'express';

export const generateAlert = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const { attackType, severity, detectedAt, affectedServices, additionalInfo, nodeId, ip } = req.body;

        if (!attackType || !severity || !detectedAt || !nodeId) {
            throw new ApiError('Missing required fields', 400);
        }

        const alert = new Alert({
            attackType,
            severity,
            detectedAt,
            affectedServices,
            additionalInfo,
            nodeId,
            ip
        });

        await alert.save();
        res.status(201).json({
            message: 'Alert received and logged successfully',
            alertId: alert._id
        });
    } catch (error) {
        next(new ApiError('Server error: ' + error.message, 500));
    }
};

export const getAlertsAdmin = async (req: Request, res: Response, next: NextFunction) =>  {
    try {
        const alerts = await Alert.find({

        });
        if (!alerts || alerts.length === 0) {
            return res.status(404).json({ message: 'No alerts found' });
        }
        res.status(200).json(alerts);
    } catch (error) {
        return next(new ApiError('Server error: ' + error.message, 500));
    }
}