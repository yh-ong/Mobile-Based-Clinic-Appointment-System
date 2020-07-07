import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router:Router,
    private authenticateService:AuthenticationService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      // status bar
      this.statusBar.styleLightContent();

      this.authenticateService.authenticationState.subscribe(state => {
        if(state) {
          this.router.navigate(['tabs/home']);
          // this.router.navigate(['doctor/1']);
          // this.router.navigate(['clinic/1/doctor/1']);
        } else {
          this.router.navigate(['login']);
        }
      })

    });
  }
}
