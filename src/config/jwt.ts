import jwt from "jsonwebtoken";

export const generateJwt = (userId: number, email: string, username: string): string => {
  const payload = { userId, email, username };
  const secretKey = process.env.JWT_SECRET || "sehha-app";
  const expiresIn = "1h";

  return jwt.sign(payload, secretKey, { expiresIn });
};

export const verifyJwt = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret");
};
