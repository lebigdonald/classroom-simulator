import {Visitor} from "../core/visitor";
import {Classroom} from "../core/classroom";

describe('Visitor', () => {
  let visitor: Visitor;
  let classroom: Classroom;

  beforeEach(() => {
    classroom = new Classroom(6, 'W201', 60);
    visitor = new Visitor(classroom);
  });

  it('should create a visitor instance', () => {
    expect(visitor).toBeTruthy();
    expect(visitor.isSitting).toBe(false);
    expect(visitor.classroom).toBe(classroom);
  });

  it('should enter the classroom and sit down', () => {
    const sitDownSpy = spyOn(visitor, 'sitDown').and.callThrough();
    const acquireSpy = spyOn(classroom.getStudentAndVisitorSemaphore(), 'acquire').and.callThrough();

    visitor.enter();

    expect(sitDownSpy).toHaveBeenCalled();
    expect(acquireSpy).toHaveBeenCalled();
    expect(visitor.isSitting).toBe(true);
    expect(classroom.filledVisitor).toBe(1);
  });

  it('should not enter the classroom if it is full', () => {
    const sitDownSpy = spyOn(visitor, 'sitDown').and.callThrough();
    const acquireSpy = spyOn(classroom.getStudentAndVisitorSemaphore(), 'acquire').and.callThrough();

    // Fill the classroom to its capacity
    classroom.filledVisitor = classroom.permits;

    expect(sitDownSpy).not.toHaveBeenCalled();
    expect(acquireSpy).not.toHaveBeenCalled();
    expect(visitor.isSitting).toBe(false);
    expect(classroom.filledVisitor).toBe(classroom.permits);
  });

  it('should leave the classroom and release the semaphore', () => {
    const releaseSpy = spyOn(classroom.getStudentAndVisitorSemaphore(), 'release').and.callThrough();
    spyOn(console, 'error'); // Spy on console.error to check if it's called

    visitor.isSitting = true; // Simulate a visitor sitting in the classroom

    visitor.leave();

    expect(releaseSpy).toHaveBeenCalled();
    expect(visitor.isSitting).toBe(false);
    expect(classroom.filledVisitor).toBe(0);
  });

  it('should run by entering the classroom', () => {
    const enterSpy = spyOn(visitor, 'enter').and.callThrough();

    visitor.run();

    expect(enterSpy).toHaveBeenCalled();
  });
});
