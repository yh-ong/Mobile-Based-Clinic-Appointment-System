import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProviderService } from 'src/app/services/provider.service';
import { DatePipe } from '@angular/common';
import { AlertController, ModalController } from '@ionic/angular';
import { ReviewPage } from '../review/review.page';

@Component({
  selector: 'app-appointment-view',
  templateUrl: './appointment-view.page.html',
  styleUrls: ['./appointment-view.page.scss'],
})
export class AppointmentViewPage implements OnInit {
  appointmentID: number;
  items: any;
  imgURL: string;

  constructor(public activatedRoute: ActivatedRoute,
              private provideSvc: ProviderService,
              public alertCtrl: AlertController,
              public modalCtrl: ModalController,
              public router: Router,
              public datePipe: DatePipe) { }

  ngOnInit() {
    this.appointmentID = this.activatedRoute.snapshot.params['aid'];
    this.getData(this.appointmentID);
  }

  appID: any;
  appDate: any;
  appTime: any;
  treatmentType: string;
  status: any;
  consultStatus: any;
  dayLeft: any;
  clinicName: string;
  clinicID: string;
  clinicEmail: string;
  clinicContact: string;
  clinicAddress: string;
  clinicState: string;
  clinicZipcode: string;
  doctorID: any;
  doctorName: string;
  doctorAvatar: string;
  doctorEmail: string;
  doctorContact: string;
  doctorSpeciality: string;
  patientID: any;
  diffDays: any;
  countNum: string;

  getData(id:number) {
    let postData = JSON.stringify({
      appointmentID: id
    });

    this.provideSvc.postData('appointment-view.php', postData).subscribe(data => {
      if (data != null) {
        this.items = data;
        console.log(data);
        this.appID = data[0].app_id;
        this.dayLeft = data[0].dayleft;
        this.treatmentType = data[0].treatment;
        this.appDate = data[0].app_date;
        this.appTime = data[0].app_time;
        this.status = data[0].status;
        this.consultStatus = data[0].consult_status;

        this.patientID = data[0].patient_id;

        this.clinicID = data[0].clinic_id;
        this.clinicName = data[0].clinic_name;
        this.clinicEmail = data[0].clinic_email;
        this.clinicContact = data[0].clinic_contact;
        this.clinicAddress = data[0].clinic_address;
        this.clinicState = data[0].clinic_state;
        this.clinicZipcode = data[0].clinic_zipcode;

        this.doctorID = data[0].doctor_id;
        this.doctorName = data[0].doctor_lastname +" "+ data[0].doctor_firstname;
        this.doctorAvatar = data[0].doctor_avatar;
        this.doctorSpeciality = data[0].doctor_speciality;
        this.doctorContact = data[0].doctor_contact;
        this.doctorEmail = data[0].doctor_email;
        this.imgURL = this.provideSvc.imgURL+this.clinicID+"/doctor/"+this.doctorAvatar;

        var futureDate = new Date(this.appDate);
        var formattedDate = this.datePipe.transform(new Date().toLocaleString(), 'yyyy-MM-dd');
        var currentDate = new Date(formattedDate);
        var diffTime = futureDate.getTime() - currentDate.getTime();
        this.diffDays = diffTime / (1000 * 3600 * 24);
      }
    }, error => {
      console.log(error);
    });
  }

  async rateModal() {
    const modal = await this.modalCtrl.create({
      component: ReviewPage,
      componentProps: {
        doctorID: this.doctorID,
        patientID: this.patientID
      }
    });
    modal.onDidDismiss().then(dataReturned => {

    });

    return await modal.present();
  }

  confirm() {
    let dataPost = new FormData();
    dataPost.append('inputAppointmentID', this.appID);

    this.provideSvc.postData('appointment-confirm.php', dataPost)
    .subscribe(res => {
      this.getData(this.appID); // Success
    }, error => {
      console.log(error);
    });
  }
  
  cancel() {
    let dataPost = new FormData();
    dataPost.append('inputAppointmentID', this.appID);
    
    this.provideSvc.postData('appointment-cancel.php', dataPost)
    .subscribe(res => {
      this.getData(this.appID); // Success
    }, error => {
      console.log(error);
    });
  }

  async confirmAppointment() {
    const alert = await this.alertCtrl.create({
      header: 'Confirmation',
      message: 'Confirm my appointment',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.confirm();
          }
        }
      ]
    });
    await alert.present();
  }

  async cancelAppointment() {
    const alert = await this.alertCtrl.create({
      header: 'Are you sure?',
      message: 'Delete Appointment',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.cancel();
          }
        }
      ]
    });
    await alert.present();
  }

}
