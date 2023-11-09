import {Lecturer} from "../core/lecturer";
import {Classroom} from "../core/classroom";
import {Student} from "../core/student";

describe('Lecturer', () => {
  let lecturer: Lecturer;
  let classroom: Classroom;
  let students: Student[];

  beforeEach(() => {
    classroom = new Classroom(60, 'W201', 60);
    students = [];
    for (let i = 0; i < 60; i++) {
      students.push(new Student(i, classroom));
    }

    lecturer = new Lecturer('John Doe', classroom, students);
  });

  it('should create a lecturer instance', () => {
    expect(lecturer).toBeTruthy();
    expect(lecturer.lecturerName).toBe('John Doe');
    expect(lecturer.isLectureRunning).toBe(false);
    expect(lecturer.classroom).toBe(classroom);
    expect(lecturer.students).toBe(students);
  });

  it('should enter the classroom and acquire the semaphore', async () => {
    const semaphoreSpy = spyOn(classroom.getLecturerSemaphore(), 'acquire').and.callThrough();

    await lecturer.enter();

    expect(classroom.lecturer).toBe('John Doe');
    expect(semaphoreSpy).toHaveBeenCalled();
  });

  it('should start the lecture when all students are sitting', async () => {
    const startLectureSpy = spyOn(lecturer, 'startLecture').and.callThrough();

    // Call enter to occupy the classroom
    await lecturer.enter();

    // Call startLecture with not all students sitting
    await lecturer.startLecture();

    expect(lecturer.isLectureRunning).toBe(true);
    expect(classroom.isLectureRunning).toBe(true);
    expect(classroom.lecturer).toBe('John Doe');
    expect(startLectureSpy).toHaveBeenCalled();
  });

  it('should not start the lecture when not all students are sitting', async () => {
    const startLectureSpy = spyOn(lecturer, 'startLecture').and.callThrough();

    // Set all students to be sitting
    students.forEach((student) => (student.isSitting = true));

    // Call enter to occupy the classroom
    await lecturer.enter();

    // Call startLecture with all students sitting
    await lecturer.startLecture();

    expect(lecturer.isLectureRunning).toBe(false);
    expect(classroom.isLectureRunning).toBe(false);
    expect(classroom.lecturer).toBe('John Doe');
    expect(startLectureSpy).toHaveBeenCalled();
  });

  it('should leave the classroom and release the semaphore', () => {
    // Call enter to occupy the classroom
    lecturer.enter();

    // Call leave to end the lecture
    lecturer.leave();

    expect(lecturer.isLectureRunning).toBe(false);
    expect(classroom.isLectureRunning).toBe(false);
  });

  it('should run by entering the classroom', async () => {
    const enterSpy = spyOn(lecturer, 'enter').and.callThrough();

    await lecturer.run();

    expect(enterSpy).toHaveBeenCalled();
  });
});
