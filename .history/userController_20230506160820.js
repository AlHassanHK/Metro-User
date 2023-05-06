import { PrismaClient } from "@prisma/client";

//Database enums, user RideStatus.pending for example
import { UserRole } from "@prisma/client";
import { RouteId } from "@prisma/client";
import { RefundRequestStatus } from "@prisma/client";

const prisma = new PrismaClient();

const users = prisma.User; //use users.findMany() for example, instead of typing prisma.User every time

const getAllUsers = async (req, res,id) => {
  try {
    const allUsers = await users.findMany({});//check with Al Hassan 
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getUser = async (req, res) => {
  try {
    const user= await users.findUnique()
    res.status(200).json({data: {hello:"from trip service"}});
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateUser = async (req, res) => {
  try {
    
    res.status(200).json({data: {hello:"from trip service"}});
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    
    res.status(200).json({data: {hello:"from trip service"}});
  } catch (error) {
    res.status(400).send(error.message);
  }
};



export default {
  getAllUsers,
};