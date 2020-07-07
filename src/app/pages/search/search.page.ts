import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { ProviderService } from 'src/app/services/provider.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  formData: any = [];
  priceRange: number = 0;
  items:any;
  iconLink: string;
  countData: any;

  constructor(public router:Router, private menuCtrl:MenuController, private providerSvc: ProviderService, public modalController: ModalController) { }

  ngOnInit() {
    this.getCategory();
  }

  getCategory() {
    this.providerSvc.getData('speciality.php').subscribe(data => {
      if (data != null) {
        this.items = data;
        console.log(this.items);
        this.iconLink = this.providerSvc.iconURL;
      }
    });
  }

  // getCount(sid:number) {
  //   let postData = JSON.stringify({
  //     specialityID: sid
  //   });
  //   this.providerSvc.postData('speciality_count.php', postData).subscribe(countdata => {
  //     if (countdata != null) {
  //       this.countData = countdata;
  //       this.countData.length;
  //     }
  //   });
  //   return this.countData;
  // }

  searchLink(id: number) {
    this.router.navigate(['search-modal', id]);
  }

  searchClinic() {
    this.router.navigate(['search-clinic']);
  }
  
  searchDoctor() {
    this.router.navigate(['search-doctor']);
  }

  showMenu() {
    // this.menuCtrl.enable(true, 'filter');
    // this.menuCtrl.open('filter');
    this.router.navigate(['/filter']);
  }

  SearchBar() {
    this.router.navigate(['/result']);
  }

}
