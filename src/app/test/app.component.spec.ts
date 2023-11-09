import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from "../app.component";
import {ClassroomService} from "../services/classroom.service";

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let classroomService: ClassroomService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [ClassroomService],
    });
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    classroomService = TestBed.inject(ClassroomService);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should start the simulation', () => {
    spyOn(classroomService, 'run');
    component.startSimulation();
    expect(classroomService.run).toHaveBeenCalled();
    expect(component.isStarted).toBe(true);
  });

  it('should stop the simulation', () => {
    spyOn(classroomService, 'stop');
    component.stopSimulation();
    expect(classroomService.stop).toHaveBeenCalled();
    expect(component.isStarted).toBe(false);
  });

  it('should clear the console', () => {
    spyOn(console, 'clear');
    component.clearConsole();
    expect(console.clear).toHaveBeenCalled();
  });
});
