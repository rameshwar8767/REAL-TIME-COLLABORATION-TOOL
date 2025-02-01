// repositories/user.repository.js
import User from '../models/user.schema.js';


export const  findUser = async(parameter) => {
  try {
    const response = await User.findOne({ ...parameter });     
    return response;
  }  catch (error) {
    console.log("finduser" ,error)
  //   if (error.name === "ValidationError") {
  //     const errorMessageList = Object.keys(error.errors).map((property) => {
  //       return error.errors[property].message;
  //     });
  //     throw new BadRequestError(errorMessageList);
  //   } 
  //  else if (error instanceof mongoose.Error.CastError) {
  //   throw ({message:"Invalid user details  format",statusCode:500});
  //   }
    throw ('Internal Server Error');
  }
}

export const createUser = async (userDetails)=>{

  try {
    const response = await User.create({...userDetails})
    return response;
  } catch (error) {
    console.log("create user" , error)
    throw ('Internal Server Error');
  }
}

export const findUserById = async (userId) => {
 
  try {
    const response = await User.findById(userId);
    return response;
  } catch (error) {
    throw ('Internal Server Error');
  }
};

export const createNewRoom = async (userId, roomId) => {
  return await User.findByIdAndUpdate(
    userId,
    { activeRoom: { roomId, role: 'host', joinedAt: new Date() } },
    { new: true }
  );
};

export const updateUserRoom = async (userId, roomId, role) => {
  return await User.findByIdAndUpdate(
    userId,
    { activeRoom: { roomId, role, joinedAt: new Date() } },
    { new: true }
  );
};

export const clearUserRoom = async (userId) => {
  return await User.findByIdAndUpdate(
    userId,
    { $unset: { activeRoom: '' } },
    { new: true }
  );
};
