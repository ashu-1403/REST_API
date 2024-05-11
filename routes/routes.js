import express from "express";
import { AllUsers } from "../controllers/user.controller.js";
import { signup,login } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", AllUsers);
router.post("/signup",signup);
router.post("/login",login)

export default router;
