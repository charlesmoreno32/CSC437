import { MongoClient } from "mongodb";

interface Category {
  _id: string;
  cover_src: string;
  name: string;
  description: string;
  image_ids: string[];
}

interface User {
  _id: string;
  username: string;
  password: string;
  image_ids: string[];
}

export class CategoryProvider {
  constructor(private readonly mongoClient: MongoClient) {}

  async getAllCategories(): Promise<Category[]> {
    // TODO #2
    const categoriesCollectionName = process.env.CATEGORIES_COLLECTION_NAME;

    if (!categoriesCollectionName) {
      throw new Error("Missing collection name environment variable");
    }

    const db = this.mongoClient.db();
    const categoriesCollection = db.collection<Category>(
      categoriesCollectionName
    );

    // Simply return the images as-is without trying to resolve `author`
    const images = await categoriesCollection.find().toArray();

    return images;
  }
}
