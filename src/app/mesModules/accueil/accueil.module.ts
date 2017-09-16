// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/mesModules/shared/shared.module';
import { FormsModule } from '@angular/forms';


// components
import { AccueilComponent } from 'app/components/accueil/accueil'

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    AccueilComponent,
  ]
})
export class AccueilModule { }
