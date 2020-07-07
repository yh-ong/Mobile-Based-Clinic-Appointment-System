import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProviderService } from 'src/app/services/provider.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit {
  itemsClinic: any;
  itemsDoctor: any;
  searchTerm: string = "";
  imgURL: string = this.providerSvc.imgURL;

  constructor(public http: HttpClient, public router: Router, public providerSvc: ProviderService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.providerSvc.getData("result_clinic.php")
      .subscribe(data => {
        if (data != null) {
          this.itemsClinic = data;
          console.log(data);
        } else {
          console.log("No Result");
        }
      }, error => {
        console.log("Load Data Failed:", JSON.stringify(error));
      });

    this.providerSvc.getData("result_doctor.php")
      .subscribe(data => {
        if (data != null) {
          this.itemsDoctor = data;
          console.log(data);
        } else {
          console.log("No Result");
        }
      }, error => {
        console.log("Load Data Failed:", JSON.stringify(error));
      })
  }

  clinicProfile(id: number) {
    if (id != null) {
      this.router.navigate(['/clinic', id]);
    } else {
      console.log("Error");
    }
  }

  doctorProfile(id: number) {
    if (id != null) {
      this.router.navigate(['/doctor', id]);
    } else {
      console.log("Error");
    }
  }

  filterItems(searchTerm) {
    this.itemsClinic.filter(item => {
      return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }
  setFilteredItems() {
    this.itemsClinic = this.itemsClinic.filterItems(this.searchTerm);
  }

}
