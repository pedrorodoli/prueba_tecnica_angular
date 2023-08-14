import { Component, OnInit } from '@angular/core';
import { CommunicationService } from './communication.service';
import { TaskService } from './task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Netberry';

  mostrarEncabezado = true;

  tasks: any[] = [];

  constructor(private taskService: TaskService, private communicationService: CommunicationService) {}

  ngOnInit() {
    this.tasks = this.taskService.getTasks();

    this.communicationService.agregarNuevaTarea$.subscribe(() => {
      this.nuevaTarea();
    });
  }

  nuevaTarea() {
    const newid = Math.max(...this.tasks.map(task => task.id)) + 1;
    const newTask = {
      id: newid,
      title: 'Nueva Tarea',
      description: 'Nueva Descripción'
    };
    this.taskService.anadir(newTask);

    this.actualizarTareas();
    console.log(this.tasks);
  }

  borrarTarea(taskId: number) {
    this.taskService.borrarTarea(taskId);
    this.actualizarTareas();
  }

  private actualizarTareas() {
    this.tasks = this.taskService.getTasks();
  }
}
