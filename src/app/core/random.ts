export class Random {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed;
  }

  public nextInt(max: number): number {
    this.seed = (this.seed * 1103515245 + 12345) % 2147483647;
    return Math.floor(this.seed / 65536) % max;
  }
}
