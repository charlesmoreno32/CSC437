import { Request, Response, NextFunction } from "express";
import multer from "multer";
import dotenv from "dotenv";

class ImageFormatError extends Error {}

dotenv.config();

const storageEngine = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = process.env.IMAGE_UPLOAD_DIR || "uploads";
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    let fileExtension = "";
    if (file.mimetype === "image/png") {
      fileExtension = "png";
    } else if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg"
    ) {
      fileExtension = "jpg";
    } else {
      fileExtension = "";
    }
    if (fileExtension === "") {
      cb(new ImageFormatError("Unsupported image type"), "");
    } else {
      const fileName =
        Date.now() +
        "-" +
        Math.round(Math.random() * 1e9) +
        "." +
        fileExtension;
      cb(null, fileName);
    }
  },
});

export const imageMiddlewareFactory = multer({
  storage: storageEngine,
  limits: {
    files: 1,
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});

export function handleImageFileErrors(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof multer.MulterError || err instanceof ImageFormatError) {
    res.status(400).send({
      error: "Bad Request",
      message: err.message,
    });
    return;
  }
  next(err); // Some other error, let the next middleware handle it
}
