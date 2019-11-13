import { Component, OnInit } from '@angular/core';
import { ControllersService } from 'src/app/services/controllers.service';
import { ProviderService } from 'src/app/services/provider.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  formData: any = {};

  constructor(
    public ctrl:ControllersService,
    private providerSvc: ProviderService
  ) { }

  ngOnInit() {
  }

  RegisterUser() {
    if (this.formData != null) {
      this.ctrl.presentLoading();

      let dataPost = new FormData();
      dataPost.append('inputusername', this.formData.username);
      dataPost.append('inputemail', this.formData.email);
      dataPost.append('inputpassword', this.formData.password);

      this.providerSvc.postData("register.php", dataPost).subscribe(res => {
        console.log(res['_body']);
      }, error => {
        console.log(error);
      });
    } else {
      this.ctrl.alertPopUp("Attention","Please fill Up", "OK");
    }
  }

}
