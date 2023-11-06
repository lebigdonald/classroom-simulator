import {Injectable} from '@angular/core';
import {interval, fromEvent, takeWhile} from 'rxjs';
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

  private flag: boolean = true; // Flag to end loop upon interrupt

  constructor() {}

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

  private simulation(): void {
    this.classrooms = [
      new Classroom('W201', 60),
      new Classroom('W202', 60),
      new Classroom('W101', 20),
      new Classroom('JS101', 30)
    ];

    // this.visitors = [
    //   new Visitor(this.classrooms[this.rand.nextInt(4)]),
    //   new Visitor(this.classrooms[this.rand.nextInt(4)]),
    //   new Visitor(this.classrooms[this.rand.nextInt(4)]),
    //   new Visitor(this.classrooms[this.rand.nextInt(4)]),
    //   new Visitor(this.classrooms[this.rand.nextInt(4)]),
    // ];

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
      for (let i = 0; i < this.classrooms[this.rand.nextInt(4)].capacity; i++) {
        this.students[i] = new Student(i, this.classrooms[this.rand.nextInt(4)]);
        this.students[i].run();
      }

      // Loop where visitors enter class
      for (let z = 0; z < 4; z++) {
        this.visitors[z] = new Visitor(this.classrooms[this.rand.nextInt(4)]);
        this.visitors[z].run();
      }

      // Loop where lecturer enter class
      for (let l = 0; l < this.lecturers.length; l++) {
        this.lecturers[l].run();
      }

      // Monitor thread for printing status of classes
      let monitor: Monitor = new Monitor(this.classrooms);
      monitor.run();
    } catch (exception: any) {
      console.log(exception)
    }
  }
}
