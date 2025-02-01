// controllers/user.controller.js
import { loginService, logoutService, createRoomService, joinRoomService,
  signInUserService
 } from '../services/user.service.js';

export const loginUser = async (req, res) => {
  try {
    const response = await loginService(req.body);
    res.status(200).json({
      message : " login success",
      success : true,
      data : response
    });

  } catch (error) {
    res.status(500).json({ error: 'Login failed', details: error.message });
  }
};



export const logoutUser = async (req, res) => {
  try {
    await logoutService(req.user);
    res.status(200).json({ message: 'Logged out successfully',
      success:true
     });
  } catch (error) {
    res.status(500).json({ error: 'Logout failed', details: error.message,
      success:false
     });
  }
};

export const createRoom = async (req, res) => {
  try {
    const response = await createRoomService(req.body.userId);
    res.status(201).json(response);


  } catch (error) {
    res.status(500).json({ error: 'Room creation failed', details: error.message });
  }
};

export const joinRoom = async (req, res) => {
  try {
    const response = await joinRoomService(req.body.userId, req.body.roomId);
    res.status(200).json(response);
    
  } catch (error) {
    res.status(500).json({ error: 'Join room failed', details: error.message });
  }
};

export const signInUser = async(req,res)=>{

  try {
    console.log('hit')

    const response = await signInUserService(req.body);
    res.status(200).json({
      message:"user sign up successfully",
      success : true
    })
    
  } catch (error) {
    console.log(error)
  }
}