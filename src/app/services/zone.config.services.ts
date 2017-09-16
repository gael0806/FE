
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ZoneConfigServices {

  constructor(private http: Http) {
  }

  getUsers(): any {
    console.log('----------// Requete Get USER //--------------------');
    const myUrl = `http:/192.168.43.10:8080/api/configuration/utilisateur`;
    const users = [];
    const user = { id: '', name: '', login: '', password: '', admin: '' };

    const observable = this.http.get(myUrl);

    observable.subscribe(
      (value) => {
        const jsonData = value.json();
        for (const key in jsonData) {   // liste de zones
          if (jsonData.hasOwnProperty(key)) {
            //  console.log('key: ' + key);
            const nextUser = Object.create(user);

            for (const key2 in jsonData[key]) {   // pour chaque zone
              if (jsonData[key].hasOwnProperty(key2)) {
                nextUser.id = jsonData[key]['id'];
                nextUser.name = jsonData[key]['name'];
                nextUser.login = jsonData[key]['login'];
                nextUser.password = jsonData[key]['password'];
                nextUser.admin = jsonData[key]['admin'];
              }
            }
            console.log('next user is: ', nextUser);
            users.push(nextUser);
          }
        }
        console.log('users from service:');
        console.log(users);
      }
    );
    return users;
  }

  getZones(): any {
    console.log('----------// Requete Get ZONE //--------------------');
    const myUrl = `http://192.168.43.10:8080/api/configuration/zone`;
    const zones = [];
    const zone = { id: '', name: '', description: '', dipsositifs: [] };

    const observable = this.http.get(myUrl);

    observable.subscribe(
      (value) => {
        const jsonData = value.json();
        for (const key in jsonData) {   // liste de zones
          if (jsonData.hasOwnProperty(key)) {
            //  console.log('key: ' + key);
            const nextZone = Object.create(zone);

            for (const key2 in jsonData[key]) {   // pour chaque zone
              if (jsonData[key].hasOwnProperty(key2)) {
                nextZone.id = jsonData[key]['id'];
                nextZone.name = jsonData[key]['name'];
                nextZone.description = jsonData[key]['description'];
              }
            }
            console.log('next zone is: ', nextZone);
            zones.push(nextZone);
          }
        }
        console.log('users from service:');
        console.log(zones);
      }
    );

    return zones;
  }

  getArduinos(): any {
    console.log('----------// Requete Get  Arduino //--------------------');
    const myUrl = `http://192.168.43.10:8080/api/configuration/materiel`;
    const arduinos = [];
    const arduino = { id: '', name: '', ip: '', myPins: [] };

    const observable = this.http.get(myUrl);

    observable.subscribe(
      (value) => {
        const jsonData = value.json();
        for (const key in jsonData) {   // liste de zones
          if (jsonData.hasOwnProperty(key)) {
            //  console.log('key: ' + key);
            const nextArduino = Object.create(arduino);

            for (const key2 in jsonData[key]) {   // pour chaque zone
              if (jsonData[key].hasOwnProperty(key2)) {
                nextArduino.id = jsonData[key]['id'];
                nextArduino.name = jsonData[key]['name'];
                nextArduino.ip = jsonData[key]['ip'];
              }
            }
            console.log('next arduino is: ', nextArduino);
            arduinos.push(nextArduino);
          }
        }
        console.log('users from service:');
        console.log(arduinos);
      }
    );

    return arduinos;
  }

  getDispositifs(index: number): any {
    console.log('----------// Requete Get  Dispositif//--------------------');
    const myUrl = `http://192.168.43.10:8080/api/configuration/zone/dispositif/${index}`;
    const dispositifs = [];
    const dispositif = {id: '', name: '', type: '', description: '', pin: '', arduinoNbr: '', etat: '' }

    const observable = this.http.get(myUrl);

    observable.subscribe(
      (value) => {
        const jsonData = value.json();
        for (const key in jsonData) {   // liste de zones
          if (jsonData.hasOwnProperty(key)) {
            //  console.log('key: ' + key);
            const nextDispositif = Object.create(dispositif);
            const dispositif2=Object.create(dispositif);

            for (const key2 in jsonData[key]) {   // pour chaque zone
              if (jsonData[key].hasOwnProperty(key2)) {
                nextDispositif.id = jsonData[key]['id'];
               dispositif2.id = jsonData[key]['id'];
                nextDispositif.name = jsonData[key]['name'];
                dispositif2.name = jsonData[key]['name'];
                nextDispositif.description = jsonData[key]['description'];
                dispositif2.description = jsonData[key]['description'];
                nextDispositif.etat = jsonData[key]['etat'];
                dispositif2.etat = jsonData[key]['etat'];
                nextDispositif.type = jsonData[key]['type'];
                dispositif2.type = nextDispositif.type.id;
                nextDispositif.pin = jsonData[key]['pin'];
                dispositif2.pin = nextDispositif.pin.num_in_out;
                dispositif2.arduinoNbr = nextDispositif.pin.arduino.id;
              }
            }
            console.log('next dispo is: ', dispositif2);
            dispositifs.push(dispositif2);
          }
        }
        console.log('users from service:');
        console.log(dispositifs);
      }
    );

    return dispositifs;
  }

}

