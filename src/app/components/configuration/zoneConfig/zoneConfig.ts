import { Component, OnInit, ViewChild } from '@angular/core';
import { DispositifComponent } from './dispositif/dispositif';
import { ZoneConfigServices } from 'app/services/zone.config.services';
import { ZoneConfigServicesPost } from 'app/services/zone.config.services.post';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-zoneconfig',
  templateUrl: './zoneConfig.html',
  styleUrls: ['./zoneConfig.scss']
})

export class ZoneConfigComponent implements OnInit {

  @ViewChild(DispositifComponent) dispositif: DispositifComponent;
  responseZone: any[];
  responseDispositif: any[];
  statut: any;
  results = 0;
  urlZone = 'http://192.168.43.10:8080/api/configuration/zone/create';
  urlDelete = 'http://192.168.43.10:8080/api/configuration/zone/delete';

  zones = [];
  selectedIndex: number; // l'index de l'utilisateur sélectionné
  selectedZone = { id: '', name: '', description: '', dipsositifs: [] };
  dragEnabled = true; // activer le drag&drop

  constructor(private methodeGet: ZoneConfigServices,
    private methode: ZoneConfigServicesPost) { }

  ngOnInit() {
    console.log('initialisation du service "zoneConfigUserService"');
    this.responseZone = this.methodeGet.getZones();
    this.zones = this.responseZone;
    console.log(this.responseZone);
  }

  // ajouter une nouvelle zone
  AddZone(): void {
    const newZone = { id: '0', name: '', description: '', dipsositifs: [] };
    this.zones.push(newZone);
  }

  // supprimer une zone
  onDeleteDrop(e: any) {
    this.removeItem(e.dragData, this.zones);
    this.deleteJson(e.dragData);
    console.log('zone à supprimer: ',e.dragData)
  }

  removeItem(item: any, list: Array<any>) {
    const index = list.map(function (e) {
      return e.name
    }).indexOf(item.name);
    list.splice(index, 1);
  }

  // transmettre la zone sélectionnée à la Modal
  transmitItemName(e: any, item: any, i: number) {
    this.selectedZone.id = item.id;
    this.selectedZone.name = item.name;
    this.selectedZone.description = item.description;
    this.selectedZone.dipsositifs = item.dipsositifs;

    console.log('initialisation du service "getDispositifs"');
    this.responseDispositif = this.methodeGet.getDispositifs(item.id);

    console.log('Valeur de zone', this.responseZone);
    // this.selectedZone.dipsositifs = this.copy(item.dipsositifs);
    this.selectedZone.dipsositifs = this.responseDispositif; // envoi du résultat de la requete vers dispositif
    this.selectedIndex = i;
    this.dispositif.initialiser(); // appel de la méthode initialiser du dispositif (@ViewChild)
    console.log(this.responseDispositif);
  }

  register(obj: any) {
    this.results = 0;
    this.zones[this.selectedIndex].name = obj.name;
    this.zones[this.selectedIndex].description = obj.description;
    this.zones[this.selectedIndex].dipsositifs = this.copy(this.selectedZone.dipsositifs);
    this.postJson(this.urlZone, this.zones[this.selectedIndex]);
      
  // setTimeout(this.postJson(`http://localhost:8080/smartberry-0.0.1-SNAPSHOT/api/configuration/zone/dispositif/create/${this.selectedZone.id}`,
  // that.zones[that.selectedIndex].dipsositifs), 1000);
  // console.log('liste des dispo envoyées : ', this.zones[this.selectedIndex].dipsositifs);
    console.log('la zone envoyé: ', this.zones[this.selectedIndex]); // afficher le JSON du tableau zones
  }

  postJson(url: string, obj: any) {
    console.log('resultat', this.results);
   
    if(this.results == 0){
      console.log('----/ passage de if :condition vrai /---')
      this.methode.postJson(url, obj).subscribe((data) => {
      this.miseAjourZone();
      const that = this;
      setTimeout(() =>{this.postJson(`http://192.168.43.10:8080/api/configuration/zone/dispositif/create/${that.zones[that.selectedIndex].id}`,
      that.selectedZone.dipsositifs);
      console.log('the selected zone index: ',that.zones[that.selectedIndex].id)
      console.log('liste des dispo envoyées : ', that.selectedZone.dipsositifs);
      this.results = 1;
      console.log('resultat', this.results)}, 500);
    });
  };
  }

  deleteJson(obj: any) {
    this.methode.postJson(this.urlDelete, obj).subscribe((response) => this.results = 1)
    console.log(this.results);
  }

  miseAjourZone() {
    setTimeout(() => this.zones = this.methodeGet.getZones(), 100);
  }
 
  copy = function deepCopy(arr) {
    const out = [];
    for (let i = 0, len = arr.length; i < len; i++) {
      const item = arr[i];
      const obj = {};
      for (let k in item) {
        obj[k] = item[k];
      }
      out.push(obj);
    }
    return out;
  }
}
