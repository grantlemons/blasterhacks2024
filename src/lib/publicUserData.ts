import { getAuth } from 'firebase/auth';
import { collection, doc, getFirestore, setDoc } from 'firebase/firestore';

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
