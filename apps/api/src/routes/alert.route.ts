import { adminAuthMiddleware, apiKeyAuthMiddleware, verifyJWT } from "@firewall/utils";
import express from "express";
import { generateAlert, getAlertsAdmin } from "../controllers/alerts.controller";
const router = express.Router();

router.post("/create-alert" , verifyJWT , apiKeyAuthMiddleware,generateAlert)


router.get("/get-alerts" , verifyJWT , adminAuthMiddleware,getAlertsAdmin)
export default router;