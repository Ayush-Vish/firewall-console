import { apiKeyAuthMiddleware, verifyJWT } from "@firewall/utils";
import express from "express";
import { getNodeLogs, storeLog } from "../controllers/logs.controller";
const router = express.Router();

router.post("/store-log" , verifyJWT , apiKeyAuthMiddleware , storeLog);


router.get("/get-node-logs" , verifyJWT , apiKeyAuthMiddleware , getNodeLogs);


export default router;