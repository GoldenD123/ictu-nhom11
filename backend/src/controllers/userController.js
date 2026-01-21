import User from "../models/user.js";

// PUT /api/user/cv
export const updateCV = async (req, res) => {
  const { content } = req.body;

  const user = await User.findByIdAndUpdate(
    req.userId,
    { cvContent: content },
    { new: true }
  ).select("-passwordHash");

  res.json(user);
};
