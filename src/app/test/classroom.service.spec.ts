import { TestBed } from '@angular/core/testing';
import {ClassroomService} from "../services/classroom.service";

describe('ClassroomService', () => {
  let service: ClassroomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassroomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start the simulation', () => {
    expect(service.flag).toBe(false);
    service.run();
    expect(service.flag).toBe(true);
  });

  it('should stop the simulation', () => {
    service.run();
    expect(service.flag).toBe(true);
    service.stop();
    expect(service.flag).toBe(false);
  });

  it('should initialize classrooms, visitors, students, and lecturers during simulation', () => {
    service.simulation();
    expect(service.classrooms.length).toBe(4); // Check the number of classrooms created
    expect(service.visitors.length).toBe(5);   // Check the number of visitors created
    expect(service.students.length).toBe(90);  // Check the number of students created
    expect(service.lecturers.length).toBe(6);  // Check the number of lecturers created
  });

  it('should handle exceptions during simulation', () => {
    spyOn(console, 'log'); // Spy on console.log to check if it's called
    service.simulation(); // Ensure that an exception occurs during simulation
    expect(console.log).toHaveBeenCalled();
  });
});
