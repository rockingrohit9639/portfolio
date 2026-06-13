export interface AudioData {
  bass: number;
  mid: number;
  treble: number;
  raw: Uint8Array<ArrayBuffer>;
}

let audioContext: AudioContext | null = null;
let analyser: AnalyserNode | null = null;
let frequencyData: Uint8Array<ArrayBuffer>;
let currentSource: AudioNode | null = null;

function ensureContext() {
  if (!audioContext) {
    audioContext = new AudioContext();
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 512;
    analyser.smoothingTimeConstant = 0.8;
    frequencyData = new Uint8Array(analyser.frequencyBinCount);
  }
}

export async function initMic(): Promise<void> {
  ensureContext();
  if (!audioContext || !analyser) return;

  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const micSource = audioContext.createMediaStreamSource(stream);

  if (currentSource) currentSource.disconnect();
  currentSource = micSource;

  micSource.connect(analyser);
  // Don't connect to destination — avoids feedback loop
}

export function initAudio(file: File): Promise<void> {
  return new Promise((resolve, reject) => {
    ensureContext();
    if (!audioContext || !analyser) return;

    if (currentSource) currentSource.disconnect();

    const reader = new FileReader();
    reader.onload = async () => {
      if (!audioContext || !analyser) return;

      const audioBuffer = await audioContext.decodeAudioData(
        reader.result as ArrayBuffer
      );

      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;

      source.connect(analyser);
      analyser.connect(audioContext.destination);

      currentSource = source;
      source.start(0);
      resolve();
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}

export function getAudioData(): AudioData {
  if (!analyser) {
    return { bass: 0, mid: 0, treble: 0, raw: new Uint8Array(256) };
  }

  analyser.getByteFrequencyData(frequencyData);

  const bins = analyser.frequencyBinCount;
  const third = Math.floor(bins / 3);

  let bassSum = 0;
  let midSum = 0;
  let trebleSum = 0;

  for (let i = 0; i < third; i++) bassSum += frequencyData[i];
  for (let i = third; i < third * 2; i++) midSum += frequencyData[i];
  for (let i = third * 2; i < bins; i++) trebleSum += frequencyData[i];

  return {
    bass: bassSum / (third * 255),
    mid: midSum / (third * 255),
    treble: trebleSum / ((bins - third * 2) * 255),
    raw: frequencyData,
  };
}
