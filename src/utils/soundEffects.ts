/**
 * Utility: Web Audio Synthesizer
 * Provides synthesized tactile dice rattles and parchment chimes without external audio assets.
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playRollSound(muted = false) {
  if (muted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    for (let i = 0; i < 4; i++) {
      const clickOsc = ctx.createOscillator();
      const clickGain = ctx.createGain();
      clickOsc.type = "triangle";
      clickOsc.frequency.setValueAtTime(
        300 + Math.random() * 300,
        now + i * 0.05,
      );

      clickGain.gain.setValueAtTime(0.08, now + i * 0.05);
      clickGain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.03);

      clickOsc.connect(clickGain);
      clickGain.connect(ctx.destination);

      clickOsc.start(now + i * 0.05);
      clickOsc.stop(now + i * 0.05 + 0.04);
    }

    const notes = [261.63, 329.63, 392.0, 523.25];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(
        freq * (1 + (Math.random() * 0.01 - 0.005)),
        now + 0.22 + idx * 0.04,
      );

      gain.gain.setValueAtTime(0.06, now + 0.22 + idx * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.9 + idx * 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + 0.22 + idx * 0.04);
      osc.stop(now + 1.1);
    });
  } catch {}
}

export function playChimeSound(muted = false) {
  if (muted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(587.33, now); // D5
    osc.frequency.exponentialRampToValueAtTime(880.0, now + 0.15); // A5

    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.45);
  } catch {
    // Ignore audio restriction
  }
}
