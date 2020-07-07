import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ProviderService } from 'src/app/services/provider.service';

@Component({
  selector: 'app-medical-list',
  templateUrl: './medical-list.page.html',
  styleUrls: ['./medical-list.page.scss'],
})
export class MedicalListPage implements OnInit {
  id: number;
  items: any;

  constructor(private storage: Storage, private providerSvc: ProviderService) { }

  ngOnInit() {
    this.storage.get('USER_INFO').then(data => {
      if(data != null) {
        this.id = data[0].patient_id;
        this.getMedicalData(this.id);
      }
    }, error => {
      console.log(error);
    });
  }

  getMedicalData(id: number) {
    let postData = JSON.stringify({
      patientID: this.id
    });

    this.providerSvc.postData('medical_record.php', postData)
      .subscribe(data => {
        if (data != null) {
          this.items = data;
        } else {
          console.log('No Data Available');
        }
      }, error => {
        console.log('Load Failed', error);
      });
  }

  doRefresh(event) {
    this.getMedicalData(this.id);
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

}
