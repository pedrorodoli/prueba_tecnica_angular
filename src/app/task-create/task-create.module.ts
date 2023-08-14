import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TaskCreateRoutingModule } from './task-create-routing.module';
import { TaskCreateComponent } from './task-create.component';


@NgModule({
  declarations: [
    TaskCreateComponent
  ],
  imports: [
    CommonModule,
    TaskCreateRoutingModule,
    ReactiveFormsModule
  ]
})
export class TaskCreateModule { }
