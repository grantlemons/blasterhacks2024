import { getAuth } from 'firebase/auth';
import { CollectionReference, and, collection, doc, getDocs, getFirestore, limit, or, query, setDoc, where } from 'firebase/firestore';
import { startCase } from "lodash-es"

export type PublicUserData = {
	displayName?: string;
};

export function publicUserDataCollection(): CollectionReference {
	return collection(getFirestore(), 'publicUserData');
}

/** Publishes the current private user data to the public collection.
 * Does nothing if the user is not signed in. */
export async function publishPublicUserData(): Promise<void> {
	let currentUser = getAuth().currentUser;

	if (currentUser == null) {
		return;
	}

	await setDoc(doc(publicUserDataCollection(), currentUser.uid), {
		displayName: currentUser.displayName
	});
}

/** This function is super scuffed, but it works for most queries. */
export async function searchForUser(
  username: string
): Promise<Map<string, PublicUserData>> {
  const snapshot = await getDocs(
    query(
      publicUserDataCollection(),
      and(
        or(
          and(
            where("displayName", ">=", username),
            where("displayName", "<=", username + "~")
          ),
          and(
            where("displayName", ">=", username.toLowerCase()),
            where("displayName", "<=", username.toLowerCase() + "~")
          ),
          and(
            where("displayName", ">=", username.toUpperCase()),
            where("displayName", "<=", username.toUpperCase() + "~")
          ),
          and(
            where("displayName", ">=", username.toLowerCase()),
            where("displayName", "<=", username.toLowerCase() + "~")
          ),
          and(
            where("displayName", ">=", startCase(username)),
            where("displayName", "<=", startCase(username) + "~")
          )
        )
      ),
      limit(20)
    )
  );

  const results = new Map();

  for (const document of snapshot.docs) {
    const data = document.data();
    results.set(document.id, data);
  }

  return results;
}
