import express from "express";
import { loginUser, refreshAccessToken, registerUser } from "../controllers/auth.controller";
const app = express();
const router = express.Router();

router.get("/" , (req, res) => {
      res.send({ message: "Hello API" });
      }
);

router.post("/register"  , registerUser ) ;



router.post("/login" , loginUser)


router.post("/refresh-token" , refreshAccessToken) ;


export default router;