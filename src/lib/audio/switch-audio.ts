"use client";

/**
 * Topnotch Power Trading Desk - Synthetic Web Audio Engine
 * Pure synthesized industrial audio pulses using native Web Audio API oscillators.
 * Zero external audio asset dependencies. 100% client-side and silent when muted.
 */

let audioCtx: AudioContext | null = null;
let isAudioEnabled = true;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;

  try {
    if (!audioCtx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    return audioCtx;
  } catch {
    return null;
  }
}

export function toggleAudio(enabled?: boolean): boolean {
  if (typeof enabled === "boolean") {
    isAudioEnabled = enabled;
  } else {
    isAudioEnabled = !isAudioEnabled;
  }
  return isAudioEnabled;
}

export function getAudioState(): boolean {
  return isAudioEnabled;
}

/**
 * High-voltage vacuum circuit breaker synthetic mechanical click
 * Used on primary CTA button clicks and order submissions.
 */
export function playBreakerClick() {
  if (!isAudioEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;

    // Transient click pulse
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(35, now + 0.04);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);

    // Mechanical spring reverberation
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();

    subOsc.type = "triangle";
    subOsc.frequency.setValueAtTime(75, now + 0.02);
    subOsc.frequency.exponentialRampToValueAtTime(20, now + 0.08);

    subGain.gain.setValueAtTime(0.06, now + 0.02);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    subOsc.connect(subGain);
    subGain.connect(ctx.destination);

    subOsc.start(now + 0.02);
    subOsc.stop(now + 0.09);
  } catch {
    // Ignore audio playback constraints gracefully
  }
}

/**
 * Bourse clearing settlement harmonic chime
 * Used on successful schedule export, PDF download, and trade clearance.
 */
export function playBourseSuccess() {
  if (!isAudioEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const chords = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 major arpeggio

    chords.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = now + i * 0.06;

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.08, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.36);
    });
  } catch {
    // Graceful fallback
  }
}

/**
 * Telemetry 15-minute slot tick pulse
 * Sub-audible soft tick for chart scrubber and slider adjustment.
 */
export function playTelemetryTick() {
  if (!isAudioEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.015);

    gain.gain.setValueAtTime(0.03, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.018);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.02);
  } catch {
    // Graceful fallback
  }
}
