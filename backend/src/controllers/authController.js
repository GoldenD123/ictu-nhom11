import jobs from "../models/jobs.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password, fullName } = req.body;

    const existed = await User.findOne({ email });
    if (existed) {
      return res.status(400).json({ message: "Email đã tồn tại" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      passwordHash: hashedPassword,
      role: "user",
      fullName,
    });

    res.status(201).json({
      message: "Đăng ký thành công",
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
// login

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(401).json({ message: "Sai email hoặc mật khẩu" });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: "Sai email hoặc mật khẩu" });
    }

    res.json({
      message: "Đăng nhập thành công",
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMe = async (req, res) => {
  try {
    const userId = req.userId || req.query.userId;

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy user" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const list = await jobs.find().sort({ createdAt: -1 });

    return res.status(200).json({
      RC: 200,
      RM: "Success",
      RD: list,
    });
  } catch (err) {
    console.error("[getAllJobs]", err);
    return res.status(500).json({ RC: 500, RM: "Internal server error" });
  }
};

export const addJob = async (req, res) => {
  try {
    const { CName, title, add, salary, des } = req.body;

    if (!CName || !title || !add || !salary) {
      return res.status(400).json({
        RC: 400,
        RM: "Missing required fields",
      });
    }

    const exists = await jobs.findOne({ CName });
    if (exists) {
      return res.status(409).json({
        RC: 409,
        RM: "Company already exists",
      });
    }

    const job = await jobs.create({ CName, title, add, salary, des });

    return res.status(201).json({
      RC: 201,
      RM: "Job created",
      RD: job,
    });
  } catch (err) {
    console.error("[addJob]", err);
    return res.status(500).json({ RC: 500, RM: "Internal server error" });
  }
};

export const updateJob = async (req, res) => {
  try {
    const { job_id } = req.params;
    const { CName, title, add, salary, des } = req.body;

    const job = await jobs.findById(job_id);
    if (!job) {
      return res.status(404).json({ RC: 404, RM: "Job not found" });
    }

    if (CName && CName !== job.CName) {
      const exists = await jobs.findOne({ CName });
      if (exists) {
        return res.status(409).json({
          RC: 409,
          RM: "Company already exists",
        });
      }
    }

    job.CName = CName ?? job.CName;
    job.title = title ?? job.title;
    job.add = add ?? job.add;
    job.salary = salary ?? job.salary;
    job.des = des ?? job.des;

    await job.save();

    return res.status(200).json({
      RC: 200,
      RM: "Job updated",
      RD: job,
    });
  } catch (err) {
    console.error("[updateJob]", err);
    return res.status(500).json({ RC: 500, RM: "Internal server error" });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const { job_id } = req.params;

    const job = await jobs.findByIdAndDelete(job_id);
    if (!job) {
      return res.status(404).json({ RC: 404, RM: "Job not found" });
    }

    return res.status(200).json({
      RC: 200,
      RM: "Job deleted",
    });
  } catch (err) {
    console.error("[deleteJob]", err);
    return res.status(500).json({ RC: 500, RM: "Internal server error" });
  }
};
