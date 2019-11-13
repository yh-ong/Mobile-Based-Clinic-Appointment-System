import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const API_URL = "http://localhost/crud/pages/";

@Injectable({
  providedIn: 'root'
})

export class ProviderService {
  items: any;

  constructor(private http:HttpClient) { }

  postData(pathURL: string, dataPost: any) {
    return this.http.post(API_URL + pathURL, dataPost)
  }
}
