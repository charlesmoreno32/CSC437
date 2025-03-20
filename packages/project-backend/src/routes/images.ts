import express, { Request, Response } from "express";
import { MongoClient } from "mongodb";
import { ImageProvider } from "../ImageProvider";
import { CategoryProvider } from "../CategoryProvider";
import {
  imageMiddlewareFactory,
  handleImageFileErrors,
} from "../imageUploadMiddleware";

export function registerImageRoutes(
  app: express.Application,
  mongoClient: MongoClient
) {
  const imageProvider = new ImageProvider(mongoClient);
  const categoryProvider = new CategoryProvider(mongoClient);

  app.get("/api/images", (req: Request, res: Response) => {
    try {
      let userId: string | undefined = undefined;

      if (typeof req.query.createdBy === "string") {
        userId = req.query.createdBy;
        imageProvider
          .getAllImages(userId)
          .then((images) => res.status(200).send(images))
          .catch((error) => console.error(error));
        if (userId === "67c0b8") {
          console.log("User 67c0b8 logged");
        }
      } else {
        imageProvider.getAllImages().then((images) => {
          res.status(200).send(images);
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });

  app.get("/api/categories", (req: Request, res: Response) => {
    const categoryId = req.query.categoryId;
    try {
      if (categoryId) {
        imageProvider
          .getAllImages(categoryId)
          .then((images) => res.status(200).send(images))
          .catch((error) => console.error(error));
      } else {
        categoryProvider
          .getAllCategories()
          .then((categories) => res.status(200).send(categories))
          .catch((error) => console.error(error));
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });

  app.patch("/api/images/:id", async (req: Request, res: Response) => {
    try {
      const imageId = req.params.id;
      const name = req.body.name;

      if (!name) {
        res.status(400).send({
          error: "Bad request",
          message: "Missing name property",
        });
      } else {
        const matchedCount = await imageProvider.updateImageName(imageId, name);

        if (matchedCount === 0) {
          res.status(404).send({
            error: "Not found",
            message: "Image does not exist",
          });
        } else {
          console.log(`Updating image ${imageId} with new name: ${name}`);
          res.status(204);
        }
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });

  app.post(
    "/api/images",
    imageMiddlewareFactory.single("image"),
    handleImageFileErrors,
    async (req: Request, res: Response) => {
      // Final handler function after the above two middleware functions finish running
      const { name } = req.body;
      const file = req.file;

      if (!file || !name) {
        res.status(400).send({
          error: "Bad request",
          message: "Missing image file or title",
        });
      } else {
        const { username } = res.locals.token;
        const image = {
          _id: file.filename,
          src: `/uploads/${file.filename}`,
          name: name,
          likes: 0,
          author: username,
        };
        const successBool = await imageProvider.createImage(image);
        if (successBool) {
          res.status(201).send({ message: "Image upload successful." });
        } else {
          res.status(500).send({
            error: "Internal Server Error",
            message: "Image upload unsuccessful.",
          });
        }
      }
    }
  );
}
