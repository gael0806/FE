import { Component, Input, OnInit } from '@angular/core';
import { BoutonOnOffComponent } from 'app/components/bouton-on-off/bouton-on-off'
import { JardinService } from 'app/services/jardin.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-zone',
  templateUrl: './zone.html',
  styleUrls: ['./zone.scss']
})

export class ZoneComponent implements OnInit {
  title = '';

  @Input()
  idzone = '';
  @Input()
  name = '';
  @Input()
  description = '';
  @Input()
  dispositifs = [];

  etat;
  scenarioId;
  selected;

  constructor(private jardinService: JardinService) {
    this.title = 'Zone du jardin';
  }

  ngOnInit() {
    if (this.dispositifs.length !== 0) {
      // console.log(this.dispositifs[0]);
      this.etat = this.dispositifs[0].etat;
      if (this.dispositifs[0].scenari.length !== 0) {
        this.scenarioId = this.dispositifs[0].scenari[0].id;
        // console.log('idtest init ' + this.dispositifs[0].scenari[0].id);
      }
    }
  }

  envoyerEtat(event) {
    console.log('idtest' + this.dispositifs[0].id);
    if (event.value) {
      this.etat = 1;
      console.log('etat : ', this.etat);
    } else {
      this.etat = 0;
      console.log('etat : ', this.etat);
    }
    const observable = this.jardinService.jardinPost(this.dispositifs[0].id, this.etat);
    observable.subscribe((result) => {
      const jsonData = result.json();
      console.log(jsonData);
    });
  }


  setScenario(event) {
    const selectedIndex = event.srcElement.selectedIndex;
    this.scenarioId = event.srcElement.options[selectedIndex].value;
    console.log(this.scenarioId);
  }


  envoyerScenario(event) {
    if (event.value) {
      this.selected = 1;
      console.log('selected : ', this.selected);
    } else {
      this.selected = 0;
      console.log('selected : ', this.selected);
    }
    const observable = this.jardinService.jardinPost(this.dispositifs[0].id, this.etat, this.scenarioId, this.selected);
    observable.subscribe((result) => {
      const jsonData = result.json();
      console.log(jsonData);
    });
  }


}


