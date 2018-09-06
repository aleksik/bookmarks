import { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import password from "passport";
import { AUTH_SECRET, USERNAME, PASSWORD } from "../util/constants";

const router = Router();

/**
 * GET /api/auth
 * Check the current login status
 */
export const getAuth = (req: Request, res: Response) => {
  if (req.user) {
    return res.send(200);
  }
  return res.send(401);
};
router.get("/", password.authenticate("jwt", { session: false }), getAuth);

/**
 * POST /api/auth/login
 * Log in with username and password
 */
export const postLogin = (req: Request, res: Response) => {
  const {username, password} = req.body;
  if (username === USERNAME && password === PASSWORD) {
    const token = jwt.sign({ username }, AUTH_SECRET);
    return res.status(200).json({token});
  }

  return res.status(401).json({ message: "Authentication failed" });
};
router.post("/login", postLogin);

export default router;