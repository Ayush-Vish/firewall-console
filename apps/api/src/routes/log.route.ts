import { apiKeyAuthMiddleware, verifyJWT } from "@firewall/utils";
import express from "express";
import { storeLog } from "../controllers/logs.controller";
const router = express.Router();

router.post("/store-log" , verifyJWT , apiKeyAuthMiddleware , storeLog);





export default router;