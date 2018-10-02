import { Component, OnInit, Inject, Injectable, Compiler, Injector, NgModuleRef, NgModule, forwardRef } from '@angular/core';
import { ViewChild, ViewContainerRef, ComponentRef } from '@angular/core';
import { AfterViewInit, OnDestroy, OnChanges, SimpleChange } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'ngx-webstorage-service';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material';
import { split, forEach } from 'lodash';

import { HttpRequestService } from '../_services/http.service';
import { ModalService } from '../_services/modal.service';


@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements AfterViewInit {
  @ViewChild('vc', { read: ViewContainerRef }) vc: ViewContainerRef;

  private cmpRef: ComponentRef<any>;


  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private _compiler: Compiler,
    private _injector: Injector,
    private moduleRef: NgModuleRef<any>,
    public _http: HttpRequestService
  ) {
   
  }

  ngAfterViewInit() {
    let html = this.storage.get('docxhtml');
    if (html) {
      this.createComponentFromRaw(html);
      return;
    }
  }

  private createComponentFromRaw(html: string) {
    const tmpCmp = Component({ template: html })(DynamicComponent);
    const tmpModule = NgModule({
      imports: [RouterModule],
      declarations: [tmpCmp],
      providers: [HttpRequestService],
      exports: [tmpCmp]
    })(class DynamicModule{ });

    this._compiler.compileModuleAndAllComponentsAsync(tmpModule)
      .then((factories) => {
        const f = factories.componentFactories[0];
        this.cmpRef = f.create(this._injector, [], null, this.moduleRef);
        this.cmpRef.instance.name = 'my-dynamic-component';
        this.vc.insert(this.cmpRef.hostView);
      })
  }
  ngOnDestroy() {
    if (this.cmpRef) {
      this.cmpRef.destroy();
      this.moduleRef.destroy();
    }
  }

}


class DynamicComponent {
  data: { some: 'data' };
  constructor(
    @Inject(HttpRequestService) private http: HttpRequestService,
    @Inject(ModalService) private _modal: ModalService
  ) { }
  ngOnInit() { }
  search(event: any) {
    let htmlresponse = '';
    this.http.get('https://www.googleapis.com/customsearch/v1?key=AIzaSyBVCRS_0LCpP9hZrwB0-0L_Nss0jj75ZnQ&cx=017576662512468239146:omuauf_lfve&q=' + event.target.innerHTML)
      .subscribe(response => {
        console.log(response)
        forEach(response.items, function (item) {
          htmlresponse += '<h4><a href = "' + item.link + '">'
            + item.htmlTitle + '</a></h4>' + '<p>' + item.displayLink + '</p>' 
            + '<p>'+item.htmlSnippet+'</p>';
      })
        this._modal.open(htmlresponse);
      });
  }
}


