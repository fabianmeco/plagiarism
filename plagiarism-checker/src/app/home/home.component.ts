import { Component, OnInit, EventEmitter, Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Uploader, UploaderModule } from 'angular-http-file-upload';
import { NgForm } from '@angular/forms';
import { LOCAL_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { Router } from '@angular/router';
import  { split, forEach } from 'lodash';


import { AlertService } from '../_services/index';
import { MyUploadItem } from './uploaditem';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public data: any = [];
   
  loading: boolean = false;

  constructor(public _uploader: Uploader, public _http: HttpClient,
    private _alert: AlertService,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService, 
    private router: Router    
  ) {
      /* this.documentcomponent.ngOnDestroy(); */
  }

  ngOnInit() {
    
  }

  onChange(event) {
    let uploadFile = (<HTMLInputElement>window.document.getElementById('docFile')).files[0];    
    let myUploadItem = new MyUploadItem(uploadFile);
    myUploadItem.formData = { FormDataKey: 'Form Data Value' };  // (optional) form data can be sent with file

    this._uploader.onSuccessUpload = (item, response, status, headers) => {
          
      let content = JSON.parse(response);
      if (content.error_code == 0) {
        let docHTML: string= ""; 
        this.data = split(content.res.value, '<p>');
        forEach(this.data, function(value){
          docHTML += '<p id="'+Date.now()+'" class="parrafo" (click)="search($event)">'+value;
        })
        this.storage.set('docxhtml', docHTML);
        this.router.navigate(['/document']);
      } else if (content.error_code == 1) {
        this._alert.error(content.res.messages.message)
      }      
    };
    this._uploader.onProgressUpload = (item, percentComplete) => {
      this.loading = true;
    };
    this._uploader.onErrorUpload = (item, response, status, headers) => {
      this._alert.error("El archivo no pudo cargarse correctamente");
    };
    this._uploader.onCompleteUpload = (item, response, status, headers) => {
      this.loading = false;
    };
    this._uploader.upload(myUploadItem);
  }
  search() {
    for (let i = 0; i < 110; i++) {
      this._http.get('https://www.googleapis.com/customsearch/v1?key=AIzaSyBVCRS_0LCpP9hZrwB0-0L_Nss0jj75ZnQ&cx=017576662512468239146:omuauf_lfve&q=metallica')
        .subscribe(response => {
          console.log(response);
        });
    }
  }
  //AIzaSyBVCRS_0LCpP9hZrwB0-0L_Nss0jj75ZnQ

}

