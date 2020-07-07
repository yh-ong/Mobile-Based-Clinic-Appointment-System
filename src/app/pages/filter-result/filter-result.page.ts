import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProviderService } from 'src/app/services/provider.service';

@Component({
  selector: 'app-filter-result',
  templateUrl: './filter-result.page.html',
  styleUrls: ['./filter-result.page.scss'],
})
export class FilterResultPage implements OnInit {
  gender: any;
  lower: number;
  higher: number;
  items: any;
  imgURL: any;
  empty: number;

  constructor(private activatedRoute: ActivatedRoute, private providerSvc: ProviderService, public router: Router) { }

  ngOnInit() {
    this.lower = this.activatedRoute.snapshot.params['lowerprice'];
    this.higher = this.activatedRoute.snapshot.params['higherprice'];
    this.gender = this.activatedRoute.snapshot.params['gender'];
    this.getData(this.lower, this.higher, this.gender);
  }

  getData(lower: number, higher: number , gender: string) {
    let postData = JSON.stringify({
      inputLowPrice: lower,
      inputHighPrice: higher,
      inputGender: gender
    });

    this.providerSvc.postData('resultfilter_doctor.php', postData)
      .subscribe(data => {
        if (data != null) {
          this.items = data;
          this.imgURL = this.providerSvc.imgURL; 
          this.empty = 0;
        } else {
          console.log("No Data");
          this.empty = 1;
        }
      })
  }

  doctorProfile(id: number) {
    if (id != null) {
      this.router.navigate(['/doctor', id]);
    } else {
      console.log("Error");
    }
  }

  filterData(searchData:any) {
    const val = searchData.target.value;
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        var itemname = item.doctor_lastname + item.doctor_firstname;
        return (itemname.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    } else {
      this.getData(this.lower, this.higher, this.gender);
    }
  }

}
