import { Request, Response, Router } from "express";
import auth from "../util/auth";

const router = Router();

/**
 * GET /api/auth
 * Check the current login status
 */
export const getAuth = (req: Request, res: Response) => {
  if (req.user) {
    return res.status(200).json({user: req.user});
  }
  return res.send(401);
};
router.get("/", getAuth);

/**
 * POST /api/auth/login
 * Log in with username and password
 */
export const postLogin = (req: Request, res: Response) => {
  res.send({ user: req.user });
};
router.post("/login", auth.authenticate("login"), postLogin);

export default router;