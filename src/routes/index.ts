import authRoutes from "./authRoutes";
import userRoutes from "./usersRoutes";
import roleRoutes from "./rolesRoutes";

const routes = (app: any) => {
  app.use("/api/auth", authRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/roles", roleRoutes);
};

export default routes;
