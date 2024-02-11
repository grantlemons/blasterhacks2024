import Compressor from "compressorjs";

export async function compressImageFile(file: File | Blob): Promise<Blob> {
  const res: File | Blob = await new Promise(function (resolve, reject) {
    new Compressor(file, {
      quality: 0.6,
      convertSize: 1000000,
      maxWidth: 1920,
      maxHeight: 1080,
      success: resolve,
      error: reject,
    });
  });

  return new Blob([res]);
}
