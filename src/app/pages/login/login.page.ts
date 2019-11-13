import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController, LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage'
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formData: any = {};
  memberID: number;

  constructor(public router: Router,
              public http: HttpClient,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public storage: Storage,
              private authSerive:AuthenticationService) { }

  ngOnInit() {}

  LoginUser() {
    if (this.formData.email != null && this.formData.password != null) {
      this.authSerive.login(this.formData.email, this.formData.password);
    } else {
      this.alertPopUp("Attention", "Email & Password Field is Empty!", "Try Again");
    }
  }

  Register() {
    this.router.navigate(['../register']);
  }

  async alertPopUp(hdr: string, msg: string, btn: string) {
    let alert = await this.alertCtrl.create({
      header: hdr,
      message: msg,
      buttons: [btn]
    });
    await alert.present();
  }

}