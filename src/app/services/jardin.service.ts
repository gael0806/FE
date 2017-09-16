import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class JardinService {
  private myUrl = `http://192.168.43.10:8080/api/jardin`;

  constructor(private http: Http) {
  }

  jardinGet(callback?: (zones: any ) => any ): any {

    const zones = [];
    const zone = {
      id: '',
      name: '',
      description: '',
      dispositifs: []
    }

    const that = this;
    const observable = this.http.get(this.myUrl);

    observable.subscribe(
      (value) => {
        const jsonData = value.json();
        console.log(jsonData);
        for (const key in jsonData) {   // liste de zones
          if (jsonData.hasOwnProperty(key)) {
            // console.log('key: ' + key);
            const nextZone = Object.create(zone);

            for (const key2 in jsonData[key]) {   // pour chaque zone
              if (jsonData[key].hasOwnProperty(key2)) {
                nextZone.id = jsonData[key]['id'];
                nextZone.name = jsonData[key]['name'];
                nextZone.description = jsonData[key]['description'];
                nextZone.dispositifs = jsonData[key]['dispositifs'];
             }
            }
            // console.log(nextZone);
            zones.push(nextZone);
          }
        }

        if (callback) {
          callback(zones);
        }
      }
    );

    return zones;
  }

  jardinPost(id, action, scenario?, selected?): any {
    console.log('jardinPost()');

    if (scenario ) {
      console.log('post1');
      return this.http.post(this.myUrl, { 'id': id, 'action': action, 'scenario': scenario, 'selected': selected });
    } else {
      console.log('post2');
      return this.http.post(this.myUrl, { 'id': id, 'action': action});
    }
  }

}
