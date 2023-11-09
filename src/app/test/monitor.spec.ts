import {Classroom} from "../core/classroom";
import {Monitor} from "../core/monitor";

describe('Monitor', () => {
  it('should create a monitor instance', () => {
    const classrooms: Classroom[] = [];
    const monitor = new Monitor(classrooms);

    expect(monitor).toBeTruthy();
    expect(monitor.classrooms).toBe(classrooms);
  });

  it('should run and print classroom information to the console', () => {
    const classrooms: Classroom[] = [
      new Classroom(60, 'W201', 60),
      new Classroom(60, 'W202', 60),
    ];

    // Create a spy on console.table to capture the console output
    const consoleTableSpy = spyOn(console, 'table');

    const monitor = new Monitor(classrooms);
    monitor.run();

    // Verify that console.table was called with the expected data
    expect(consoleTableSpy).toHaveBeenCalledOnceWith([
      {
        Classroom: 'W201',
        Lecturer: '',
        InSession: false,
        Students: 0,
        Visitors: 0,
      },
      {
        Classroom: 'W202',
        Lecturer: '',
        InSession: false,
        Students: 0,
        Visitors: 0,
      },
    ]);
  });
});
