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
  itemsImg: any;
  name: String;
  contact: number;
  email: number;
  address: String;
  city: String;
  state: String;
  url: String;
  zipcode: number;
  avatar: any;
  piclink: string;

  busitems: any;
  weekopen: string;
  weekclose: string;
  satopen: string;
  satclose: string;
  sunopen: string;
  sunclose: string;

  imgFilename: string;

  sliderConfig = {
    spaceBetween: 10,
    centeredSlides: false,
    slidesPerView: 1.2
  }

  constructor(public activatedRoute: ActivatedRoute, private http: HttpClient, private router: Router, private providerSvc: ProviderService) { }

  ngOnInit() {
    this.clinicID = this.activatedRoute.snapshot.params['cid'];
    this.getData(this.clinicID);
    this.getImageData(this.clinicID);
    this.getBusinessHourData(this.clinicID);
  }

  getData(id: number) {
    let postData = JSON.stringify({
      clinicID: id
    });

    this.providerSvc.postData('clinic_profile.php', postData)
      .subscribe(data => {
        if (data != null) {
          this.items = data;
          console.log(data);
          
          this.name = this.items[0].clinic_name;
          this.contact = this.items[0].clinic_contact;
          this.email = this.items[0].clinic_email;
          this.address = this.items[0].clinic_address;
          this.city = this.items[0].clinic_city;
          this.state = this.items[0].clinic_state;
          this.url = this.items[0].clinic_url;
          this.zipcode = this.items[0].clinic_zipcode;

          this.avatar = this.items[0].doctor_avatar;
          this.piclink = this.providerSvc.imgURL+this.items[0].clinic_id+"/doctor/";

          if (this.avatar == null) {
            this.piclink = "";
            this.avatar = this.providerSvc.emptyURL;
          }
        } else {
          console.log('No Data Available');
        }
      }, error => {
        console.log('Load Failed', JSON.stringify(error.json()));
      })
  }

  getImageData(id:number) {
    let postData = JSON.stringify({
      clinicID: id
    });

    this.providerSvc.postData('clinic_image.php', postData)
      .subscribe(data => {
        if (data != null) {
          this.itemsImg = data;
          console.log(data);

          this.imgFilename = this.providerSvc.imgURL+this.itemsImg[0].clinic_id+"/clinic/";
          
          // this.avatar = this.items[0].doctor_avatar;
          // this.piclink = this.providerSvc.imgURL+this.items[0].clinic_id+"/doctor/";

          // if (this.avatar == null) {
          //   this.piclink = "";
          //   this.avatar = this.providerSvc.emptyURL;
          // }
        } else {
          console.log('No Data Available');
        }
      }, error => {
        console.log('Load Failed', JSON.stringify(error.json()));
      })
  }

  getBusinessHourData(id: number) {
    let postData = JSON.stringify({
      clinicID: id
    });

    this.providerSvc.postData('business_hour.php', postData)
      .subscribe(data => {
        if (data != null) {
          this.busitems = data;
          
          this.weekopen = this.busitems[0].open_week;
          this.weekclose = this.busitems[0].close_week;
          this.satopen = this.busitems[0].open_sat;
          this.satclose = this.busitems[0].close_sat;
          this.sunopen = this.busitems[0].open_sun;
          this.sunclose = this.busitems[0].close_sun;

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
