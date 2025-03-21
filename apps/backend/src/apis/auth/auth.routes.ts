import { Router } from "express";
import "../../services/passport.service";
import passport from "passport";
import {
  googleAuthController,
  socialCallbackController,
} from "./socialAuth.controller";

const authRouter = Router();

authRouter.route("/google").get(googleAuthController, (_req, res) => {
  res.send("redirecting to google...");
});

authRouter
  .route("/google/callback")
  .get(
    passport.authenticate("google", { session: false }),
    socialCallbackController,
  );

export default authRouter;
