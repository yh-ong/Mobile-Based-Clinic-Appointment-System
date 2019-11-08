import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }

  SearchBar() {
    this.router.navigate(['/result']);
  }

}
