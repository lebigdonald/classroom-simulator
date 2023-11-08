import {Classroom} from "./classroom";

export class Monitor {
  classrooms: Classroom[];

  constructor(classrooms: Classroom[]) {
    this.classrooms = classrooms;
  }

  // Run method for monitor class
  run(): void {
    console.table(
      this.classrooms.map((classroom: Classroom) => ({
        Classroom: classroom.className,
        Lecturer: classroom.lecturer,
        InSession: classroom.isLectureRunning,
        Students: classroom.isLectureRunning ? classroom.filled : 0,
        Visitors: classroom.isLectureRunning ? classroom.filledVisitor : 0,
      }))
    );
  }
}
