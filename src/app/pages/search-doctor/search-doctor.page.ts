import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProviderService } from 'src/app/services/provider.service';

@Component({
  selector: 'app-search-doctor',
  templateUrl: './search-doctor.page.html',
  styleUrls: ['./search-doctor.page.scss'],
})
export class SearchDoctorPage implements OnInit {
  items: any;
  imgURL: string = this.providerSvc.imgURL;

  constructor(public router: Router, private providerSvc: ProviderService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.providerSvc.getData("result_doctor.php")
      .subscribe(data => {
        if (data != null) {
          this.items = data;
          console.log(data);
        } else {
          console.log("No Result");
        }
      }, error => {
        console.log("Load Data Failed:", JSON.stringify(error));
      });
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
      this.loadData();
    }
  }

}
