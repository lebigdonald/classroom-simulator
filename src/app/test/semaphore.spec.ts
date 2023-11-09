import {Semaphore} from "../core/semaphore";

describe('Semaphore', () => {
  let semaphore: Semaphore;

  beforeEach(() => {
    semaphore = new Semaphore(1); // Example value for permits
  });

  it('should create a semaphore instance with positive permits', () => {
    expect(semaphore).toBeTruthy();
    expect(semaphore.availablePermits()).toBe(1);
  });

  it('should throw an error when created with negative permits', () => {
    expect(() => new Semaphore(-1)).toThrowError('Permits must be non-negative');
  });

  it('should acquire a permit and decrease the available permits', async () => {
    await semaphore.acquire();
    expect(semaphore.availablePermits()).toBe(0);
  });

  it('should release a permit and increase the available permits', () => {
    semaphore.release();
    expect(semaphore.availablePermits()).toBe(2);
  });

  it('should resolve pending acquires when a permit is released', async () => {
    semaphore = new Semaphore(1); // No initial permits
    const acquirePromise = semaphore.acquire();

    let resolved = false;

    // Release a permit to allow acquirePromise to resolve
    semaphore.release();

    // Ensure that acquirePromise has resolved
    acquirePromise.then(() => {
      resolved = true;
    });

    // Wait for the promise to resolve
    await new Promise((resolve) => setTimeout(resolve, 10));

    expect(semaphore.availablePermits()).toBe(1); // No additional permits available
  });
});
