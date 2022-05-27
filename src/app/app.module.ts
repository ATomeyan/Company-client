import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
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
import {LoginModule} from "./components/login/login.module";
import {MatButtonModule} from "@angular/material/button";
import {NavigationModule} from "./components/navigation/navigation.module";
import {NavigationComponent} from "./components/navigation/navigation.component";
import {TokenInterceptor} from "./services/tokeninterceptor/token-interceptor.service";

@NgModule({
  declarations: [
    AppComponent,
    GlobalTabsComponent,
    NavigationComponent
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
    CountModule,
    LoginModule,
    MatButtonModule,
    NavigationModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
  ],
  exports: [
    GlobalTabsComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
