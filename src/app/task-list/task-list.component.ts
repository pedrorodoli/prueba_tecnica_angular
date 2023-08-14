import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { CommunicationService } from '../communication.service';
import { NavigationExtras, Router } from '@angular/router';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  
  constructor(private taskService: TaskService, private communicationService: CommunicationService, private router: Router) {}

  ngOnInit() {
    this.tasks = this.taskService.getTasks();

    this.communicationService.agregarNuevaTarea$.subscribe(() => {
      this.agregarNuevaTarea();
    });
  }

  agregarNuevaTarea() {
    const newid = Math.max(...this.tasks.map(task => task.id)) + 1;
    const newTask = {
      id: newid,
      title: 'Nueva Tarea',
      description: 'Nueva Descripción'
    };
    this.taskService.anadir(newTask);

    this.actualizarTareas();
  }

  borrarTarea(taskId: number) {
    this.taskService.borrarTarea(taskId);
    this.actualizarTareas();
  }

  editarTarea(taskId: number) {
    const tarea = this.tasks.find(task => task.id === taskId);
    
    if (tarea) {
      const navigationExtras: NavigationExtras = {
        queryParams: { id: taskId, descripcion: tarea.description }
      };
    
      // Navegar a la ventana de edición con el ID de la tarea y la descripción
      this.router.navigate(['/task-edit'], navigationExtras);
    }
  }

  private actualizarTareas() {
    this.tasks = this.taskService.getTasks();
  }
}
