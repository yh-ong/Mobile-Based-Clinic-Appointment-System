import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController, AlertController } from '@ionic/angular';
import { ProviderService } from 'src/app/services/provider.service';
import { Router } from '@angular/router';
import { ControllersService } from 'src/app/services/controllers.service';

@Component({
  selector: 'app-appointment-detail',
  templateUrl: './appointment-detail.page.html',
  styleUrls: ['./appointment-detail.page.scss'],
})

export class AppointmentDetailPage implements OnInit {
  items: any;
  treatment: string;

  constructor(private modalController: ModalController, private providerSvc: ProviderService, public toastCtrl: ToastController, public alertController: AlertController, private router: Router, public ctrl: ControllersService) { }

  @Input() public date: string;
  @Input() public time: string;
  @Input() public doctorID: string;
  @Input() public clinicID: string;
  @Input() public patientID: string;
  @Input() public patientEmail: string;
  @Input() public patientName: string;
  @Input() public doctorName: string;

  ngOnInit() {
    this.getTreatment();
  }

  getTreatment() {
    let postData = JSON.stringify({
      doctorID: this.doctorID
    });

    this.providerSvc.postData('treatment-type.php', postData)
      .subscribe(data => {
        if (data != null) {
          this.items = data;
          console.log(data);
        } else {
          console.log('No Data Available');
        }
      }, error => {
        console.log('Load Failed', error);
      });
  }

  BookAppointment() {
    let dataPost = new FormData();
    dataPost.append('inputPatient', this.patientID);
    dataPost.append('inputDate', this.date);
    dataPost.append('inputTime', this.time);
    dataPost.append('inputTreatment', this.treatment);
    dataPost.append('inputDoctor', this.doctorID);
    dataPost.append('inputClinic', this.clinicID);
    dataPost.append('inputEmail', this.patientEmail);
    dataPost.append('inputPatientName', this.patientName);
    dataPost.append('inputDoctorName', this.doctorName);

    this.providerSvc.postData("appointment.php", dataPost).subscribe(res => {
      this.ctrl.presentLoading();
      this.presentToast();
    }, error => {
      this.errorAlert();
      console.log(error);
    });
  }

  async closeModal() {
    await this.modalController.dismiss();
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
            this.router.navigate(['/tabs/appointment']);
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

  async errorAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Network Offline.',
      buttons: ['OK']
    });

    await alert.present();
  }


}
