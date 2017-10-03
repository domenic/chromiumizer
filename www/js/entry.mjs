import chromiumize from "./chromiumize.mjs";
import { isImageFile, getImageViaPicker, blobToImageData, canvasToBlob, downloadFile }
  from "./utils.mjs";

const beforeUpload = [...document.querySelectorAll(".before-upload")];
const afterUpload = [...document.querySelectorAll(".after-upload")];
const dropTarget = document.querySelector("#drop-target");
const output = document.querySelector("#output");
const again = document.querySelector("#again");

if (navigator.serviceWorker) {
  navigator.serviceWorker.register("/service-worker.js");
}

let currentFilename;

// Mark it as willing to accept the drop of image items
dropTarget.addEventListener("dragenter", e => {
  const items = [...e.dataTransfer.items];
  if (items.some(isImageFile)) {
    e.preventDefault();
  }
});

// Use the correct dropEffect
dropTarget.addEventListener("dragover", e => {
  e.dropEffect = "copy";
  e.preventDefault();
});

// Accept the drop
dropTarget.addEventListener("drop", e => {
  e.preventDefault();

  const file = e.dataTransfer.items[0].getAsFile();
  processFile(file);
});

// If they click, just upload that way
dropTarget.addEventListener("click", async () => {
  const file = await getImageViaPicker();
  processFile(file);
});

// Clicking on the output will trigger a download
output.addEventListener("click", async () => {
  const blob = await canvasToBlob(output);
  const filename = currentFilename.replace(/\.[^.]+$/, "") + "-chromiumized.png";
  const file = new File([blob], filename);

  downloadFile(file);
});

again.addEventListener("click", () => {
  beforeUpload.forEach(el => el.hidden = false);
  afterUpload.forEach(el => el.hidden = true);
});

async function processFile(file) {
  const imageData = await blobToImageData(file);

  chromiumize(imageData);

  // CSS will constrain us to fit in the viewport. These dimensions govern the output bitmap size,
  // which will impact the downloaded file.
  output.width = imageData.width;
  output.height = imageData.height;
  const context = output.getContext("2d");
  context.putImageData(imageData, 0, 0);

  beforeUpload.forEach(el => el.hidden = true);
  afterUpload.forEach(el => el.hidden = false);

  currentFilename = file.name;
}
