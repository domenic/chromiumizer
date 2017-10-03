import chromiumize from "./chromiumize.mjs";
import { isImageFile, getImageViaPicker, blobToImageData } from "./utils.mjs";

const dropTargetLabels = [...document.querySelectorAll(".drop-target-label")];
const dropTarget = document.querySelector("#drop-target");
const output = document.querySelector("#output");
const again = document.querySelector("#again");

if (navigator.serviceWorker) {
  navigator.serviceWorker.register("/service-worker.js");
}

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

again.addEventListener("click", () => {
  output.hidden = true;
  again.hidden = true;
  dropTargetLabels.forEach(l => l.hidden = false);
  dropTarget.hidden = false;
});

async function processFile(file) {
  const imageData = await blobToImageData(file);

  chromiumize(imageData);

  dropTargetLabels.forEach(l => l.hidden = true);
  dropTarget.hidden = true;

  // CSS will constrain us to fit in the viewport. These dimensions govern the output bitmap size, which at
  // least in Chrome impacts the result of right click > "Save image as...".
  output.width = imageData.width;
  output.height = imageData.height;
  const context = output.getContext("2d");
  context.putImageData(imageData, 0, 0);

  output.hidden = false;
  again.hidden = false;
}
