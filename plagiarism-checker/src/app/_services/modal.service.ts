import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import {MatDialog, MatDialogConfig} from "@angular/material";
import { ModalComponent } from '../modal/modal.component';

@Injectable()
export class ModalService {
    

    constructor(private _dialog: MatDialog) { }

    open(data){
        const _modalConfig = new MatDialogConfig();
        _modalConfig.height = '350px';
        _modalConfig.data = data;
        return this._dialog.open(ModalComponent, _modalConfig);
    }
}