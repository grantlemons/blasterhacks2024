import { CollectionReference, addDoc, collection, doc, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// This is the shape of each document in Firestore.
export type WorkoutPost = {
  kind: WorkoutKind
  description: string,
  imagePath: string | null
  userId: string
  /** Unix time in milliseconds */
  timestamp: number
}

export const allWorkoutKinds = ["pushups", "jumpingJacks", "callMom", "walk", "wallSit", "interpretiveDance"] as const;

type AllWorkoutKinds = typeof allWorkoutKinds;
export type WorkoutKind = AllWorkoutKinds[number];

// We make this a function to lazy-load the Firestore global.
// If we do it eagerly, it crashes.
function workoutCollection(): CollectionReference {
  return collection(getFirestore(), "workouts");
}

/** Inserts a workout into the database, returning the document's assigned ID.
  * Will automatically insert the current user's ID and timestamp.
  * 
  * Does nothing if the user is not signed in.
  * */
export async function insertWorkoutPost(kind: WorkoutKind, description: string, imagePath: string | null = null): Promise<string | null>{
  let currentUser = getAuth().currentUser;

  if (currentUser == null){
    return null;
  }

  let ref = await addDoc(workoutCollection(), { kind, description, imagePath, userId: currentUser.uid, timestamp: Date.now()});

  return ref.id;
}
