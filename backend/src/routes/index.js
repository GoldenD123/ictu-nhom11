import userRoutes from "./userRoutes.js";
import authRoutes from "./authRoutes.js";
import aiRoutes from "./aiRoutes.js";

const routes = (app) => {
  app.use("/api/auth", authRoutes);
  app.use("/api/user", userRoutes);
  app.use("/api/ai", aiRoutes);
};

export default routes;
