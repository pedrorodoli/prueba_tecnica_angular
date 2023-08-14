import { Component, EventEmitter } from '@angular/core';
import { TaskService } from '../task.service';
import { CommunicationService } from '../communication.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent {

  tasks: any[] = [];
  taskForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private taskService: TaskService, private router: Router, private route: ActivatedRoute) {
    // Crea el formulario con los campos 'title' y 'description'
    this.taskForm = this.formBuilder.group({
      title: '',
      description: ''
    });
  }

  taskId: number | null = null;
  taskDesc: string = ''; // Asignar un valor predeterminado de cadena vacía

  ngOnInit() {
    const idParam = this.route.snapshot.queryParamMap.get('id');
    this.taskId = idParam ? +idParam : null;
    this.taskDesc = this.route.snapshot.queryParamMap.get('descripcion') || ''; // Valor predeterminado de cadena vacía
    this.tasks = this.taskService.getTasks();
  }


  nuevaTarea() {
    const newid = Math.max(...this.tasks.map(task => task.id)) + 1;

    const newTask = {
      id: newid,
      title: this.taskForm.value.title,
      description: this.taskForm.value.description
    };
    
    this.taskService.anadir(newTask);
    this.actualizarTareas();
    console.log(this.tasks);
    this.taskForm.reset();
  }

  onSubmit() {
    if (this.taskId !== null) {
      const newDescription = this.taskForm.value.description;
      this.taskService.actualizarDescripcion(this.taskId, newDescription);
    }
    this.router.navigate(['/task-list']);
  }

  borrarTarea(taskId: number) {
    this.taskService.borrarTarea(taskId);
    this.actualizarTareas();
  }

  editarTarea(taskId: number) {
    // Navegar a la ventana de edición con el ID de la tarea
    this.router.navigate(['/task-edit', taskId]);
  }

  private actualizarTareas() {
    this.tasks = this.taskService.getTasks();
  }
}