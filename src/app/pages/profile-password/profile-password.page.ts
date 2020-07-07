import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ControllersService } from 'src/app/services/controllers.service';
import { ProviderService } from 'src/app/services/provider.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-password',
  templateUrl: './profile-password.page.html',
  styleUrls: ['./profile-password.page.scss'],
})
export class ProfilePasswordPage implements OnInit {
  oldpassword: string;
  newpassword: string;
  conpassword: string;
  id: any;

  constructor(public ctrl: ControllersService,
    private providerSvc: ProviderService,
    private storage: Storage) { }

  ngOnInit() {
  }

  updateData() {
    this.storage.get('USER_INFO').then(data => {
      if (data != null) {
        this.id = data[0].patient_id;
      }
    }, error => {
      console.log(error);
    });

    if (this.oldpassword != null && this.newpassword != null && this.conpassword != null) {
      if (this.newpassword.length > 7) {
        if (this.newpassword.match(/[0-9]+/)) {
          if (this.newpassword.match(/[A-Z]+/)) {
            if (this.newpassword.match(/[a-z]+/)) {
              if (this.newpassword.match(/\W/)) {
                let dataPost = new FormData();
                dataPost.append('inputID', this.id);
                dataPost.append('inputOldPassword', this.oldpassword);
                dataPost.append('inputNewPassword', this.newpassword);
                dataPost.append('inputConPassword', this.conpassword);

                this.providerSvc.postData("profile-password.php", dataPost).subscribe(res => {

                  if (res[0] == 'error') {
                    this.ctrl.alertPopUp("Attention", "Error", "OK");
                  } else if (res[0] == 0) {
                    this.ctrl.alertPopUp("Attention", "Wrong Password", "OK");
                  } else if(res[0] == 1) {
                    this.ctrl.alertPopUp("Attention", "Password do not Match", "OK");
                  } else {
                    this.ctrl.alertPopUp("Successful", "Updated", "OK");
                    this.storage.set('USER_INFO', res).then((data) => {});
                  }

                }, error => {
                  console.log(error);
                });
              } else {
                this.ctrl.alertPopUp("Attention", "Password Must Contain At Least 1 Special Character", "OK");
              }
            } else {
              this.ctrl.alertPopUp("Attention", "Password Must Contain At Least 1 Lowercase Letter", "OK");
            }
          } else {
            this.ctrl.alertPopUp("Attention", "Password Must Contain At Least 1 Capital Letter", "OK");
          }
        } else {
          this.ctrl.alertPopUp("Attention", "Password Must Contain At Least 1 Number", "OK");
        }
      } else {
        this.ctrl.alertPopUp("Attention", "Password Must At Least 8 Character", "OK");
      }  
    } else {
      this.ctrl.alertPopUp("Attention", "All Password Field are Required", "OK");
    }

  }

}
