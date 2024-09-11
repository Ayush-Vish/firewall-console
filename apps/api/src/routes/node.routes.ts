import express from "express";
import { registerNode } from "../controllers/node.controller";
import { verifyJWT } from "@firewall/utils";


const router = express.Router();




router.post("/register-node" ,  verifyJWT    ,  registerNode);




export default router;