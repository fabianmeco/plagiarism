import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[docxhtml]'
})
export class DocDirective{
    constructor(public viewContainerRef: ViewContainerRef){}
}