import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage'

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  items: any;

  constructor(private storage: Storage) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.storage.get('USER_INFO').then(data => {
      if(data != null) {
        this.items = data;
        console.log(data);
      }
    }, error => {
      console.log(error);
    });
  }

}
