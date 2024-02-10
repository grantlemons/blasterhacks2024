import { getFirestore, getDoc, collection, doc, setDoc, updateDoc, arrayUnion, CollectionReference  } from "firebase/firestore"
import { getAuth } from "firebase/auth"; 

type FriendDoc = {
  /** These are user IDs. */
  friends: string[]
}

export function friendsCollection(): CollectionReference{
  return collection(getFirestore(), "friends");
}

/** Gets the current users friends. 
  * Returns null if not signed in or the document doesn't exist.
  * */
export async function getFriends(): Promise<string[] | null>{
  let currentUser = getAuth().currentUser;

  if (currentUser == null){
    return null;
  }

  let document = await getDoc(doc(friendsCollection(), currentUser.uid))
  let data: FriendDoc | null = document.data();

  if (data == null){
    return null;
  }

  return data.friends;
}

/** Check if a given user ID is a friend of the current user. */
export async function isFriend(userId: string): Promise<boolean>{
  let friends = await getFriends();

  return friends?.includes(userId);
}

/** Creates the friends document if it does not already exist. */
async function ensureDocumentExists(){
  let currentUser = getAuth().currentUser;

  if (await getFriends() != null || currentUser == null){
    return;
  }

  await setDoc(doc(friendsCollection(), currentUser.uid), { friends: []});
}

/** Adds a user as a friend.
  *
  * Does nothing if the current user is not signed in. */
export async function addFriend(newFriendId: string){
  let currentUser = getAuth().currentUser;

  if (currentUser == null){
    return null;
  }

  await ensureDocumentExists();

  await updateDoc(doc(friendsCollection(), currentUser.uid), { friends: arrayUnion(newFriendId)})
}


