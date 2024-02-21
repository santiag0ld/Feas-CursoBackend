import { Router } from "express";
import passport from "passport";
import SessionsController from "../../controllers/sessions.controller.js";

const router = Router();
const sControl = new SessionsController();

router.post('/register', sControl.register);
router.post('/login', sControl.login);
router.post('/loginSession', sControl.loginSession);
router.get ('/logout', sControl.logout);

router.get('/github', passport.authenticate('github', {scope:['user:email']}), sControl.github)
router.get('/githubcallback', passport.authenticate('github', {session: false, failureRedirect: '/'}), sControl.githubcallback)

export default router;
