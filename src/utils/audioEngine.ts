// Web Audio Engine for Romantic Songs and Sound Effects

export const DEFAULT_OFFICIAL_SONG_URL = '/audio/amer_muneeb_beena_neesh.mp3';
export const DEFAULT_OFFICIAL_SONG_NAME = 'عامر منيب - حب العمر (بينا نعيش) 🎶';

class RomanticAudioEngine {
  private ctx: AudioContext | null = null;
  private isPianoPlaying: boolean = false;
  private pianoTimer: number | null = null;
  private masterGain: GainNode | null = null;
  private volume: number = 0.8;

  // Main audio element for Amer Muneeb song & phone uploads
  private songAudio: HTMLAudioElement | null = null;
  private customAudioUrl: string | null = null;
  private hasCustomSong: boolean = false;
  private customSongName: string = '';

  private getAudioContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtxClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Initialize master gain
  private ensureMasterGain(): GainNode {
    const ctx = this.getAudioContext();
    if (!this.masterGain) {
      this.masterGain = ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, ctx.currentTime);
      this.masterGain.connect(ctx.destination);
    }
    return this.masterGain;
  }

  private ensureSongAudio(): HTMLAudioElement {
    if (!this.songAudio) {
      this.songAudio = new Audio();
      this.songAudio.loop = true;
      this.songAudio.preload = 'auto';
      this.songAudio.src = this.customAudioUrl || DEFAULT_OFFICIAL_SONG_URL;
      this.songAudio.volume = this.volume;
    }
    return this.songAudio;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
    if (this.songAudio) {
      this.songAudio.volume = this.volume;
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  // Load custom song from Blob
  public setCustomSong(blob: Blob, name: string) {
    if (this.customAudioUrl) {
      URL.revokeObjectURL(this.customAudioUrl);
    }
    this.customAudioUrl = URL.createObjectURL(blob);
    this.hasCustomSong = true;
    this.customSongName = name;

    const audio = this.ensureSongAudio();
    audio.src = this.customAudioUrl;
    audio.volume = this.volume;
    this.play();
  }

  public removeCustomSong() {
    if (this.customAudioUrl) {
      URL.revokeObjectURL(this.customAudioUrl);
      this.customAudioUrl = null;
    }
    this.hasCustomSong = false;
    this.customSongName = '';

    const audio = this.ensureSongAudio();
    audio.src = DEFAULT_OFFICIAL_SONG_URL;
    audio.volume = this.volume;
    this.play();
  }

  public getHasCustomSong(): boolean {
    return this.hasCustomSong;
  }

  public getCustomSongName(): string {
    return this.customSongName;
  }

  public getCurrentSongTitle(): string {
    if (this.hasCustomSong && this.customSongName) {
      return `📱 ${this.customSongName}`;
    }
    return DEFAULT_OFFICIAL_SONG_NAME;
  }

  // Toggle playback
  public togglePlay(): boolean {
    const isPlaying = this.isPlaying();
    if (isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public async play(): Promise<boolean> {
    try {
      this.getAudioContext();
      this.stopPianoLoop();
      const audio = this.ensureSongAudio();
      audio.volume = this.volume;
      await audio.play();
      return true;
    } catch {
      // Browser autoplay policy might reject without user gesture
      return false;
    }
  }

  public pause() {
    this.stopPianoLoop();
    if (this.songAudio) {
      this.songAudio.pause();
    }
  }

  public isPlaying(): boolean {
    if (this.songAudio && !this.songAudio.paused) {
      return true;
    }
    return this.isPianoPlaying;
  }

  // --- Piano Fallback Synthesis ---
  private playPianoNote(freq: number, duration: number = 2.5, velocity: number = 0.3) {
    try {
      const ctx = this.getAudioContext();
      const master = this.ensureMasterGain();
      const now = ctx.currentTime;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800 + velocity * 1200, now);
      filter.Q.setValueAtTime(1.5, now);
      filter.connect(master);

      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(freq, now);

      const osc2 = ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 2, now);

      const oscGain = ctx.createGain();
      oscGain.gain.setValueAtTime(velocity * 0.45, now);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc1.connect(oscGain);
      osc2.connect(oscGain);
      oscGain.connect(filter);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + duration);
      osc2.stop(now + duration);
    } catch {
      // AudioContext waiting for gesture
    }
  }

  private readonly romanticProgression = [
    [138.59, 174.61, 207.65, 277.18, 349.23],
    [103.83, 130.81, 155.56, 207.65, 261.63],
    [116.54, 138.59, 174.61, 233.08, 277.18],
    [92.50, 116.54, 138.59, 185.00, 233.08, 277.18]
  ];

  private currentChordIndex = 0;
  private currentArpStep = 0;

  public startPianoFallback() {
    if (this.isPianoPlaying) return;
    if (this.songAudio) {
      this.songAudio.pause();
    }
    this.isPianoPlaying = true;
    this.currentChordIndex = 0;
    this.currentArpStep = 0;

    const tick = () => {
      if (!this.isPianoPlaying) return;

      const chord = this.romanticProgression[this.currentChordIndex];
      if (this.currentArpStep === 0) {
        this.playPianoNote(chord[0], 3.8, 0.45);
      }

      const noteIndex = 1 + (this.currentArpStep % (chord.length - 1));
      const noteFreq = chord[noteIndex];
      const velocity = 0.22 + Math.sin(this.currentArpStep * 0.8) * 0.08;
      this.playPianoNote(noteFreq, 2.8, velocity);

      this.currentArpStep++;
      if (this.currentArpStep >= 8) {
        this.currentArpStep = 0;
        this.currentChordIndex = (this.currentChordIndex + 1) % this.romanticProgression.length;
      }

      this.pianoTimer = window.setTimeout(tick, 450);
    };

    tick();
  }

  private stopPianoLoop() {
    this.isPianoPlaying = false;
    if (this.pianoTimer) {
      clearTimeout(this.pianoTimer);
      this.pianoTimer = null;
    }
  }

  // --- Sound Effects ---
  public playWaxSealChime() {
    try {
      const ctx = this.getAudioContext();
      const master = this.ensureMasterGain();
      const now = ctx.currentTime;

      const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.15, ctx.sampleRate);
      const data = noiseBuffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.05));
      }
      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.08, now);
      noise.connect(noiseGain);
      noiseGain.connect(master);
      noise.start(now);

      const chimes = [659.25, 830.61, 987.77, 1318.51, 1661.22];
      chimes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0.2, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 1.2);

        osc.connect(gain);
        gain.connect(master);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 1.2);
      });
    } catch {
      // Ignored
    }
  }

  public playHeartbeatThump() {
    try {
      const ctx = this.getAudioContext();
      const master = this.ensureMasterGain();
      const now = ctx.currentTime;

      const playThump = (time: number, freq: number, duration: number, vol: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, time);
        osc.frequency.exponentialRampToValueAtTime(35, time + duration);

        gain.gain.setValueAtTime(vol, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

        osc.connect(gain);
        gain.connect(master);
        osc.start(time);
        osc.stop(time + duration);
      };

      playThump(now, 85, 0.16, 0.45);
      playThump(now + 0.22, 70, 0.22, 0.38);
    } catch {
      // Ignored
    }
  }

  public playCandleBlow() {
    try {
      const ctx = this.getAudioContext();
      const master = this.ensureMasterGain();
      const now = ctx.currentTime;

      const bufferSize = ctx.sampleRate * 0.8;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1);
      }
      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(500, now);
      filter.frequency.exponentialRampToValueAtTime(200, now + 0.8);
      filter.Q.setValueAtTime(3.0, now);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.25, now + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(master);

      whiteNoise.start(now);
      whiteNoise.stop(now + 0.8);
    } catch {
      // Ignored
    }
  }

  public playCelebrationChime() {
    try {
      const ctx = this.getAudioContext();
      const master = this.ensureMasterGain();
      const now = ctx.currentTime;

      const freqs = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
      freqs.forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, now + i * 0.06);

        gain.gain.setValueAtTime(0.25, now + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.06 + 1.5);

        osc.connect(gain);
        gain.connect(master);
        osc.start(now + i * 0.06);
        osc.stop(now + i * 0.06 + 1.5);
      });
    } catch {
      // Ignored
    }
  }
}

export const audioEngine = new RomanticAudioEngine();
