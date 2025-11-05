import { User } from "../models/user.model.js";

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
