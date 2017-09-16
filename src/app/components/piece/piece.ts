import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DispositifComponent } from 'app/components/piece/dispositif/dispositif';
import { DispositifService } from 'app/services/dispositif.service';
import { Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';

@Component({
  selector: 'app-piece',
  templateUrl: './piece.html',
  styleUrls: ['./piece.scss']
})
export class PieceComponent implements OnInit {
  zone= {id: 0, name: '', description: '', dispositifs: [], garden: false}
  urlImage = '';
  logo1 = '/assets/images/ampoule_eteint.png';
  logo2 = '/assets/images/ampoule_allume.png';
  logo3 = '/assets/images/thermometre.png';
  logo4 = '/assets/images/prise08.png';
  idzone: any;
  myUrl = '';

  constructor(private dispositifService: DispositifService, private http: Http, route: ActivatedRoute) {
    this.idzone = route.snapshot.params['id'];
    // console.log(this.idzone);
    this.myUrl = `http://192.168.43.10:8080/api/piece/${this.idzone}`;
    const that = this;
    const observable = this.http.get(this.myUrl);

    observable.subscribe(
      (response) => {
        that.zone = response.json();
        for (const disp of this.zone.dispositifs){
          if (disp.type.id === 2) {
            disp.etat = this.Thermistor(disp.etat);
            console.log('zone: ', this.zone);
            console.log('dispositif reçu: ', disp);
            console.log('valeur de la température: ', disp.etat);
          }
        }
        console.log(that.zone);
      }
    );
  }

  ngOnInit() {
  }

  capteurGet(d: any) {
    const observable = this.http.get(this.myUrl);
    observable.subscribe(
      (response) => {
        this.zone = response.json();
        for (const disp of this.zone.dispositifs){
          if (disp.type.id === 2) {
            disp.etat = this.Thermistor(disp.etat);
            console.log('zone: ', this.zone);
            console.log('dispositif reçu: ', disp);
            console.log('valeur de la température: ', disp.etat);
          }
        }
  }
    );
}

dispositifPost(d: any): any {
  const myUrl = `http://192.168.43.10:8080/api/piece`;
  if (d.etat === 1.0) {
    d.etat = 0.0;
  } else {
    d.etat = 1.0;
  }
  console.log(d);
  this.http.post(myUrl, d).subscribe((data) => console.log(data));
}

Thermistor(RawADC: number): number {
  let Temp: number;
  Temp = Math.log(10000.0 * ((1024.0 / RawADC - 1)));
  Temp = 1 / (0.001129148 + (0.000234125 + (0.0000000876741 * Temp * Temp)) * Temp);
  Temp = Temp - 273.15;            // Convert Kelvin to Celcius
  const valeur = Math.trunc((Temp - Math.trunc(Temp)) * 10) ;
  return  Math.trunc(Temp) + (valeur * 0.1);
}
}
