import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class DispositifService {

  constructor(private http: Http) {
  }

  dispositifGet(callback?: (zone) => any): any {
    const myUrl = `http://192.168.43.10:8080/api/piece/1`;
    let zone;

    const that = this;
    const observable = this.http.get(myUrl);

    observable.subscribe(
      (response) => {
        zone = response.json();
        console.log(zone);
        if (callback) {
          callback(zone);
        }
      }
    );
    return zone;
  }
}

