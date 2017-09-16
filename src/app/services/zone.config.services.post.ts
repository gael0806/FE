import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ZoneConfigServicesPost {

  constructor(private http: HttpClient) { }
  postJson(url: string, obj: any) {
    console.log('----------// Requete POST //--------------------');
    return this.http.post(url, obj);
  }
  deleteJson(url: string, obj: any) {
    console.log('----------// Requete POST (delete) //--------------------');
    return this.http.delete(url, obj);
  }
}

