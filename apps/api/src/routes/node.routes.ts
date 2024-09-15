import express from "express";
import { registerNode } from "../controllers/node.controller";
import { verifyJWT } from "@firewall/utils";

const router = express.Router();

/**
 * @swagger
 * /register-node:
 *   post:
 *     summary: Register a new node
 *     description: Allows a user to register a new node by providing necessary device metadata. A unique API key will be generated for the node.
 *     tags:
 *       - Nodes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Node registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Node registered successfully
 *                 apiKey:
 *                   type: string
 *                   example: 4f3d4b5c6d7e8f9a0b1c2d3e4f5g6h7i8j9k0l1m
 *       500:
 *         description: Server error
 *       401:
 *         description: Unauthorized access
 */
router.post("/register-node", verifyJWT, registerNode);

export default router;
