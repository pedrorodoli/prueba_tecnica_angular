import { Component, EventEmitter } from '@angular/core';
import { TaskService } from '../task.service';
import { CommunicationService } from '../communication.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent {

  tasks: any[] = [];
  taskForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private taskService: TaskService, private router: Router) {
    // Crea el formulario con los campos 'title' y 'description'
    this.taskForm = this.formBuilder.group({
      title: '',
      description: ''
    });
  }

  ngOnInit() {
    this.tasks = this.taskService.getTasks();
  }

  nuevaTarea() {
    const currentMaxId = Math.max(...this.tasks.map(task => task.id));
    const newid = isFinite(currentMaxId) ? currentMaxId + 1 : 1;


    const newTask = {
      id: newid,
      title: this.taskForm.value.title,
      description: this.taskForm.value.description
    };
    
    this.taskService.anadir(newTask);
    this.actualizarTareas();
    this.router.navigate(['/task-list']);
  }

  onSubmit(event: Event) {
    event.preventDefault(); // Evita la recarga de la página
  }

  borrarTarea(taskId: number) {
    this.taskService.borrarTarea(taskId);
    this.actualizarTareas();
  }

  private actualizarTareas() {
    this.tasks = this.taskService.getTasks();
  }
}
