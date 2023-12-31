import {Injectable} from '@angular/core';
import {interval, takeWhile} from 'rxjs';
import {Classroom} from "../core/classroom";
import {Student} from "../core/student";
import {Lecturer} from "../core/lecturer";
import {Visitor} from "../core/visitor";
import {Random} from "../core/random";
import {Monitor} from "../core/monitor";

@Injectable({
  providedIn: 'root',
})
export class ClassroomService {
  public rand = new Random(4);
  public classrooms: Classroom[] = [];
  public visitors: Visitor[] = [];
  public students: Student[] = [];
  public lecturers: Lecturer[] = [];

  public flag: boolean = false; // Flag to end loop upon interrupt

  constructor() {
  }

  public run(): void {
    this.flag = true;
    const interval$ = interval(2000); // Observable that emits every 2 seconds

    interval$.pipe(takeWhile(() => this.flag)).subscribe(() => {
      this.simulation();
    });
  }

  public stop(): void {
    this.flag = false;
  }

  public simulation(): void {
    this.classrooms = [
      new Classroom(60, 'W201', 60),
      new Classroom(60, 'W202', 60),
      new Classroom(20, 'W101', 20),
      new Classroom(30, 'JS101', 30)
    ];

    this.visitors = [
      new Visitor(this.classrooms[this.rand.nextInt(4)]),
      new Visitor(this.classrooms[this.rand.nextInt(4)]),
      new Visitor(this.classrooms[this.rand.nextInt(4)]),
      new Visitor(this.classrooms[this.rand.nextInt(4)]),
      new Visitor(this.classrooms[this.rand.nextInt(4)])
    ]

    this.lecturers = [
      new Lecturer("Osama", this.classrooms[this.rand.nextInt(4)], this.students),
      new Lecturer("Barry", this.classrooms[this.rand.nextInt(4)], this.students),
      new Lecturer("Faheem", this.classrooms[this.rand.nextInt(4)], this.students),
      new Lecturer("Alex", this.classrooms[this.rand.nextInt(4)], this.students),
      new Lecturer("Aqeel", this.classrooms[this.rand.nextInt(4)], this.students),
      new Lecturer("Waseem", this.classrooms[this.rand.nextInt(4)], this.students),
    ];

    try {
      // Loop where students enter class
      for (let stud = 0; stud < 90; stud++) {
        this.students[stud] = new Student(stud, this.classrooms[this.rand.nextInt(4)]);
        this.students[stud].run();
      }

      // Loop where visitors enter class
      for (let vis = 0; vis < this.visitors.length; vis++) {
        this.visitors[vis].run();
      }

      // Loop where lecturer enter class
      for (let lect = 0; lect < this.lecturers.length; lect++) {
        this.lecturers[lect].run();
      }

      for (let lect = 0; lect < this.lecturers.length; lect++) {
        this.lecturers[lect].startLecture();
      }

      // Monitor thread for printing status of classes
      let monitor: Monitor = new Monitor(this.classrooms);
      monitor.run();

      for (let lect = 0; lect < this.lecturers.length; lect++) {
        this.lecturers[lect].leave();
      }

      //  Release loop
      for (let clas = 0; clas < this.classrooms.length; clas++) {
        if (!this.classrooms[clas].isLectureRunning) {
          for (let stud = 0; stud < this.students.length; stud++) {
            if (!this.students[stud].isSitting) {
              this.students[stud].leave();
            }
          }
        }
      }
    } catch (exception: any) {
      console.log(exception)
    }
  }
}
