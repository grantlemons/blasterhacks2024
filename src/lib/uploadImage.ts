import { getStorage, ref, uploadBytes } from "firebase/storage";

export function uploadImage(blob, fname) {
  const storage = getStorage(); // create a root reference

  const targetRef = ref(storage, fname);
  uploadBytes(targetRef, blob)
    .catch((error) => {
      // TODO: better error handling that requires the user to log in to proceed
      // or much easier, just don't show the "take a photo" interface until the user is logged in
      console.log('There was an error while uploading to the database:', error);
    });
}
