import { User } from "../models/user.model.js";
import { Event } from "../models/event.model.js";
import jwt from "jsonwebtoken";
import { Registration } from "../models/registration.model.js";

const signup = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide all the required fields" });
  }

  try {
    const user = await User.create({
      name,
      email,
      password,
      role: role ? role : "user",
    });

    return res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

    const login = async (req, res) => {
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Please provide all the required fields" });
      }
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
          return res.status(401).json({ message: "Wrong Password" });
        }
        console.log("jwt secret in sign: ", process.env.JWT_SECRET_KEY);
        console.log(user._id);
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
          expiresIn: "15d",
        });
        console.log(token);
        if (!token) {
          return res.status(500).json({ message: "Failed to Login" });
        }
        const userWithoutPassword = { ...user.toObject() };
        delete userWithoutPassword.password;

        // Set both header and include token in response
        res.set("Authorization", `Bearer ${token}`);
        return res.status(200).json({
          message: "Login successful",
          user: userWithoutPassword,
        });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
      }
    };

const register = async (req, res) => {
  const { eventId } = req.body;
  if (!eventId) {
    return res
      .status(400)
      .json({ message: "Please provide all the required fields" });
  }
  const userId = req.user._id;
  const event = await Event.findById(eventId);
  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }
  try {
    const registration = await Registration.create({
      userId,
      eventId,
    });
    return res.status(200).json({
      message: "User registered for the event successfully",
      registration,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const myRegistrations = async (req, res) => {
  const userId = req.user._id;
  try {
    const registrations = await Registration.find({ userId }).populate(
      "eventId"
    );
    return res.status(200).json({
      message: "User registrations fetched successfully",
      registrations,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const cancelRegistration = async (req, res) => {
  const userId = req.user._id;
  const registrationId = req.params.id;

  try {
    const registration = await Registration.findOneAndDelete({
      _id: registrationId,
      userId,
    });

    if (!registration) {
      return res.status(404).json({ message: "Registration not found" });
    }

    return res.status(200).json({
      message: "Registration cancelled successfully",
      registration,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    return res
      .status(200)
      .json({ message: "Events fetched successfully", events });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const getEventById = async (req, res) => {
  const eventId = req.params.id;
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    return res
      .status(200)
      .json({ message: "Event fetched successfully", event });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export {
  signup,
  login,
  register,
  myRegistrations,
  cancelRegistration,
  getEvents,
  getEventById,
};
