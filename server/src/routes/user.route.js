// routes/user.route.js
import express from 'express';
import { loginUser, logoutUser, createRoom, joinRoom,signInUser } from '../controllers/user.controller.js';

const router = express.Router();
router.post('/signIn' , signInUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.post('/room/create', createRoom);
router.post('/room/join', joinRoom);

export default router;
