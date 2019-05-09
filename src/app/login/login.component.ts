import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { PnotifyService } from '../services/pnotify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  pnotify = undefined;

  constructor(private auth: AuthService, pnotifyService: PnotifyService, private router: Router) {
    this.pnotify = pnotifyService.getPNotify();
    this.pnotify.info('Welcome to Legacy Ball Awards. Login with Coupon to Vote');
   }

  ngOnInit() {
  }

  onSubmit(coupon) {
   this.auth.verify(coupon.value);
   coupon.value = '';
  }

}
