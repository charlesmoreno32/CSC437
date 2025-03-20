import express, { Request, Response, NextFunction } from "express";
import { MongoClient } from "mongodb";
import { CredentialsProvider } from "../CredentialsProvider";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const signatureKey = process.env.JWT_SECRET as string;
if (!signatureKey) {
  throw new Error("Missing JWT_SECRET from env file");
}

function generateAuthToken(username: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(
      { username: username },
      signatureKey,
      { expiresIn: "1d" },
      (error, token) => {
        if (error) reject(error);
        else resolve(token as string);
      }
    );
  });
}

export function verifyAuthToken(
  req: Request,
  res: Response,
  next: NextFunction // Call next() to run the next middleware or request handler
) {
  const authHeader = req.get("Authorization");
  // The header should say "Bearer <token string>".  Discard the Bearer part.
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).end();
  } else {
    // signatureKey already declared as a module-level variable
    jwt.verify(token, signatureKey, (error, decoded) => {
      if (decoded) {
        res.locals.token = decoded;
        next();
      } else {
        console.log(authHeader);
        console.log(token);
        res.status(403).end();
      }
    });
  }
}

export function registerAuthRoutes(
  app: express.Application,
  mongoClient: MongoClient
) {
  const credentialsProvider = new CredentialsProvider(mongoClient);

  app.post("/auth/register", async (req: Request, res: Response) => {
    try {
      const username = req.body.username;
      const password = req.body.password;

      if (!username || !password) {
        res.status(400).send({
          error: "Bad request",
          message: "Missing username or password",
        });
      } else {
        const registerSuccessful = await credentialsProvider.registerUser(
          username,
          password
        );

        if (registerSuccessful === true) {
          const token = await generateAuthToken(username);
          res
            .status(201)
            .send({ token: token, message: "Registration successful" });
        } else {
          res.status(400).send({
            error: "Bad request",
            message: "Username already taken",
          });
        }
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({
        error: "Internal Server Error",
        message: "Internal Server Error registering",
      });
    }
  });

  app.post("/auth/login", async (req: Request, res: Response) => {
    try {
      const username = req.body.username;
      const password = req.body.password;

      if (!username || !password) {
        res.status(400).send({
          error: "Bad request",
          message: "Missing username or password",
        });
      } else {
        const loginSuccessful = await credentialsProvider.verifyPassword(
          username,
          password
        );

        if (loginSuccessful === true) {
          const token = await generateAuthToken(username);
          res.status(201).send({ token: token, message: "Login successful" });
        } else {
          res.status(401).send({
            error: "Bad request",
            message: "Invalid username or password",
          });
        }
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({
        error: "Internal Server Error",
        message: "Internal Server Error logging in",
      });
    }
  });
}
