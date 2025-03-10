import { MongoClient } from "mongodb";

interface Image {
  _id: string;
  src: string;
  name: string;
  author: string;
  likes: number;
}

interface User {
  _id: string;
  username: string;
  email: string;
}

export class ImageProvider {
  constructor(private readonly mongoClient: MongoClient) {}

  async getAllImages(authorId?: string): Promise<Image[]> {
    // TODO #2
    const imagesCollectionName = process.env.IMAGES_COLLECTION_NAME;
    const usersCollectionName = process.env.USERS_COLLECTION_NAME;

    if (!imagesCollectionName || !usersCollectionName) {
      throw new Error("Missing collection name environment variables");
    }

    const db = this.mongoClient.db();
    const imagesCollection = db.collection<Image>(imagesCollectionName);
    const usersCollection = db.collection<User>(usersCollectionName);

    const filter = authorId ? { author: authorId } : {};
    const images = await imagesCollection.find(filter).toArray();

    // Array to hold the updated images
    const updatedImages: Image[] = [];

    // Process each image
    for (const image of images) {
      // Find the corresponding user
      const user = await usersCollection.findOne({
        _id: image.author,
      });

      if (user) {
        // Replace the author field with the full user object
        const updatedImage = {
          ...image,
          author: user.username, // Embed the full user object
        };
        updatedImages.push(updatedImage);
      } else {
        console.warn(
          `User not found for image: ${image.name}'s author: ${image.author}`
        );
        const updatedImage = {
          ...image,
          author: "N/A",
        };
        updatedImages.push(updatedImage);
      }
    }
    return updatedImages;
  }

  async updateImageName(imageId: string, newName: string): Promise<Number> {
    const imagesCollectionName = process.env.IMAGES_COLLECTION_NAME;

    if (!imagesCollectionName) {
      throw new Error("Missing collection name environment variable");
    }

    const db = this.mongoClient.db();
    const imagesCollection = db.collection<Image>(imagesCollectionName);

    const result = await imagesCollection.updateOne(
      { _id: imageId },
      { $set: { name: newName } }
    );
    return result.matchedCount;
  }
}
