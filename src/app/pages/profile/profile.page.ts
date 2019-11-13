import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  items: any;
  profileName: any;
  profileCreated: any;

  constructor(public router: Router,
              public alertCtrl: AlertController,
              private storage:Storage,
              private authService:AuthenticationService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.storage.get('USER_INFO').then(data => {
      if(data != null) {
        this.items = data;
        this.profileName = data[0].admin_name;
        this.profileCreated = data[0].admin_registered;
      }
    }, error => {
      console.log(error);
    });
  }

  LogOut() {
    this.authService.logout();
  }

  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      header: 'Confirmation',
      message: 'Are you sure want <strong>Log Out</strong>?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Log Out',
          handler: () => {
            this.LogOut();
          }
        }
      ]
    });
    await alert.present();
  }

}
