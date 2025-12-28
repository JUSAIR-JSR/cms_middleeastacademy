import Announcement from "../models/Announcement.js";

/* ----------------------------------
   GET ALL ANNOUNCEMENTS (ADMIN)
---------------------------------- */
export const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.status(200).json(announcements);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch announcements" });
  }
};

/* ----------------------------------
   GET SINGLE ANNOUNCEMENT
---------------------------------- */
export const getAnnouncementById = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);

    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    res.status(200).json(announcement);
  } catch (error) {
    res.status(400).json({ message: "Invalid ID" });
  }
};

/* ----------------------------------
   CREATE ANNOUNCEMENT (ADMIN)
---------------------------------- */
export const createAnnouncement = async (req, res) => {
  const {
    type,
    title,
    description,
    date,
    color,
    shade,
    icon,
    status,
  } = req.body;

  if (!type || !title || !description || !date) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const announcement = await Announcement.create({
    type,
    title,
    description,
    date,
    color: color || "primary",
    shade: shade || "500",
    icon: icon || null,
    status: status || "draft",
  });

  res.status(201).json(announcement);
};


/* ----------------------------------
   UPDATE ANNOUNCEMENT (ADMIN)
---------------------------------- */
export const updateAnnouncement = async (req, res) => {
  try {
    const updated = await Announcement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/* ----------------------------------
   DELETE ANNOUNCEMENT (ADMIN)
---------------------------------- */
export const deleteAnnouncement = async (req, res) => {
  try {
    const deleted = await Announcement.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    res.status(200).json({ message: "Announcement deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
