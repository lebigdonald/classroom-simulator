import {Component} from '@angular/core';
import {ClassroomService} from "./services/classroom.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Classroom Simulator';
  public isStarted: boolean = false;

  constructor(private classroomService: ClassroomService) {
  }

  startSimulation() {
    this.classroomService.run();
    this.isStarted = true;
  }

  stopSimulation() {
    this.classroomService.stop();
    this.isStarted = false;
  }

  clearConsole() {
    console.clear();
  }
}
