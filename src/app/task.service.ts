import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  public tasks = [
    {id: 1, title: 'Tarea 1', description: 'Descripcion 1'},
    {id: 2, title: 'Tarea 2', description: 'Descripcion 2'},
    {id: 3, title: 'Tarea 3', description: 'Descripcion 3'}
  ];

  getTasks() {
    return this.tasks;
  }

  anadir(newTask: { id: number, title: string, description: string }) {
    this.tasks.push(newTask);
  }

  borrarTarea(taskId: number) {
    const index = this.tasks.findIndex(task => task.id === taskId);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      for (let i = index; i < this.tasks.length; i++) {
        this.tasks[i].id = this.tasks[i].id - 1;
      }
    }
  }

  actualizarDescripcion(taskId: number, newDescription: string) {
    const taskToUpdate = this.tasks.find(task => task.id === taskId);
    if (taskToUpdate) {
      taskToUpdate.description = newDescription;
    }
  }

  constructor() { }
}
