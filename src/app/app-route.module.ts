import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {GlobalTabsComponent} from "./components/global-tabs/global-tabs.component";

const routes: Routes = [
  {
    path: '', component: GlobalTabsComponent
  },

  {
    path: 'employees',
    loadChildren: () => import('./components/employee-list/employees.module').then(m => m.EmployeesModule)
  },

  {
    path: 'records',
    loadChildren: () => import('./components/records/records.module').then(m => m.RecordsModule)
  },

  {
    path: 'add',
    loadChildren: () => import('./components/dialogs/add-dialog/add-dialog.module').then(m => m.AddDialogModule)
  },

  {
    path: 'edit',
    loadChildren: () => import('./components/dialogs/edit-dialog/edit-dialog.module').then(m => m.EditDialogModule)
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],

  exports: [RouterModule]
})
export class AppRouteModule {
}
