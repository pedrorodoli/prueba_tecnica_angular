import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TaskEditRoutingModule } from './task-edit-routing.module';
import { TaskEditComponent } from './task-edit.component';


@NgModule({
  declarations: [
    TaskEditComponent
  ],
  imports: [
    CommonModule,
    TaskEditRoutingModule,
    ReactiveFormsModule
  ]
})
export class TaskEditModule { }
