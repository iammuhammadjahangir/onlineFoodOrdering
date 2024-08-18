import { decode } from "blurhash";

export const pixels = decode("UvKT#*-oxZVs~otRt8WB%LR*WBW?kCRkaeoy", 32, 32);

const width = 32;
const height = 32;

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
const imageData = ctx!.createImageData(width, height);
imageData.data.set(pixels);
ctx!.putImageData(imageData, 0, 0);
document.body.append(canvas);
