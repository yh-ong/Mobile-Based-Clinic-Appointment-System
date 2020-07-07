import { Component, OnInit } from '@angular/core';
import { ProviderService } from 'src/app/services/provider.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.page.html',
  styleUrls: ['./search-modal.page.scss'],
})
export class SearchModalPage implements OnInit {
  items: any;
  specialityID: number;
  imgURL: string;
  empty: number;

  constructor(private activatedRoute: ActivatedRoute, private providerSvc: ProviderService, public router: Router) { }

  ngOnInit() {
    this.specialityID = this.activatedRoute.snapshot.params['searchid'];
    this.getData(this.specialityID);
  }

  getData(id: number) {
    let postData = JSON.stringify({
      specialityID: id
    });

    this.providerSvc.postData('speciality_result.php', postData)
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

  filterData(searchData:any) {
    const val = searchData.target.value;
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        var itemname = item.doctor_lastname + item.doctor_firstname;
        return (itemname.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    } else {
      this.getData(this.specialityID);
    }
  }

  doctorProfile(id: number) {
    if (id != null) {
      this.router.navigate(['/doctor', id]);
    } else {
      console.log("Error");
    }
  }

}
