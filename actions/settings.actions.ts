"use server";
import { DATABASE_ID, databases, SETTINGS_COLLECTION_ID } from "@/lib/appwrite";
import { Settings } from "@/types/appwrite.types";
import { revalidatePath } from "next/cache";

export const getSettings = async (): Promise<Settings> => {
  const settings: Settings = await databases.getDocument(
    DATABASE_ID!,
    SETTINGS_COLLECTION_ID!,
    "671df7da000082dbd932"
  );
  console.log(settings);
  return settings;
};

export const updateSettings = async (settings: {
  topbar_enabled: boolean;
  topbar_text: string;
  topbar_bg_color: string;
  topbar_text_color: string;
}) => {
  const updatedSettings = await databases.updateDocument(
    DATABASE_ID!,
    SETTINGS_COLLECTION_ID!,
    "671df7da000082dbd932",
    settings
  );
  revalidatePath("/admin/topbar");
  revalidatePath("/", "layout")
  return updatedSettings;
};
