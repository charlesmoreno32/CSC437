import express, { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import { MongoClient } from "mongodb";
import { ImageProvider } from "./ImageProvider";
import { registerImageRoutes } from "./routes/images";
import { registerAuthRoutes, verifyAuthToken } from "./routes/auth";

dotenv.config(); // Read the .env file in the current working directory, and load values into process.env.
const PORT = process.env.PORT || 3000;

// Lab 18
const staticDir = process.env.STATIC_DIR || "public";
const uploadDir = process.env.IMAGE_UPLOAD_DIR || "uploads";

const { MONGO_USER, MONGO_PWD, MONGO_CLUSTER, DB_NAME } = process.env;

const connectionStringRedacted = `mongodb+srv://${MONGO_USER}:<password>@${MONGO_CLUSTER}/${DB_NAME}`;
const connectionString = `mongodb+srv://${MONGO_USER}:${MONGO_PWD}@${MONGO_CLUSTER}/${DB_NAME}`;

console.log("Attempting Mongo connection at " + connectionStringRedacted);

async function setUpServer() {
  const mongoClient = await MongoClient.connect(connectionString);
  const collectionInfos = await mongoClient.db().listCollections().toArray();
  //   console.log(collectionInfos.map((collectionInfo) => collectionInfo.name));

  const app = express();

  app.use(express.static(staticDir));
  app.use("/uploads", express.static(uploadDir));
  app.use(express.json());

  registerAuthRoutes(app, mongoClient);
  app.use("/api/*", verifyAuthToken);
  registerImageRoutes(app, mongoClient);

  app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello, World");
  });

  app.get("*", (req: Request, res: Response) => {
    res.sendFile(
      path.join(__dirname, "../src/imageGallery/index.html"),
      (err) => {
        if (err) {
          console.error("Failed to send file:", err);
          res.status(500).send("Internal Server Error");
        }
      }
    );
  });

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

setUpServer();
