'use server';
import { getFirebaseServices } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function logFeedback(record: any) {
  try {
    const { db } = await getFirebaseServices();
    await addDoc(collection(db, "ai_feedback"), { ...record, createdAt: serverTimestamp() });
  } catch (e) {
    console.warn("Failed to save feedback", e);
  }
}
