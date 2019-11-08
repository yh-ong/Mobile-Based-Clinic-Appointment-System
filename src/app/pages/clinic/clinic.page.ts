import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-clinic',
  templateUrl: './clinic.page.html',
  styleUrls: ['./clinic.page.scss'],
})
export class ClinicPage implements OnInit {
  clinicID: number;
  items: any;

  constructor(public activatedRoute: ActivatedRoute, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.clinicID = this.activatedRoute.snapshot.params['cid'];
    this.getData(this.clinicID);
  }

  getData(id: number) {
    let postData = JSON.stringify({
      clinicID: id
    });

    let url = "http://localhost/crud/pages/clinic_profile.php";
    this.http.post(url, postData).subscribe(data => {
      if (data != null) {
        this.items = data;
        console.log(data);
      }
    }, error => {
      console.log("Load Failed", error);
    });
  }

  doctorProfile(id: number) {
    this.router.navigate(['clinic', this.clinicID, 'doctor', id]);
  }

}
