import { Component, OnInit } from '@angular/core';
import { ZoneConfigServices } from 'app/services/zone.config.services';
import { ZoneConfigServicesPost } from 'app/services/zone.config.services.post';
import { Observable } from 'rxjs/Rx';
@Component({
  selector: 'app-materiel',
  templateUrl: './materiel.html',
  styleUrls: ['./materiel.scss']
})
export class MaterielComponent implements OnInit {
  materiels = []; // liste du matériels
  selectedArduino = {id: '', name: '', ip: '', myPins: [] };
  selectedmyPins= [];
  selectedIndex: number; // l'index du matériel sélectionné
  dragEnabled = true; // activer le drag&drop
  pinlength = 0;
  response: any [];
  statut: any;
  urlPost = 'http://192.168.43.10:8080/api/configuration/materiel/create';
  urlDelete = 'http://192.168.43.10:8080/api/configuration/materiel/delete';

  constructor(private materialService: ZoneConfigServices,
    private methode: ZoneConfigServicesPost) {
    console.log('création du service "zoneConfigUserService" ');
  }

  ngOnInit() {
    console.log('initialisation du service "zoneConfigUserService"');
    this.response = this.materialService.getArduinos();
    this.materiels = this.response ;
    console.log(this.response);
  }
  // ajouter un  nouveau arduino
  AddArduino(): void {
    const newArduino = {id: '', name: '', ip: '', myPins: [] };
    this.materiels.push(newArduino);
  }

  AddPin(): void {
    const newPin = {id: '', number: '', inOut: '' };
    this.selectedArduino.myPins.push(newPin);
    this.selectedmyPins = this.selectedArduino.myPins;
  }

  // supprimer un arduino
  onDeleteDrop(e: any) {
    this.removeItem(e.dragData, this.materiels);
    console.log('material sélectionné: ', e.dragData);
    this.deleteJson(e.dragData);
    this.miseAjourMaterial();
    console.log(e.dragData);
  }

  removeItem(item: any, list: Array<any>) {
    const index = list.map(function (e) {
      return e.name
    }).indexOf(item.name);
    list.splice(index, 1);
  }

  // transmettre l'arduino sélectionné à la Modal
  transmitItemName(e: any, item: any, i: number) {
    const newArduino = {id: '', name: '', ip: '', myPins: [] };
    newArduino.id = item.id;
    newArduino.name = item.name;
    newArduino.ip = item.ip;
    newArduino.myPins = item.myPins;
    this.selectedArduino = newArduino;
    this.selectedIndex = i;
  }

  // enregistrer les modification de l'arduino dans le tableau materiels
  register(obj: any) {
    const newmyPins = this.selectedArduino.myPins;
    this.pinlength = newmyPins.length;
    this.materiels[this.selectedIndex].name = obj.name;
    this.materiels[this.selectedIndex].ip = obj.ip;
    this.materiels[this.selectedIndex].myPins = newmyPins;
    this.postJson(this.materiels[this.selectedIndex]);
    this.miseAjourMaterial();
   // console.log('objet envoyé: ', this.materiels[this.selectedIndex]);
    // console.log('Liste du matériels: ', JSON.stringify(this.materiels)); // afficher le JSON du tableau materiels
  }

Annuler() {
  // supprimer le lignes non enregistrer
    const diff = this.selectedArduino.myPins.length - this.pinlength;
    for (let i = 0; i < diff; i++) {
      this.selectedArduino.myPins.pop();
    }
}

// supprimer de myPins de la liste
supprimerPin(j: number) {
  this.selectedArduino.myPins.splice(j, 1);
}

postJson(obj: any) {
  this.methode.postJson(this.urlPost, obj).subscribe((response) => this.statut = response)
  console.log(this.statut);
}

deleteJson(obj: any) {
  this.methode.postJson(this.urlDelete, obj).subscribe((response) => this.statut = response)
  console.log(this.statut);
}

miseAjourMaterial() {
  setTimeout(() => this.materiels = this.materialService.getArduinos(), 100);
}

}
