import { Component, OnInit } from '@angular/core';
import { ZoneConfigServices } from 'app/services/zone.config.services';
import { ZoneConfigServicesPost } from 'app/services/zone.config.services.post';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-utilisateurconfig',
  templateUrl: './utilisateurConfig.html',
  styleUrls: ['./utilisateurConfig.scss']
})


export class UtilisateurConfigComponent implements OnInit {

  response: any [];
  users = [];  // liste des utilisateurs
  selectedUser = {id: '', name: '', login: '', password: '', admin: '' };
  selectedIndex: number; // l'index de l'utilisateur sélectionné
  dragEnabled = true; // activer le drag&drop
  statut: any;
  urlPost = 'http://192.168.43.10:8080/api/configuration/utilisateur/create';
  urlDelete = 'http://192.168.43.10:8080/api/configuration/utilisateur/delete';

  constructor(private zoneConfigUserService: ZoneConfigServices,
    private methode: ZoneConfigServicesPost) {
    console.log('création du service "zoneConfigUserService" ');
  }

  ngOnInit() {
    console.log('initialisation du service "zoneConfigUserService"');
    this.response = this.zoneConfigUserService.getUsers();
    this.users = this.response ;
    console.log(this.response);
  }

  // ajouter un  nouveau utilisateur
  AddUser(): void {
    const newUser = {id: '', name: '', login: '', password: '', admin: '' };
    this.users.push(newUser);
  }

  // supprimer un utilisateur
  onDeleteDrop(e: any) {
    this.removeItem(e.dragData, this.users);
    console.log('utilisateur sélectionné: ', e.dragData);
    this.deleteJson(e.dragData);
    this.miseAjourUsers();
  }

  removeItem(item: any, list: Array<any>) {
    const index = list.map(function (e) {
      return e.name
    }).indexOf(item.name);
    list.splice(index, 1);
    this.selectedIndex = index;
  }

  // transmettre l'utilisateur sélectionné à la Modal
  transmitItemName(e: any, item: any, i: number) {
    const newUser = {id: '', name: '', login: '', password: '', admin: ''};
    newUser.login = item.login;
    newUser.name = item.name;
    newUser.password = item.password;
    newUser.admin = item.admin;
    this.selectedUser = newUser;
    this.selectedIndex = i;
  }

  // enregistrer les modification de l'utilisateur dans le tableau users
  register(obj: any) {
    this.users[this.selectedIndex].name = obj.name;
    this.users[this.selectedIndex].login = obj.login;
    this.users[this.selectedIndex].password = obj.password;
    this.users[this.selectedIndex].admin = obj.admin;
    this.postJson(this.users[this.selectedIndex]);
    console.log('objet reçu: ', obj);
    console.log('Liste des utilisateurs: ', JSON.stringify(this.users)); // afficher le JSON du tableau users
    this.miseAjourUsers();
  }

  postJson(obj: any) {
    this.methode.postJson(this.urlPost, obj).subscribe((response) => this.statut = response)
    console.log('statu Post: ', this.statut);
  }

  deleteJson(obj: any) {
    this.methode.postJson(this.urlDelete, obj).subscribe((response) => this.statut = response)
    console.log('statu delete: ', this.statut);
  }

  miseAjourUsers(){
    setTimeout(() => this.users = this.zoneConfigUserService.getUsers(), 100);
  }

}
