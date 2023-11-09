import {Classroom} from "./classroom";

export class Visitor {
  public classroom!: Classroom;
  public isSitting: boolean = false;

  constructor(classroom: Classroom) {
    if (classroom.getStudentAndVisitorSemaphore().availablePermits() > 0) {
      this.classroom = classroom;
    }
  }

  public enter(): void {
    if (!this.classroom?.checkClassFull()) {
      this.sitDown();
    }
  }

  async sitDown(): Promise<void> {
    try {
      this.isSitting = true;
      this.classroom.filledVisitor++; // Increment filledVisitor variable when visitor sits
      await this.classroom.getStudentAndVisitorSemaphore().acquire(); // Semaphore acquired
    } catch (error) {
      console.error(error);
    }
  }

  leave(): void {
    if (!this.classroom?.isLectureRunning && this.classroom?.lecturer === '') {
      this.isSitting = false;
      if (this.classroom.filledVisitor > 0) {
        this.classroom.filledVisitor--; // Increment filledVisitor variable when visitor leaves
      }
      this.classroom?.getStudentAndVisitorSemaphore().release(); // Semaphore released
    }
  }

  async run(): Promise<void> {
    await this.enter();
  }
}
