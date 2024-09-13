import { apiKeyAuthMiddleware, verifyJWT } from "@firewall/utils";
import express from "express";
const router = express.Router();

router.post("/create-alert" , verifyJWT , apiKeyAuthMiddleware
)
export default router;