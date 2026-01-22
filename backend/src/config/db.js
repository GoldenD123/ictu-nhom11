import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_CONNECTIONSTRING;

    if (!uri) {
      throw new Error("❌ MONGODB_CONNECTIONSTRING is not defined");
    }

    await mongoose.connect(uri);

    console.log("✅ Liên kết CSDL MongoDB thành công!");
  } catch (error) {
    console.error("❌ Lỗi khi kết nối CSDL:", error);
    process.exit(1);
  }
};
