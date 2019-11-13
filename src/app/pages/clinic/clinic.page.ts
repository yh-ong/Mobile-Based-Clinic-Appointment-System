import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProviderService } from 'src/app/services/provider.service';

@Component({
  selector: 'app-clinic',
  templateUrl: './clinic.page.html',
  styleUrls: ['./clinic.page.scss'],
})
export class ClinicPage implements OnInit {
  clinicID: number;
  items: any;

  sliderConfig = {
    spaceBetween: 10,
    centeredSlides: false,
    slidesPerView: 1.2
  }

  constructor(public activatedRoute: ActivatedRoute, private http: HttpClient, private router: Router, private providerSvc: ProviderService) { }

  ngOnInit() {
    this.clinicID = this.activatedRoute.snapshot.params['cid'];
    this.getData(this.clinicID);
  }

  getData(id: number) {
    let postData = JSON.stringify({
      clinicID: id
    });

    this.providerSvc.postData('clinic_profile.php', postData)
      .subscribe(data => {
        if (data != null) {
          this.items = data;
        } else {
          console.log('No Data Available');
        }
      }, error => {
        console.log('Load Failed', JSON.stringify(error.json()));
      })
  }

  doctorProfile(id: number) {
    this.router.navigate(['clinic', this.clinicID, 'doctor', id]);
  }

}
