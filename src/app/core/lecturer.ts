import { Classroom } from './classroom';
import { Student } from './student';

export class Lecturer {
  public isLectureRunning: boolean = false;
  public lecturerName: string;
  public classroom!: Classroom;
  public students: Student[];

  constructor(lecturerName: string, classroom: Classroom, students: Student[]) {
    this.lecturerName = lecturerName;
    if (classroom.getStudentAndVisitorSemaphore().availablePermits() > 0) {
      this.classroom = classroom;
    }
    this.students = students;
  }

  public getIsLectureRunning(): boolean {
    return this.isLectureRunning;
  }

  // Enter class function
  public enter(): void {
    // Checks whether the classroom is not full. If not full, the lecturer can enter
    if (this.classroom.getLecturerSemaphore().availablePermits() > 0) {
      try {
        this.classroom.lecturer = this.lecturerName;
        this.classroom.getLecturerSemaphore().acquire(); // Semaphore acquired
        this.startLecture();
      } catch (error) {
        console.error(error);
      }
    }
  }

  // Start lecture function
  async startLecture(): Promise<void> {
    let count = 0;

    // Loop to count the number of students sitting in class
    for (const student of this.students) {
      if (student.classroom && this.classroom) {
        if (student.classroom.className === this.classroom.className) {
          // console.log(student);
          if (student.isSitting) {
            count++;
          }
        }
      }
    }

    // Lecture starts if all students are sitting
    if (this.classroom) {
      if (this.classroom.filled === count) {
        this.classroom.isLectureRunning = true;
        this.isLectureRunning = true;
      } else {
        this.leave();
      }
    }
  }

  // End lecture function
  public leave(): void {
    // Check if the lecture is running, if running, end it and release the semaphore
    if (this.classroom.isLectureRunning) {
      this.classroom.isLectureRunning = false;
      this.classroom.lecturer = '';
      this.classroom.getLecturerSemaphore().release(); // Semaphore released

      console.log(this.lecturerName + "'s lecture over!");
    }
  }

  async run(): Promise<void> {
    this.enter();
  }
}
