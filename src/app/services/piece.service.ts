import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class PieceService {

  constructor(private http: Http) {
  }

  pieceGet(): any {
    const myUrl = `http://192.168.43.10:8080/api/accueil`;
    const zones = [];
    const zone = {
      id: '',
      name: '',
      description: ''
    }

    const that = this;
    const observable = this.http.get(myUrl);

    observable.subscribe(
      (value) => {
        const jsonData = value.json();

        for (const key in jsonData) {   // liste de zones
          if (jsonData.hasOwnProperty(key)) {
            console.log('key: ' + key);
            const nextZone = Object.create(zone);

            for (const key2 in jsonData[key]) {   // pour chaque zone
              if (jsonData[key].hasOwnProperty(key2)) {
                nextZone.id = jsonData[key]['id'];
                nextZone.name = jsonData[key]['name'];
                nextZone.description = jsonData[key]['description'];
              }
            }
            console.log(nextZone);
            zones.push(nextZone);
          }
        }

        console.log('zones from service:');
        console.log(zones);
      }
    );

    return zones;
  }

}
