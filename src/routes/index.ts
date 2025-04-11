import authRoutes from "./authRoutes";
import userRoutes from "./usersRoutes";
import roleRoutes from "./rolesRoutes";
import { authenticate } from "../middlewares/authMiddleware";

const routes = (app: any) => {
  app.use("/api/auth", authRoutes);
  app.use("/api/users", authenticate, userRoutes);
  app.use("/api/roles", authenticate, roleRoutes);
};

export default routes;
