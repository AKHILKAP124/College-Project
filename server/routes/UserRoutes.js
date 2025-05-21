import { Router } from 'express';
import { LoginUser, logoutUser, RegisterUser, updateProfile, getUser, getAllUsers, getUserById } from '../controllers/UserController.js';

const userRouter = Router();

userRouter.post("/signup", RegisterUser);
userRouter.post("/signin", LoginUser);
userRouter.get("/logout", logoutUser);  
userRouter.get("/getUser", getUser);
userRouter.put("/update", updateProfile);
userRouter.get("/getallusers", getAllUsers);
userRouter.post("/getUserById", getUserById);

export default userRouter;
