import Course from "../models/Course.js";

/* ----------------------------------
   GET ALL COURSES (PUBLIC)
---------------------------------- */

// export const getAllCoursesAdmin = async (req, res) => {
//   try {
//     const courses = await Course.find().sort({ createdAt: -1 });
//     res.status(200).json(courses);
//   } catch {
//     res.status(500).json({ message: "Failed to fetch courses" });
//   }
// };


/* ----------------------------------
   GET ALL COURSES (ADMIN)
---------------------------------- */

export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.status(200).json(courses);
  } catch {
    res.status(500).json({ message: "Failed to fetch courses" });
  }
};
/* ----------------------------------
   GET SINGLE COURSE
---------------------------------- */
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course)
      return res.status(404).json({ message: "Course not found" });

    res.status(200).json(course);
  } catch (error) {
    res.status(400).json({ message: "Invalid ID" });
  }
};

/* ----------------------------------
   CREATE COURSE (ADMIN)
---------------------------------- */
export const createCourse = async (req, res) => {
  const {
    title,
    description,
    duration,
    certification,
    placement,
    color,
    shade,
    icon,
    status,
  } = req.body;

  const course = await Course.create({
    title,
    description,
    duration,
    certification,
    placement,
    color,
    shade: shade || "500",
    icon,
    status: status || "draft",
  });

  res.status(201).json(course);
};


/* ----------------------------------
   UPDATE COURSE (ADMIN)
---------------------------------- */
export const updateCourse = async (req, res) => {
  try {
    const updated = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Course not found" });

    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/* ----------------------------------
   DELETE COURSE (ADMIN)
---------------------------------- */
export const deleteCourse = async (req, res) => {
  try {
    const deleted = await Course.findByIdAndDelete(req.params.id);

    if (!deleted)
      return res.status(404).json({ message: "Course not found" });

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
