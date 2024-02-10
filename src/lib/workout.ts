// This is the shape of each document in Firestore.
type Workout = {
  kind: WorkoutKind
}

type WorkoutKind = "pushups" | "jumpingJacks" | "callMom" | "walk" | "wallSit" | "interpretiveDance";
