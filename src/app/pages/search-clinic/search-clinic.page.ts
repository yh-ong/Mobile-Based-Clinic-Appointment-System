import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProviderService } from 'src/app/services/provider.service';

@Component({
  selector: 'app-search-clinic',
  templateUrl: './search-clinic.page.html',
  styleUrls: ['./search-clinic.page.scss'],
})
export class SearchClinicPage implements OnInit {
  items: any;

  constructor(public router: Router, private providerSvc: ProviderService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.providerSvc.getData("result_clinic.php")
      .subscribe(data => {
        if (data != null) {
          this.items = data;
        } else {
          console.log("No Result");
        }
      }, error => {
        console.log("Load Data Failed:", JSON.stringify(error));
      });
  }

  clinicProfile(id: number) {
    if (id != null) {
      this.router.navigate(['/clinic', id]);
    } else {
      console.log("Error");
    }
  }

  filterData(searchData:any) {
    const val = searchData.target.value;
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        var itemname = item.clinic_name;
        return (itemname.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    } else {
      this.loadData();
    }
  }

}
