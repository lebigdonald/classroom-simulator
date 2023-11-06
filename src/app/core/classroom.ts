import { Semaphore } from './semaphore';

export class Classroom {
  public className: string;
  public capacity: number;
  public lecturer: string = '';
  private lecturerSemaphore: Semaphore = new Semaphore(1);
  private studentAndVisitorSemaphore: Semaphore;
  public isLectureRunning: boolean = false;
  public filled: number = 0;
  public filledVisitor: number = 0;

  constructor(className: string, capacity: number) {
    this.studentAndVisitorSemaphore = new Semaphore(capacity);
    this.className = className;
    this.capacity = capacity;
  }

  // Check if the class is full
  public checkClassFull(): boolean {
    return this.capacity === this.filled;
  }

  public getClassName(): string {
    return this.className;
  }

  // Getter method for the lecture semaphore
  public getLecturerSemaphore(): Semaphore {
    return this.lecturerSemaphore;
  }

  // Getter method for the student and visitor semaphore
  public getStudentAndVisitorSemaphore(): Semaphore {
    return this.studentAndVisitorSemaphore;
  }
}
