import {Classroom} from "./classroom";

export class Student {
  isSitting = false;
  rollNo: number;
  classroom!: Classroom;

  constructor(rollNo: number, classroom: Classroom) {
    this.rollNo = rollNo;
    if (classroom.getStudentAndVisitorSemaphore().availablePermits() > 0) {
      this.classroom = classroom;
    }
  }

  getIsSitting(): boolean {
    return this.isSitting;
  }

  async enter(): Promise<void> {
    if (!this.classroom.checkClassFull()) {
      await this.sitDown();
    }
  }

  async sitDown(): Promise<void> {
    try {
      //  Check if lecturer is already in class
        this.isSitting = true;
        this.classroom.filled++; // Increment filled variable when student sits
        await this.classroom.getStudentAndVisitorSemaphore().acquire(); //  Semaphore acquire
    } catch (error) {
      this.leave();
      console.error(error);
    }
  }

  leave(): void {
    if (this.classroom.lecturer === '') {
      this.isSitting = false;
      this.classroom.filled--; // Decrement filled variable when student leave
      this.classroom?.getStudentAndVisitorSemaphore().release(); // Semaphore released
    }
  }

  async run(): Promise<void> {
    await this.enter();
  }
}
