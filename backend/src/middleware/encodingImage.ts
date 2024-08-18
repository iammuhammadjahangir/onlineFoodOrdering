import { encode } from "blurhash";
import sharp from "sharp";

export const encodeImageToBlurhash = (path: string): Promise<string> =>
  new Promise((resolve, reject) => {
    sharp(path)
      .raw()
      .ensureAlpha()
      .resize(32, 32, { fit: "inside" })
      .toBuffer((err, buffer, { width, height }) => {
        if (err) return reject(err);
        resolve(encode(new Uint8ClampedArray(buffer), width, height, 4, 4));
      });
  });

// async function encodeAllImages() {
//   const imagesNames = await fs.readdir(IMAGES_DIR_PATH);

//   const data: { name: string; blurhash: string }[] = [];

//   for (const name of imagesNames) {
//     const encodedHash = await encodeImageToBlurhash(
//       path.join(__dirname, "images", name)
//     );
//     data.push({ name, blurhash: encodedHash });
//     console.log("Hash: ", encodedHash);
//   }

//   console.log(data);
// }
