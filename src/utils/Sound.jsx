class SoundManager {
  constructor() {
    this.sounds = {};
    this.enabled = true;
  }

  load(name, path, volume = 0.5) {
    const audio = new Audio(path);
    audio.volume = volume;
    this.sounds[name] = audio;
  }

  play(name) {
    if (!this.enabled) return;
    const s = this.sounds[name];
    if (s) {
      s.currentTime = 0;
      s.play().catch(() => {});
    }
  }

  toggle() {
    this.enabled = !this.enabled;
  }
}

export const Sound = new SoundManager();
