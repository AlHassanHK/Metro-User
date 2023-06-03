import { PrismaClient, Prisma } from "@prisma/client";

//Database enums, user RideStatus.pending for example
import { UserRole } from "@prisma/client";
import { RouteId } from "@prisma/client";
import { RefundRequestStatus } from "@prisma/client";
import { SeniorRequestStatus } from "@prisma/client";
import { SubscriptionType } from "@prisma/client";
import { uuid } from 'uuidv4';
const prisma = new PrismaClient();






const users = prisma.User; //use users.findMany() for example, instead of typing prisma.User every time
const refundRequest = prisma.RefundRequest;
const seniorRequest = prisma.SeniorRequest;
const subscription = prisma.Subscription;

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await users.findMany();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    })
    res.status(200).json(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id, email, phoneNumber, name, password, isSenior } = req.body;
    const updatedUser = await users.update({
      where: {
        id: id
      },
      data: {
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        password: password,
        isSenior: isSenior
      }
    })
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = red.params.id;
    const deletedUser = await users.delete({
      where: {
        id: id
      }
    })
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getUserSubscription = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log(typeof id);
    const subscription = await users.findUnique({

      where: {
        id: id
      },
      select: {
        name: true,
        subscription: true
      }
    });
    res.status(200).json(subscription);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getUserTrips = async (req, res) => {
  let filteredOutput = {};
  try {
    const id = parseInt(req.params.id);
    const result = await prisma.user.findUnique({
      where: {
        id: id,

      },
      include: {
        rides: true,
      },

    })
    const rides = result.rides;
    const userName = result.name;
    filteredOutput["name"] = userName;
    filteredOutput["rideList"] = { ...rides };






    res.status(200).json(filteredOutput);
  } catch (error) {
    res.status(400).send(error.message);
  }
}


const registerUser = async (req, res) => {
  const { id, name, phoneNumber, password, email } = req.body;

  try {
    const newUser = await prisma.user.create({
      data: {
        id,  // saving Supabase user_id
        name,
        phoneNumber,
        role: 'User',
        password,
        email,
        isSenior: false,
      },
    });

    res.status(200).json({ data: newUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const createRefundRequest = async (req, res) => {
  const { userId, description, tripId } = req.body;

  try {
    const newRefundRequest = await refundRequest.create({
      data: {
        userId,
        description,
        createdAt: new Date(),
        status: RefundRequestStatus.Pending,
        tripId
      },
    });

    res.status(200).json({ data: newRefundRequest });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createSeniorRequest = async (req, res) => {
  const { id, userId, idImage } = req.body;

  try {
    const newSeniorRequest = await seniorRequest.create({
      data: {
        id,
        userId,
        idImage,
        createdAt: new Date(),
        status: SeniorRequestStatus.Pending,
      },
    });

    res.status(200).json({ data: newSeniorRequest });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateSubscription = async (req, res) => {
  const { subscriptionType } = req.body;

  try {
    const newSeniorRequest = await subscription.create({
      data: {
        id: uuid(),        
        type: subscriptionType=="Monthly"? SubscriptionType.Monthly : subscriptionType== 'Quarterly'? SubscriptionType.Quarterly:subscriptionType== 'Annual'? SubscriptionType.Annual : null ,
        expiryDate: (new Date().getMonth()+1)%12 + 1,
      },
    });

  
  


    res.status(200).json({ data: newSeniorRequest });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};













export default {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  getUserSubscription,
  getUserTrips,
  registerUser,
  createRefundRequest,
  createSeniorRequest
};



