import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'task-list', loadChildren: () => import('./task-list/task-list.module').then(m => m.TaskListModule) }, { path: 'task-create', loadChildren: () => import('./task-create/task-create.module').then(m => m.TaskCreateModule) }, { path: 'task-edit', loadChildren: () => import('./task-edit/task-edit.module').then(m => m.TaskEditModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
