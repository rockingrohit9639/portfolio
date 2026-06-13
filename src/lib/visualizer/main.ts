import { initMic, initAudio, getAudioData } from "./audio";
import { initControls } from "./controls";
import { initScene, updateScene } from "./scene";

export function initVisualizer() {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const dropZone = document.getElementById("drop-zone") as HTMLDivElement;
  const fileInput = document.getElementById("file-input") as HTMLInputElement;
  const fileBtn = document.getElementById("file-btn") as HTMLButtonElement;

  initControls();
  initScene(canvas);

  let animating = false;

  function animate() {
    requestAnimationFrame(animate);
    const audioData = getAudioData();
    updateScene(audioData);
  }

  async function startWithMic() {
    try {
      await initMic();
      dropZone.classList.add("hidden");
      fileBtn.classList.remove("hidden");
      if (!animating) {
        animating = true;
        animate();
      }
    } catch {
      idleLoop();
    }
  }

  async function startWithFile(file: File) {
    dropZone.classList.add("hidden");
    fileBtn.classList.remove("hidden");
    await initAudio(file);
    if (!animating) {
      animating = true;
      animate();
    }
  }

  fileBtn.addEventListener("click", () => fileInput.click());
  fileInput.addEventListener("change", () => {
    const file = fileInput.files?.[0];
    if (file) startWithFile(file);
  });

  document.addEventListener("dragover", (e) => e.preventDefault());
  document.addEventListener("drop", (e) => {
    e.preventDefault();
    const file = e.dataTransfer?.files[0];
    if (file) startWithFile(file);
  });

  function idleLoop() {
    if (animating) return;
    updateScene({ bass: 0, mid: 0, treble: 0, raw: new Uint8Array(256) });
    requestAnimationFrame(idleLoop);
  }

  const startOnGesture = () => {
    startWithMic();
    document.removeEventListener("click", startOnGesture);
    document.removeEventListener("keydown", startOnGesture);
  };
  document.addEventListener("click", startOnGesture);
  document.addEventListener("keydown", startOnGesture);

  idleLoop();
}
