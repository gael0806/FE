// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Ng2DragDropModule } from 'ng2-drag-drop';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



// components
import { ConfigurationComponent } from 'app/components/configuration/configuration';
import {UtilisateurConfigComponent } from 'app/components/configuration/utilisateur/utilisateurConfig';
import { ZoneConfigComponent } from 'app/components/configuration/zoneConfig/zoneConfig';
import { MaterielComponent } from 'app/components/configuration/materiel/materiel';
import{DispositifComponent} from 'app/components/configuration/zoneConfig/dispositif/dispositif';



@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    Ng2DragDropModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    HttpClientModule
  ],
  declarations: [
    ConfigurationComponent,
    UtilisateurConfigComponent,
    ZoneConfigComponent,
    MaterielComponent,
    DispositifComponent
    
  ]
})
export class ConfigurationModule { }
