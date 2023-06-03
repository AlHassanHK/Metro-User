import express from "express";
import userController from "./userController.js";
const router = express.Router();

//define function logic in controller
router.route("/").get(userController.getAllUsers);
router.route("/:id").get(userController.getUser);
router.route("/:id/subscription").get(userController.getUserSubscription);
router.route("/:id/trips").get(userController.getUserTrips);
router.route("/register").post(userController.registerUser);
router.route("/").patch(userController.updateUser);
router.route("/:id").delete(userController.deleteUser);
router.route("/").delete(userController.deleteUser);



export default router;  