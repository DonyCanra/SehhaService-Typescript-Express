import authRoutes from "./authRoutes"; // Mengimpor authRoutes
import userRoutes from "./usersRoutes"; // Mengimpor userRoutes

const routes = (app: any) => {
  // Middleware untuk rute-rute spesifik
  app.use("/api/auth", authRoutes); // Menggunakan authRoutes dengan prefix /api/auth
  app.use("/api/users", userRoutes); // Menggunakan userRoutes dengan prefix /api/users
};

export default routes;
