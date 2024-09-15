import { adminAuthMiddleware, apiKeyAuthMiddleware, verifyJWT } from "@firewall/utils";
import express from "express";
import { getNodeLogs, getNodelogsAdmin, storeLog } from "../controllers/logs.controller";
const router = express.Router();

/**
 * @swagger
 * /store-log:
 *   post:
 *     summary: Store a log from a node
 *     description: Store log information related to a node activity (API key and JWT required)
 *     tags:
 *       - Logs
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     requestBody:
 *       description: Log details to store
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               logType:
 *                 type: string
 *                 description: Type of the log (e.g., "error", "info")
 *                 example: error
 *               message:
 *                 type: string
 *                 description: Log message
 *                 example: "Node encountered a malicious activity"
 *               additionalInfo:
 *                 type: object
 *                 description: Additional information related to the log
 *                 example:
 *                   details: "Unauthorized access detected"
 *     responses:
 *       201:
 *         description: Log stored successfully
 *       500:
 *         description: Server error
 */
router.post("/store-log", verifyJWT, apiKeyAuthMiddleware, storeLog);

/**
 * @swagger
 * /get-node-logs:
 *   get:
 *     summary: Get logs of a node (for node user)
 *     description: Retrieve all logs associated with the current node (API key and JWT required)
 *     tags:
 *       - Logs
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     responses:
 *       200:
 *         description: Returns the logs for the node
 *       404:
 *         description: No logs found for the node
 *       500:
 *         description: Server error
 */
router.get("/get-node-logs", verifyJWT, apiKeyAuthMiddleware, getNodeLogs);

/**
 * @swagger
 * /get-node-log-admin/{nodeId}:
 *   get:
 *     summary: Get logs of a node (for admin)
 *     description: Retrieve all logs associated with a node for the admin
 *     tags:
 *       - Logs
 *     security:
 *       - bearerAuth: []
 *       - adminAuth: []
 *     parameters:
 *       - in: path
 *         name: nodeId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the node whose logs are to be retrieved
 *     responses:
 *       200:
 *         description: Returns the logs for the node
 *       404:
 *         description: No logs found for the node
 *       500:
 *         description: Server error
 */
router.get("/get-node-log-admin/:nodeId", verifyJWT, adminAuthMiddleware, getNodelogsAdmin);

export default router;
