import {Classroom} from "./classroom";

export class Student {
  public isSitting = false;
  public rollNo: number;
  public classroom!: Classroom;

  constructor(rollNo: number, classroom: Classroom) {
    this.rollNo = rollNo;
    if (classroom.getStudentAndVisitorSemaphore().availablePermits() > 0) {
      this.classroom = classroom;
    }
  }

  public getIsSitting(): boolean {
    return this.isSitting;
  }

  async enter(): Promise<void> {
    if (this.classroom != null) {
      if (!this.classroom.checkClassFull()) {
        if (!this.classroom.isLectureRunning && this.classroom.getStudentAndVisitorSemaphore().availablePermits() > 0) {
          await this.sitDown();
        }
      }
    }
  }

  async sitDown(): Promise<void> {
    try {
      this.isSitting = true;
      this.classroom.filled++; // Increment filled variable when student sits
      await this.classroom.getStudentAndVisitorSemaphore().acquire(); //  Semaphore acquired
    } catch (error) {
      console.error(error);
    }
  }

  leave(): void {
    if (!this.classroom?.isLectureRunning && this.classroom?.lecturer === '') {
      this.isSitting = false;
      this.classroom.filled--; // Increment filled variable when student leaves
      this.classroom?.getStudentAndVisitorSemaphore().release(); // Semaphore released
    }
  }

  async run(): Promise<void> {
    await this.enter();
  }
}
