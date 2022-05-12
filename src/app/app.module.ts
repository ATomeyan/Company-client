import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import {TranslateModule} from "@ngx-translate/core";
import {EmployeesModule} from "./components/employee-list/employees.module";
import {MatTabsModule} from "@angular/material/tabs";
import {RecordsModule} from "./components/records/records.module";
import {NgxTranslateModule} from "./components/lang/ngx-translate.module";
import {AppRouteModule} from "./app-route.module";
import {GlobalTabsComponent} from "./components/global-tabs/global-tabs.component";
import {AddDialogModule} from "./components/dialogs/add-dialog/add-dialog.module";
import {DeleteDialogModule} from "./components/dialogs/delete-dialog/delete-dialog.module";
import {EditDialogModule} from "./components/dialogs/edit-dialog/edit-dialog.module";
import {CountModule} from "./components/dialogs/count-dialog/count.module";

@NgModule({
  declarations: [
    AppComponent,
    GlobalTabsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRouteModule,
    NgxTranslateModule,
    HttpClientModule,
    MatTabsModule,
    TranslateModule,
    EmployeesModule,
    RecordsModule,
    AddDialogModule,
    DeleteDialogModule,
    EditDialogModule,
    CountModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
