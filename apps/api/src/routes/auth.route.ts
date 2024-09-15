import express from "express";
import { isLoggedIn, loginUser, refreshAccessToken, registerUser } from "../controllers/auth.controller";
import { verifyJWT } from "@firewall/utils";
const app = express();
const router = express.Router();

/**
 * @swagger
 * /auth/:
 *   get:
 *     summary: Welcome route for the Auth API
 *     description: This route returns a welcome message.
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Welcome message
 */
router.get("/", (req, res) => {
  res.send({ message: "Hello API" });
});

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Auth
 *     requestBody:
 *       description: User registration data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: StrongPassword123
 *               role:
 *                 type: string
 *                 example: user
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error or user already exists
 *       500:
 *         description: Server error
 */
router.post("/register", registerUser);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in a user
 *     tags:
 *       - Auth
 *     requestBody:
 *       description: User login credentials
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: StrongPassword123
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials or missing fields
 *       500:
 *         description: Server error
 */
router.post("/login", loginUser);

/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: Refresh access token
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *       401:
 *         description: Unauthorized or invalid refresh token
 *       500:
 *         description: Server error
 */
router.post("/refresh-token", refreshAccessToken);


/**
 * @swagger
 * /auth/status:
 *   get:
 *     summary: Check user authentication status
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: User is authenticated
 *       401:
 *         description: User is not authenticated
 *       500:
 *         description: Server error
 */



app.get('/verify', verifyJWT, isLoggedIn);


export default router;
