import { db } from "@/lib/db";

interface DreamData {
  userId: number;
  title: string;
  content: string;
}

export async function saveDreamToDB(dreamData: DreamData) {
  const { userId, title, content } = dreamData;

  try {
    // Save dream to the database
    const dream = await db.dream.create({
      data: {
        userId,
        title,
        content,
      },
    });

    console.log("Dream saved to DB:", dream);
    return dream;
  } catch (error) {
    console.error("Error saving dream to DB:", error);
    throw new Error("Failed to save dream to the database.");
  }
}
