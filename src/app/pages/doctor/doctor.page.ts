import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.page.html',
  styleUrls: ['./doctor.page.scss'],
})
export class DoctorPage implements OnInit {
  items: any;
  doctorID: number;

  constructor(public activatedRoute: ActivatedRoute, 
              private http: HttpClient, 
              public toastCtrl:ToastController,
              public router:Router) { }

  ngOnInit() {
    this.doctorID = this.activatedRoute.snapshot.params['did'];
    this.getData(this.doctorID);
  }

  getData(id: number) {
    let postData = JSON.stringify({
      doctorID: id
    });

    let url = "http://localhost/crud/pages/doctor_profile.php";
    this.http.post(url, postData).subscribe(data => {
      if (data != null) {
        this.items = data;
        console.log(data);
      }
    }, error => {
      console.log("Load Failed", error);
    });
  }

  TimeSlotChange($event) {
    console.log($event.target.value);
  }

  DateSlotChange($event) {
    console.log($event.target.value);
  }

  Book() {
    this.presentToast();
    // this.router.navigate(['tabs/appointment']);
    
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      header: 'Booked Succesful',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'checkmark-circle-outline',
          text: 'Booked!',
          handler: () => {
            console.log('Book Added');
          }
        }, {
          text: 'Done',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }

}
