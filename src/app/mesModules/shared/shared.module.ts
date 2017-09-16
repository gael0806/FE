// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// components
import { BoutonOnOffComponent } from 'app/components/bouton-on-off/bouton-on-off';
import { ZoneListComponent } from 'app/components/zoneList/ZoneList';
import { ZoneComponent } from 'app/components/jardin/zone/zone';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    BoutonOnOffComponent,
    ZoneListComponent,
    ZoneComponent,
  ],
  exports: [
    BoutonOnOffComponent,
    ZoneListComponent,
    ZoneComponent,
  ]
})
export class SharedModule { }
