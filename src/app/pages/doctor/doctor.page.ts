import { AppointmentDetailPage } from '../appointment-detail/appointment-detail.page';
import { ReviewDetailsPage } from '../review-details/review-details.page';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastController, AlertController, ModalController } from '@ionic/angular';
import { ProviderService } from 'src/app/services/provider.service';
import { DatePipe } from '@angular/common';
import { Storage } from '@ionic/storage';
import { ControllersService } from 'src/app/services/controllers.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.page.html',
  styleUrls: ['./doctor.page.scss'],
})
export class DoctorPage implements OnInit {
  items: any;
  itemsSchedule: any;
  doctorID: any;
  clinicID: any;
  firstname: any;
  lastname: any;
  patientID: any;
  patientEmail: any;
  patientName: any;
  doctorName: any;
  imgURL: string;

  itemsSpec: any;

  minDate: string;

  constructor(public activatedRoute: ActivatedRoute,
    private http: HttpClient,
    public toastCtrl: ToastController,
    public router: Router,
    private providerSvc: ProviderService,
    private storage: Storage,
    public datePipe: DatePipe,
    public alertController: AlertController,
    public modalController: ModalController,
    public ctrl: ControllersService ) { }

  ngOnInit() {
    this.doctorID = this.activatedRoute.snapshot.params['did'];
    this.getData(this.doctorID);
    this.getRating();

    this.storage.get('USER_INFO').then(data => {
      if (data != null) {
        this.patientID = data[0].patient_id;
        this.patientEmail = data[0].patient_email;
        this.patientName = data[0].patient_firstname + data[0].patient_lastname;
      }
    }, error => {
      console.log(error);
    });

    this.minDate = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
  }

  getData(id: number) {
    let postData = JSON.stringify({
      doctorID: id
    });

    this.providerSvc.postData('doctor_profile.php', postData).subscribe(data => {
      if (data != null) {
        this.items = data;
        console.log(data);

        this.lastname = this.items[0].doctor_lastname;
        this.firstname = this.items[0].doctor_firstname;
        this.doctorName = this.firstname + this.lastname;
        this.clinicID = this.items[0].clinic_id;
        this.imgURL = this.providerSvc.imgURL;
      }
    }, error => {
      console.log("Load Failed", error);
    });

    // this.providerSvc.postData('speciality_result.php', postData).subscribe(data => {
    //   if (data != null) {
    //     this.itemsSpec = data;
    //   }
    // })
  }

  countReviews: number;
  rate: any;
  totalReviewRate: number;
  rateitems: any;
  
  getRating() {
    let postData = JSON.stringify({
      doctorID: this.doctorID
    });
    this.providerSvc.postData('review-details.php', postData).subscribe(data => {
      if (data != null) {
        this.countReviews = Object.keys(data).length;

        var onecount = 0;
        var twocount = 0;
        var threecount = 0;
        var fourcount = 0;
        var fivecount = 0;

        for (var i = 0; i < this.countReviews; i++) {
          this.rate = parseInt(data[i].rating, 10);

          if (this.rate == 5) {
            fivecount++;
          } else if (this.rate == 4) {
            fourcount++;
          } else if (this.rate == 3){
            threecount++;
          } else if (this.rate == 2){
            twocount++;
          } else if (this.rate == 1){
            onecount++;
          }
        }
        
        var roundTotal = (5*fivecount + 4*fourcount + 3* threecount + 2*twocount + 1*onecount) / this.countReviews;
        this.totalReviewRate = Math.round( roundTotal * 10 ) / 10;
      } else {
        console.log('No Data Available');
      }
    }, error => {
      console.log(error);
    });
  }

  selectedTime: string;

  TimeSlotChange($event) {
    this.selectedTime = $event.target.value;
    console.log(this.selectedTime);
  }

  selectedDate: string;

  DateSlotChange($event) {
    this.selectedDate = this.datePipe.transform($event.target.value, 'yyyy-MM-dd');
    console.log(this.selectedDate);

    let dataPost = new FormData();
    dataPost.append('inputdate', this.selectedDate);
    dataPost.append('inputID', this.doctorID);

    this.providerSvc.postData("available.php", dataPost).subscribe(data => {
      this.itemsSchedule = data;
      console.log(this.itemsSchedule);
    }, error => {
      console.log(error);
    });
  }

  Book() {
    if (this.selectedDate != null && this.selectedTime != null) {
      this.openModal();
    } else {
      this.ctrl.alertPopUp("Attention", "Please select date & time", "OK");
    }
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: AppointmentDetailPage,
      componentProps: {
        date: this.selectedDate,
        time: this.selectedTime,
        doctorID: this.doctorID,
        clinicID: this.clinicID,
        patientID: this.patientID,
        patientEmail: this.patientEmail,
        patientName: this.patientName,
        doctorName: this.doctorName,
      }
    });
    modal.onDidDismiss().then(dataReturned => {
    });
    // modal.onWillDismiss().then(dataReturned => {
    //   this.doctorID = dataReturned.data;
    // });

    return await modal.present();
  }
  
  async reviewModal() {
    const modal = await this.modalController.create({
      component: ReviewDetailsPage,
      componentProps: {
        doctorID: this.doctorID
      }
    });

    return await modal.present();
  }

}