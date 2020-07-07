import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ProviderService } from 'src/app/services/provider.service';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {
  items:any;
  id:number;
  empty:number;

  title:string;
  content:string;

  constructor(private storage: Storage, private providerSvc: ProviderService, public localNotifications: LocalNotifications) { }

  ngOnInit() {
    this.storage.get('USER_INFO').then(data => {
      if(data != null) {
        this.id = data[0].patient_id;
        this.getMessage(this.id);
      }
    }, error => {
      console.log(error);
    });
  }

  getMessage(id:number) {
    let postData = JSON.stringify({
      patientID: id
    });

    this.providerSvc.postData('message.php', postData)
      .subscribe(data => {
        if (data != null) {
          this.items = data;

          this.title = data[0].ann_title;
          this.content = data[0].ann_content;
          this.promptNotify();
        } else {
          this.empty = 1;
          console.log('No Data Available');
        }
      }, error => {
        console.log('Load Failed', error);
      });
  }

  doRefresh(event) {
    this.getMessage(this.id);
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  promptNotify() {
    this.localNotifications.schedule({
      id: 1,
      title: this.title,
      text: this.content,
    });
  }

  getItemsCount(): number {
    let count = 0;
    // this.checklist.items.forEach((item) => {
    //     if(item.checked){
    //         count++;
    //     }
    // });
    return count;
  }

  

}
