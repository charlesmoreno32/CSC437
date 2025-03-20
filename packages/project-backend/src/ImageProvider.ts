import { MongoClient } from "mongodb";

interface Image {
  _id: string;
  src: string;
  name: string;
  author: string;
  cat_ids: string[];
}

interface User {
  _id: string;
  username: string;
  password: string;
  image_ids: string[];
}

export class ImageProvider {
  constructor(private readonly mongoClient: MongoClient) {}

  async getAllImages(authorId?: string, categoryId?: string): Promise<Image[]> {
    // TODO #2
    const imagesCollectionName = process.env.IMAGES_COLLECTION_NAME;

    if (!imagesCollectionName) {
      throw new Error("Missing collection name environment variable");
    }

    const db = this.mongoClient.db();
    const imagesCollection = db.collection<Image>(imagesCollectionName);

    const filter = authorId ? { author: authorId } : {};
    let images = await imagesCollection.find(filter).toArray();

    if (categoryId) {
      images = images.filter((image: Image) =>
        image.cat_ids?.includes(categoryId)
      );
    }

    return images;
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

  async createImage(image: Image): Promise<Boolean> {
    const imagesCollectionName = process.env.IMAGES_COLLECTION_NAME;

    if (!imagesCollectionName) {
      return false;
      throw new Error("Missing collection name environment variable");
    }

    const db = this.mongoClient.db();
    const imagesCollection = db.collection<Image>(imagesCollectionName);

    // Insert the new image document into the collection
    const result = await imagesCollection.insertOne(image);

    if (!result.acknowledged) {
      return false;
      throw new Error("Failed to insert image document.");
    }

    // Return the created image document
    return true;
  }
}
