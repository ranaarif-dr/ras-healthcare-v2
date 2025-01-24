import * as sdk from "node-appwrite";

export const {
  NEXT_PUBLIC_ENDPOINT: ENDPOINT,
  NEXT_PUBLIC_PROJECT_ID,
  API_KEY,
  DATABASE_ID,
  PRODUCTS_COLLECTION_ID,
  ORDERS_COLLECTION_ID,
  BLOGS_COLLECTION_ID,
  BUCKET_ID,
  SETTINGS_COLLECTION_ID,
  COUPON_COLLECTION_ID,
} = process.env;

const client = new sdk.Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(NEXT_PUBLIC_PROJECT_ID!)
  .setKey(API_KEY!);

export const databases = new sdk.Databases(client);
export const users = new sdk.Users(client);
export const messaging = new sdk.Messaging(client);
export const storage = new sdk.Storage(client);
export const account = new sdk.Account(client);
