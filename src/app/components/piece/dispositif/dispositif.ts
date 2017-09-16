import { Component, OnInit } from '@angular/core';
import { BoutonOnOffComponent } from 'app/components/bouton-on-off/bouton-on-off';

@Component({
  selector: 'app-dispositif',
  templateUrl: './dispositif.html',
  styleUrls: ['./dispositif.scss']
})
export class DispositifComponent implements OnInit {

  urlImage = '';
  logo1 = '/assets/images/ampoule_eteint.png';
  logo2 = '/assets/images/ampoule_allume.png';
  logo3 = '/assets/images/thermometre.png';
  logo4 = '/assets/images/prise08.png';

  constructor() { }

  ngOnInit() {
  }

  changeLogo() {
    switch (this.urlImage) {
      case '':
        this.urlImage = this.logo1;
        break;
      case this.logo1:
        this.urlImage = this.logo2;
        break;
      case this.logo2:
        this.urlImage = this.logo3;
        break;
      case this.logo3:
        this.urlImage = this.logo4;
        break;
      case this.logo4:
        this.urlImage = this.logo1;
        break;

      default:
        break;
    }


  }

}
