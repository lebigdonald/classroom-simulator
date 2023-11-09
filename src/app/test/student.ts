import {Student} from "../core/student";
import {Classroom} from "../core/classroom";

describe('Student', () => {
  let student: Student;
  let classroom: Classroom;

  beforeEach(() => {
    classroom = new Classroom(60, 'W201', 60);
    student = new Student(1, classroom); // Example values for rollNo and classroom
  });

  it('should create a student instance', () => {
    expect(student).toBeTruthy();
    expect(student.rollNo).toBe(1);
    expect(student.isSitting).toBe(false);
    expect(student.classroom).toBe(classroom);
  });

  it('should enter the classroom and sit down', async () => {
    const sitDownSpy = spyOn(student, 'sitDown').and.callThrough();
    const acquireSpy = spyOn(classroom.getStudentAndVisitorSemaphore(), 'acquire').and.callThrough();

    await student.enter();

    expect(sitDownSpy).toHaveBeenCalled();
    expect(acquireSpy).toHaveBeenCalled();
    expect(student.isSitting).toBe(true);
    expect(classroom.filled).toBe(1);
  });

  it('should not enter the classroom if it is full', async () => {
    const sitDownSpy = spyOn(student, 'sitDown').and.callThrough();
    const acquireSpy = spyOn(classroom.getStudentAndVisitorSemaphore(), 'acquire').and.callThrough();

    // Fill the classroom to its capacity
    classroom.filled = classroom.capacity;

    await student.enter();

    expect(sitDownSpy).not.toHaveBeenCalled();
    expect(acquireSpy).not.toHaveBeenCalled();
    expect(student.isSitting).toBe(false);
    expect(classroom.filled).toBe(classroom.capacity);
  });

  it('should leave the classroom and release the semaphore', () => {
    const releaseSpy = spyOn(classroom.getStudentAndVisitorSemaphore(), 'release').and.callThrough();
    spyOn(console, 'error'); // Spy on console.error to check if it's called

    student.isSitting = true; // Simulate a student sitting in the classroom

    // Call leave to leave the classroom
    student.leave();

    expect(releaseSpy).toHaveBeenCalled();
    expect(student.isSitting).toBe(false);
    expect(classroom.filled).toBe(0);
  });

  it('should run by entering the classroom', async () => {
    const enterSpy = spyOn(student, 'enter').and.callThrough();

    await student.run();

    expect(enterSpy).toHaveBeenCalled();
  });
});
