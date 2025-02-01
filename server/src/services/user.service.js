// services/user.service.js
import {
  findUserById,
  createNewRoom,
  updateUserRoom,
  clearUserRoom,
  findUser,
  createUser,
} from "../repositories/user.repository.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

export const loginService = async (authDetails) => {
  // Logic for verifying user login, setting session/cookies, etc.

  try {
    const username = authDetails.username;
    const plainPassword = authDetails.password;

    const user = await findUser({ username });
    console.log(user);
    if (!user) {
      throw " User not found  ";
    }
    const isPasswordValidate = await bcrypt.compare(
      plainPassword,
      user.password
    );
    if (!isPasswordValidate) {
      throw "Invalid Password";
    }

    return {
      userDetail: {
        email: user.email,
        username: user.username,
      },
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const logoutService = async (user) => {
  // Logic for clearing user session/cookies
};

export const signInUserService = async (userDetails) => {
  try {

    const userwithEmail = await findUser(userDetails.email);
    const userwithUsername = await findUser(userDetails.username);

    if (userwithEmail) throw "user with this email already exist";

    if (userwithUsername) throw "user with this username already exist";

    const response = await createUser(userDetails);
    if (!response) throw "internal server error";
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const createRoomService = async (userId) => {
  const roomId = uuidv4();
  const user = await findUserById(userId);

  if (!user) throw new Error("User not found");

  await createNewRoom(userId, roomId);
  return { message: "Room created successfully", roomId };
};

export const joinRoomService = async (userId, roomId) => {
  const user = await findUserById(userId);

  if (!user) throw new Error("User not found");

  await updateUserRoom(userId, roomId, "participant");
  return { message: "Joined room successfully", roomId };
};
