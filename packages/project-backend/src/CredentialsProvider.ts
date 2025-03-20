import { Collection, MongoClient } from "mongodb";
import bcrypt from "bcrypt";

interface ICredentialsDocument {
  username: string;
  password: string;
  image_ids: string[];
}

export class CredentialsProvider {
  private readonly collection: Collection<ICredentialsDocument>;

  constructor(mongoClient: MongoClient) {
    const COLLECTION_NAME = process.env.USERS_COLLECTION_NAME;
    if (!COLLECTION_NAME) {
      throw new Error("Missing USERS_COLLECTION_NAME from env file");
    }
    this.collection = mongoClient
      .db()
      .collection<ICredentialsDocument>(COLLECTION_NAME);
  }

  async registerUser(username: string, plaintextPassword: string) {
    const existingUser = await this.collection.findOne({ username });
    if (existingUser) {
      return false; // User already exists
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plaintextPassword, salt);

    await this.collection.insertOne({
      username,
      password: hashedPassword,
      image_ids: [],
    });

    // Wait for any DB operations to finish before returning!
    return true;
  }

  async verifyPassword(username: string, plaintextPassword: string) {
    try {
      const user = await this.collection.findOne({ username });
      if (!user) {
        return false;
      }

      const passwordMatch = await bcrypt.compare(
        plaintextPassword,
        user.password
      );

      return passwordMatch;
    } catch (error) {
      console.error("Error verifying password:", error);
      return false;
    }
  }
}
