import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProviderService } from 'src/app/services/provider.service';
import { ControllersService } from 'src/app/services/controllers.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-review',
  templateUrl: './review.page.html',
  styleUrls: ['./review.page.scss'],
})
export class ReviewPage implements OnInit {

  constructor(public modalCtrl: ModalController,
              private providerSvc: ProviderService,
              public ctrl: ControllersService,
              private storage: Storage) { }

  @Input() public doctorID: string;
  @Input() public patientID: string;

  ngOnInit() {
  }

  rating: any;
  review: string;
  items: any;

  rateNumber($event) {
    this.rating = $event.target.value;
    console.log(this.rating);
  }

  writeReview() {
    let dataPost = new FormData();
    dataPost.append('inputPatientID', this.patientID);
    dataPost.append('inputDoctorID', this.doctorID);
    dataPost.append('inputRating', this.rating);
    dataPost.append('inputReview', this.review);

    this.providerSvc.postData('review.php', dataPost).subscribe(res => {
      this.ctrl.alertPopUp("Successful", "Thank you for rating", "OK");
    }, error => {
      console.log(error);
    });
  }

  async closeModal() {
    await this.modalCtrl.dismiss();
  }

}
