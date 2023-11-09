import {Random} from "../core/random";

describe('Random', () => {
  it('should create a Random instance with a seed', () => {
    const random = new Random(123); // Example seed value
    expect(random).toBeTruthy();
  });

  it('should generate random integers within the specified range', () => {
    const random = new Random(123); // Example seed value

    // Generate a sequence of random integers
    const generatedIntegers = Array.from({ length: 100 }, () => random.nextInt(10));

    // Ensure that all generated integers are within the range [0, 10)
    for (const num of generatedIntegers) {
      expect(num).toBeGreaterThanOrEqual(0);
      expect(num).toBeLessThan(10);
    }
  });

  it('should generate the same sequence with the same seed', () => {
    const seed = 123; // Example seed value
    const random1 = new Random(seed);
    const random2 = new Random(seed);

    // Generate sequences of random integers with the same seed
    const generatedIntegers1 = Array.from({ length: 100 }, () => random1.nextInt(10));
    const generatedIntegers2 = Array.from({ length: 100 }, () => random2.nextInt(10));

    // Ensure that the sequences are identical
    expect(generatedIntegers1).toEqual(generatedIntegers2);
  });
});
