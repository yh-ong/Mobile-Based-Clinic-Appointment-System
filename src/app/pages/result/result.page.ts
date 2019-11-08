import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit {
  itemsClinic: any;
  searchTerm: string = "";

  constructor(public http: HttpClient, public router:Router) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    let url = "http://localhost/crud/pages/result.php";
    this.http.get(url)
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
  }

  clinicProfile(id:number) {
    if (id != null) {
      this.router.navigate(['/clinic', id]);
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
