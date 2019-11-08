import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController, LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formData: any = {};
  memberID: number;

  object = {
    name: 'subham',
    age: '34',
    address: '34 street, Delhi, India'
  }

  constructor(public router: Router,
              public http: HttpClient,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController) { }

  ngOnInit() {}

  Login() {
    if (this.formData.email != null && this.formData.password != null) {

      let dataPost = new FormData();
      dataPost.append('inputemail', this.formData.email);
      dataPost.append('inputpass', this.formData.password);

      this.presentLoading();
      let url: string = "http://localhost/crud/pages/login.php";
      let data: Observable<any> = this.http.post(url, dataPost);
      data.subscribe(res => {
        if (res != null) {
          this.memberID = res[0].admin_id;
          
          this.router.navigate(['/tabs/home/']);
          // ! Try
          // this.router.navigate(['/pageName'], {
          //   queryParams: {
          //     value: JSON.stringify(this.object),
          //   }
          // });
          console.log("Successful");
        } else {
          this.alertPopUp("Attention", "Email & Password Incorrect!", "Try Again");
          console.log('Login Fail');
        }
        console.log("Login Member ID:", this.memberID);
      });
    } else {
      this.alertPopUp("Attention", "Email & Password Field is Empty", "OK");
      console.log("Please Insert Email and Password");
    }
  }

  Register() {
    this.router.navigate(['../register']);
  }

  async alertPopUp(hdr: string, msg: string, btn: string) {
    let alert = await this.alertCtrl.create({
      header: hdr,
      subHeader: msg,
      buttons: [btn]
    });
    await alert.present();
  }

  async presentLoading() {
    let loading = await this.loadingCtrl.create({
      message: 'Processing',
      duration: 2000
    });
    await loading.present();
  }

}