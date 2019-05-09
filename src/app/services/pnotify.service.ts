import { Injectable } from '@angular/core';
import PNotify from 'pnotify/dist/es/PNotify';
import PNotifyButtons from 'pnotify/dist/es/PNotifyButtons';
import PNotifyConfirm from 'pnotify/dist/es/PNotifyConfirm';
import PNotifyStyleMaterial from 'pnotify/dist/es/PNotifyStyleMaterial.js';

@Injectable({
  providedIn: 'root'
})
export class PnotifyService {

  constructor() { }

  getPNotify() {
    // tslint:disable-next-line:no-unused-expression
    PNotifyButtons;
    // tslint:disable-next-line:no-unused-expression
    PNotifyConfirm;
    // Set default styling.
    // tslint:disable-next-line:no-unused-expression
    PNotifyStyleMaterial;
    PNotify.defaults.styling = 'material';
    // This icon setting requires the Material Icons font. (See below.)
    PNotify.defaults.icons = 'material';
    PNotify.defaults.width = '250px';
    return PNotify;
  }
}
