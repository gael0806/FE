import { Component, TemplateRef, OnInit, Input } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { ViewEncapsulation } from '@angular/core';
import { ZoneConfigServicesPost } from 'app/services/zone.config.services.post';

@Component({
  selector: 'app-dispositif',
  templateUrl: './dispositif.html',
  styleUrls: ['./dispositif.css']
})
export class DispositifComponent implements OnInit {

  @Input() selectedZ: any;
  public config = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: true
  };

  public modalRef: BsModalRef;
  statut: any;
  urlDelete = 'http://192.168.43.10:8080/api/configuration/zone/dispositif/delete';

  dispositifs = [
    {  id: 0, name: 'Lampe', type: 3 , description: '', pin: null, arduinoNbr: null, etat: '0' },
    {  id: 0, name: 'Prise', type: 5, description: '', pin: null, arduinoNbr: null, etat: '0' },
    {  id: 0, name: 'Capteur T', type: 2, description: '', pin: null, arduinoNbr: null, etat: '0' },
    {  id: 0, name: 'Capteur H', type: 1, description: '', pin: null, arduinoNbr: null, etat: '0' },
    {  id: 0, name: 'Relai', type: 4, description: '', pin: null, arduinoNbr: null, etat: '0' }];

  selectedDispositifs = [];
  dragEnabled = true;
  selectedDispo = {id: '', name: '', type: null, description: '', pin: null, arduinoNbr: null, etat: '0' };
  selectedIndex: number;
  selectType: any;

  constructor(private modalService: BsModalService, private methode: ZoneConfigServicesPost) { }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  ngOnInit() {
    this.initialiser();
  }

  initialiser() {
    this.selectedDispositifs = this.selectedZ.dipsositifs;
  }

  // Ajouter le dispositif au tableau "dispositifSelectiones[]"
  onAnyDrop(e: any) {
    const newDispo = {id: '', name: '', type: null, description: '', pin: null, arduinoNbr: null, etat: '0' };
    newDispo.id = e.dragData.id;
    newDispo.name = e.dragData.name;
    newDispo.type = e.dragData.type;
    newDispo.description = e.dragData.description;
    newDispo.pin = e.dragData.pin;
    newDispo.arduinoNbr = e.dragData.arduinoNbr;
    newDispo.etat = e.dragData.etat;
    this.selectedDispositifs.push(newDispo);
    console.log('objet dragged: ', e.dragData)
  }

  // supprimer un dispositif
  onDeleteDrop(e: any) {
    this.removeItem(e.dragData, this.selectedDispositifs);
    this.deleteJson(e.dragData);
  }

  transmitItemName(e: any, item: any, i: number) {
    const newDispo = {id: '', name: '', type: null, description: '', pin: null, arduinoNbr: null, etat: '0' };
    newDispo.id = item.id;
    newDispo.name = item.name;
    newDispo.type = item.type;
    newDispo.description = item.description;
    newDispo.pin = item.pin;
    newDispo.arduinoNbr = item.arduinoNbr;
    if (item.etat === 0) {
      newDispo.etat = '0';
    }else if (item.etat === 1) {
      newDispo.etat = '1';
    }
    this.selectedDispo = newDispo;
    this.selectedIndex = i;
    console.log('valeur de état: ', this.selectedDispo);
  }

  removeItem(item: any, list: Array<any>) {
    const index = list.map(function (e) {
      return e.name
    }).indexOf(item.name);
    list.splice(index, 1);
  }

  // enregistrer les dispositifs dans le tableau selectedDispositifs
  register(obj: any) {
    this.selectedDispositifs[this.selectedIndex].name = obj.name;
    this.selectedDispositifs[this.selectedIndex].description = obj.description;
    this.selectedDispositifs[this.selectedIndex].etat = obj.etat;
    this.selectedDispositifs[this.selectedIndex].pin = obj.pin;
    this.selectedDispositifs[this.selectedIndex].type = obj.type;
    this.selectedDispositifs[this.selectedIndex].arduinoNbr = obj.arduinoNbr;
    this.selectedZ.dipsositifs = this.selectedDispositifs;
    console.log('obj', obj);
    console.log('Register :', this.selectedDispositifs[this.selectedIndex]);
  }


  deleteJson(obj: any) {
    this.methode.postJson(this.urlDelete, obj).subscribe((response) => this.statut = response)
    console.log('statu delete: ', this.statut);
  }

}
