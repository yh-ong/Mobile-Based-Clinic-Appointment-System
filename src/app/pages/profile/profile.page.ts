import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProviderService } from 'src/app/services/provider.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  items: any;
  profileLastname: any;
  profileFirstname: any;
  profileCreated: any;
  profileAvatar: any;

  constructor(public router: Router,
              public alertCtrl: AlertController,
              private storage:Storage,
              private authService:AuthenticationService,
              private providerSvc: ProviderService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.storage.get('USER_INFO').then(data => {
      if(data != null) {
        this.items = data;
        this.profileLastname = data[0].patient_lastname;
        this.profileFirstname = data[0].patient_firstname;
        this.profileCreated = data[0].date_created;
        if (this.profileAvatar == null) {
          this.profileAvatar = this.providerSvc.emptyURL;
        } else  {
          this.profileAvatar = data[0].patient_avatar;
        }
      }
    }, error => {
      console.log(error);
    });
  }

  LogOut() {
    this.authService.logout();
  }

  editInfo() {
    this.router.navigate(['/profile-edit']);
  }

  editAddress() {
    this.router.navigate(['/profile-address']);
  }

  editPassword() {
    this.router.navigate(['/profile-password']);
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
