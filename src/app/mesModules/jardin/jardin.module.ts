// modules
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/mesModules/shared/shared.module'

// components
import { GlobalDataComponent } from 'app/components/jardin/globalData/globalData';
import { HistoDataComponent } from 'app/components/jardin/histoData/histoData';
// import { ZoneListComponent } from 'app/components/zoneList/zoneList';
import { JardinComponent } from 'app/components/jardin/jardin';
// import { ZoneComponent } from 'app/components/jardin/zone/zone';


// pipes

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
  ],

  declarations: [
    JardinComponent,
    GlobalDataComponent,
    HistoDataComponent,
    // ZoneListComponent,
    // ZoneComponent,
  ]
})
export class JardinModule { }
