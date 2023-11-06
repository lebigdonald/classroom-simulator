import { Classroom } from './classroom';
import { Student } from './student';

export class Lecturer {
  public isLectureRunning: boolean = false;
  public lecturerName: string;
  public classroom!: Classroom;
  public students: Student[];

  constructor(lecturerName: string, classroom: Classroom, students: Student[]) {
    this.lecturerName = lecturerName;
    if (classroom.getLecturerSemaphore().availablePermits() > 0) {
      this.classroom = classroom;
    }
    this.students = students;
  }

  public getIsLectureRunning(): boolean {
    return this.isLectureRunning;
  }

  async enter(): Promise<void> {
    if (this.classroom?.getLecturerSemaphore().availablePermits() > 0) {
      try {
        this.classroom.lecturer = this.lecturerName;
        await this.classroom.getLecturerSemaphore().acquire(); // Semaphore acquired
      } catch (error) {
        console.error(error);
      }
    }
  }

  async startLecture(): Promise<void> {
    let count = 0;

    // Count the number of students sitting in class
    for (const student of this.students) {
      if (student.classroom === this.classroom && student.isSitting) {
        count++;
      }
    }

    // Start lecture if all students are sitting
    if (this.classroom !== null && this.classroom.filled === count) {
      this.classroom.isLectureRunning = true;
      this.isLectureRunning = true;
    }
  }

  leave(): void {
    if (this.classroom?.isLectureRunning) {
      this.classroom.isLectureRunning = false;
      this.classroom.lecturer = '';
      this.classroom.getLecturerSemaphore().release(); // Semaphore released

      console.log(`${this.lecturerName}'s lecture over!`);
    }
  }
  async run(): Promise<void> {
    await this.enter();
  }
}
