import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProviderService } from 'src/app/services/provider.service';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  id: number;

  constructor(public activatedRoute: ActivatedRoute, private providerSvc: ProviderService, private storage: Storage) { }

  ngOnInit() {
    // ! Try Weather Pass through the Tabs
    // this.activatedRoute.queryParams.subscribe((res) => {
    //   console.log(JSON.parse(res.value));
    // });
    this.storage.get('USER_INFO').then(data => {
      if(data != null) {
        this.id = data[0].patient_id;
        this.getMessage(this.id);
      }
    }, error => {
      console.log(error);
    });
  }

  items: any;
  badge: number;

  getMessage(id:number) {
    let postData = JSON.stringify({
      patientID: id
    });

    this.providerSvc.postData('message.php', postData)
      .subscribe(data => {
        if (data != null) {
          this.items = data;

          this.badge = this.items.length;
        } else {
          this.badge = 0;
          console.log('No Data Available');
        }
      }, error => {
        console.log('Load Failed', error);
      });
  }

}
