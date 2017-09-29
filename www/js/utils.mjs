export function isImageFile(dataTransferItem) {
  return dataTransferItem.kind === "file" && dataTransferItem.type.startsWith("image/");
}

export async function blobToImageData(blob) {
  const imageBitmap = await createImageBitmap(blob);

  const canvas = document.createElement("canvas");
  canvas.width = imageBitmap.width;
  canvas.height = imageBitmap.height;

  const context = canvas.getContext("2d");
  context.drawImage(imageBitmap, 0, 0);
  return context.getImageData(0, 0, imageBitmap.width, imageBitmap.height);
}

export function getImageViaPicker() {
  return new Promise(resolve => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = () => resolve(input.files[0]);
    input.click();
  });
}
