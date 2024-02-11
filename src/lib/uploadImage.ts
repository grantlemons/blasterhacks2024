import { getStorage, ref, uploadBytes } from "firebase/storage";
import { compressImageFile } from "./compress";

export async function uploadImage(blob: Blob, fname: string) {
  const storage = getStorage(); // create a root reference

  const targetRef = ref(storage, fname);
  let compressed = await compressImageFile(blob);
  await uploadBytes(targetRef, compressed)
    .catch((error) => {
      // TODO: better error handling that requires the user to log in to proceed
      // or much easier, just don't show the "take a photo" interface until the user is logged in
      console.log('There was an error while uploading to the database:', error);
    });
}
