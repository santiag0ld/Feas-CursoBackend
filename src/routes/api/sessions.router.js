import { Router } from "express";
import passport from "passport";
import SessionsController from "../../controllers/sessions.controller.js";

const router = Router();
const sControl = new SessionsController();

router
  .post("/register", sControl.register)
  .post("/login", sControl.login)
  .post("/loginSession", sControl.loginSession)
  .get("/logout", sControl.logout)
  .get(
    "/github",
    passport.authenticate("github", { scope: ["user:email"] }),
    sControl.github
  )
  .get(
    "/githubcallback",
    passport.authenticate("github", { session: false, failureRedirect: "/" }),
    sControl.githubcallback
  );

export default router;
