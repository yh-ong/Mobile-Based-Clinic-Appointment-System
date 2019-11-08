import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  constructor(public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // ! Try Weather Pass through the Tabs
    // this.activatedRoute.queryParams.subscribe((res) => {
    //   console.log(JSON.parse(res.value));
    // });
  }

}
