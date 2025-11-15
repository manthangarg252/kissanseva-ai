'use server';
import { getFirebaseServices } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function pushLabeledExample(payload: any) {
  try {
    const { db } = await getFirebaseServices();
    await addDoc(collection(db, 'model_training_examples'), { ...payload, createdAt: serverTimestamp() });
    return { ok: true };
  } catch (e: any) { return { ok: false, error: String(e) }; }
}
