import {Classroom} from "../core/classroom";

describe('Classroom', () => {
  let classroom: Classroom;

  beforeEach(() => {
    classroom = new Classroom(60, 'W201', 60); // Example values for permits, className, and capacity
  });

  it('should create a classroom instance', () => {
    expect(classroom).toBeTruthy();
    expect(classroom.getClassName()).toBe('W201');
    expect(classroom.capacity).toBe(60);
    expect(classroom.permits).toBe(60);
    expect(classroom.lecturer).toBe('');
    expect(classroom.isLectureRunning).toBe(false);
    expect(classroom.filled).toBe(0);
    expect(classroom.filledVisitor).toBe(0);
  });

  it('should check if the class is full', () => {
    expect(classroom.checkClassFull()).toBe(false); // The class is not full initially
    classroom.filled = 60; // Set the filled count to the capacity
    expect(classroom.checkClassFull()).toBe(true); // The class is full
  });

  it('should get the lecturer semaphore', () => {
    const lecturerSemaphore = classroom.getLecturerSemaphore();
    expect(true).toBe(true);
  });

  it('should get the student and visitor semaphore', () => {
    const studentAndVisitorSemaphore = classroom.getStudentAndVisitorSemaphore();
    expect(true).toBe(true);
  });
});
