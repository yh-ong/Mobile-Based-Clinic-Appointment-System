import { Component, OnInit } from '@angular/core';
import { ProviderService } from 'src/app/services/provider.service';
import { Router } from '@angular/router';
import { ControllersService } from 'src/app/services/controllers.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {
  categoryItems: any;
  priceRange: any;
  gender: any;
  lowerPrice: number;
  higherPrice: number;

  constructor(private providerSvc: ProviderService, public router: Router, public ctrl: ControllersService) { }

  ngOnInit() {
  }

  // loadSpecialityData() {
  //   this.providerSvc.getData('speciality.php').subscribe(data => {
  //     if (data != null) {
  //       this.categoryItems = data;
  //     }
  //   });
  // }

  getCheckboxValue(event) {
    // console.log(event.target.value);
    this.gender = event.target.value;
  }

  PriceRangeChanged(event) {
    // console.log(event.target.value);
    this.priceRange = event.target.value;
    this.lowerPrice = this.priceRange.lower;
    this.higherPrice = this.priceRange.upper;
    
  }

  Apply() {
    if (this.priceRange != null && this.gender != null) {
      this.router.navigate(['/filter-result', this.lowerPrice, this.higherPrice, this.gender ]);
    } else {
      this.ctrl.alertPopUp("Attention", "All Field Required", "OK");
    }
  }

  isIndeterminate:boolean;
  masterCheck:boolean;
  checkBoxList:any;

  checkMaster() {
    setTimeout(()=>{
      this.checkBoxList.forEach(obj => {
        obj.isChecked = this.masterCheck;
      });
    });
  }

  checkEvent() {
    const totalItems = this.checkBoxList.length;
    let checked = 0;
    this.checkBoxList.map(obj => {
      if (obj.isChecked) checked++;
    });
    if (checked > 0 && checked < totalItems) {
      //If even one item is checked but not all
      this.isIndeterminate = true;
      this.masterCheck = false;
    } else if (checked == totalItems) {
      //If all are checked
      this.masterCheck = true;
      this.isIndeterminate = false;
    } else {
      //If none is checked
      this.isIndeterminate = false;
      this.masterCheck = false;
    }
  }

}
