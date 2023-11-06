export class Semaphore {
  private permits: number;

  constructor(permits: number) {
    if (permits < 0) {
      throw new Error('Permits must be non-negative');
    }
    this.permits = permits;
  }

  async acquire(): Promise<void> {
    if (this.permits > 0) {
      this.permits--;
    } else {
      await new Promise((resolve) => {
        this.pendingAcquires.push();
      });
    }
  }

  release(): void {
    if (this.pendingAcquires.length > 0) {
      const resolve = this.pendingAcquires.shift();
      // resolve();
    } else {
      this.permits++;
    }
  }

  availablePermits(): number {
    return this.permits;
  }

  private pendingAcquires: Array<() => void> = [];
}
