import express from "express";
import userController from "./userController.js";
const router = express.Router();

//define function logic in controller
router.route("/").get(userController.getAllUsers);
router.route("/").get(userController.getUser)


export default router;  