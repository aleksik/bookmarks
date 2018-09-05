import { Request, Response, Router } from "express";
import auth from "../util/auth";

const router = Router();

/**
 * POST /login
 */
export const postLogin = (req: Request, res: Response) => {
  res.send({ user: req.user });
};
router.post("/login", auth.authenticate("login"), postLogin);

export default router;