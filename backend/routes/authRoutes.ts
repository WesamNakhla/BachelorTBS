import express from "express";
import { loginUser, registerUser } from "../controllers/authController";
const router = express.Router();

router.post("/register", registerUser);


router.post("/login", loginUser);



router.get("/test", (req: express.Request, res: express.Response) => {
  res.send("Test route is working!");
});


export default router;
