import {Classroom} from "./classroom";

export class Visitor {
  classroom!: Classroom;
  isSitting: boolean = false;

  constructor(classroom: Classroom) {
    if (classroom.getStudentAndVisitorSemaphore().availablePermits() > 0) {
      this.classroom = classroom;
    }
  }

  enter(): void {
    // Checks whether classroom is full. If not full visitor can enter
    if (!this.classroom.checkClassFull()) {
      this.classroom.filledVisitor++;
      this.sitDown();
    }
  }

  async sitDown(): Promise<void> {
    this.isSitting = true;
    await this.classroom.getStudentAndVisitorSemaphore().acquire(); // Semaphore acquired
  }

  leave(): void {
    this.classroom.getStudentAndVisitorSemaphore().release(); // Semaphore released
  }

  async run(): Promise<void> {
    this.enter();
  }
}
