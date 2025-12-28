import Message from "../models/Message.js";


export const getMessages = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search || "";
  const from = req.query.from;
  const to = req.query.to;

  const skip = (page - 1) * limit;

  const query = {};

  /* SEARCH */
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { phone: { $regex: search, $options: "i" } },
      { message: { $regex: search, $options: "i" } },
    ];
  }

  /* DATE RANGE */
  if (from || to) {
    query.createdAt = {};
    if (from) query.createdAt.$gte = new Date(from);
    if (to) query.createdAt.$lte = new Date(to + "T23:59:59.999");
  }

  const [messages, total] = await Promise.all([
    Message.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Message.countDocuments(query),
  ]);

  res.json({
    data: messages,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  });
};



export const getMessageById = async (req, res) => {
  const message = await Message.findById(req.params.id);
  if (!message) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json(message);
};

export const markAsRead = async (req, res) => {
  await Message.findByIdAndUpdate(req.params.id, { isRead: true });
  res.json({ success: true });
};

export const deleteMessage = async (req, res) => {
  await Message.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};

export const exportMessages = async (req, res) => {
  const { range } = req.query;

  const now = new Date();
  let startDate;

  switch (range) {
    case "today":
      startDate = new Date(now.setHours(0, 0, 0, 0));
      break;

    case "week":
      startDate = new Date();
      startDate.setDate(startDate.getDate() - 7);
      break;

    case "month":
      startDate = new Date();
      startDate.setMonth(startDate.getMonth() - 1);
      break;

    case "year":
      startDate = new Date();
      startDate.setFullYear(startDate.getFullYear() - 1);
      break;

    default:
      return res.status(400).json({ message: "Invalid range" });
  }

  const messages = await Message.find({
    createdAt: { $gte: startDate },
  }).sort({ createdAt: -1 });

  /* CSV HEADER */
  let csv = "Name,Email,Phone,Message,Source,Read,Date\n";

  messages.forEach((m) => {
    csv += `"${m.name}","${m.email || ""}","${m.phone || ""}","${m.message.replace(/"/g, '""')}","${m.source}",${m.isRead},"${m.createdAt.toISOString()}"\n`;
  });

  res.setHeader("Content-Type", "text/csv");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=messages-${range}.csv`
  );

  res.send(csv);
};


/* CREATE (PUBLIC – MAIN WEBSITE) */
export const createMessage = async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !message) {
    return res.status(400).json({ message: "Required fields missing" });
  }

  const newMessage = await Message.create({
    name,
    email,
    phone,
    message,
    source: "form",
  });

  res.status(201).json({ success: true });
};



/* STATS */
export const getMessageStats = async (req, res) => {
  try {
    const total = await Message.countDocuments();
    const unread = await Message.countDocuments({ isRead: false });

    res.json({ total, unread });
  } catch (err) {
    res.status(500).json({ message: "Failed to load stats" });
  }
};

/* UNREAD COUNT (Navbar badge) */
export const getUnreadCount = async (req, res) => {
  const count = await Message.countDocuments({ isRead: false });
  res.json({ count });
};