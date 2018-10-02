import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { UploaderModule } from 'angular-http-file-upload';
import { HttpClientModule } from '@angular/common/http';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AlertComponent } from './_directives/index';
import { AlertService } from './_services/index';
import { DocumentComponent } from './document/document.component';
import { HttpRequestService } from './_services/http.service';
import { ModalComponent } from './modal/modal.component';
import { ModalService } from './_services/modal.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AlertComponent,
    DocumentComponent,
    ModalComponent
  ],
  entryComponents: [
    ModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    routing,
    UploaderModule.forRoot(),
    StorageServiceModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [AlertService, HttpRequestService, ModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
