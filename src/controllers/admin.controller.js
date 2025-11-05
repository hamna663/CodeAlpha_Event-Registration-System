import { Event } from "../models/event.model";

const createEvent = async (req, res) => {
  const { title, description, dateTime, location, capacity } = req.body;
  const createdBy = req.user._id;
  if (!title || !description || !dateTime || !location || !capacity) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const event = await Event.create({
      title,
      description,
      dateTime,
      location,
      capacity,
      createdBy,
    });
    if (!event) {
      return res.status(500).json({ message: "Event creation failed" });
    }
    return res.status(201).json({ event });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const updateEvent = async (req, res) => {
  const { title, description, dateTime, location, capacity } = req.body;
  const { id } = req.params;
  try {
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    event.title = title || event.title;
    event.description = description || event.description;
    event.dateTime = dateTime || event.dateTime;
    event.location = location || event.location;
    event.capacity = capacity || event.capacity;
    await event.save();
    return res
      .status(200)
      .json({ event, message: "Event updated successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findByIdAndDelete(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    return res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export { createEvent, updateEvent, deleteEvent };
