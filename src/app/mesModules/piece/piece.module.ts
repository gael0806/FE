// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/mesModules/shared/shared.module';
import { FormsModule } from '@angular/forms';

// components
import { PieceComponent } from 'app/components/piece/piece';
import { DispositifComponent } from 'app/components/piece/dispositif/dispositif';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
  ],
  declarations: [
    PieceComponent,
    DispositifComponent,
  ]
})
export class PieceModule { }
