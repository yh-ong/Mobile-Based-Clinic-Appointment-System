import { Injectable } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ControllersService {
  isLoading = false;

  pattern :any = {
    email: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
    text: /^[A-Za-z ]+$/,
  };

  constructor(private loadingCtrl:LoadingController, private alertCtrl: AlertController) { }

  async presentLoading() {
    this.isLoading = true;
    return await this.loadingCtrl.create({
      duration: 2000,
    }).then(a => {
      a.present().then(() => {
        console.log("Presented");
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort Loading'));
        }
      });
    });
  }

  async dismissLoading() {
    this.isLoading = false;
    return await this.loadingCtrl.dismiss().then(() => console.log("Dismissed"));
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
