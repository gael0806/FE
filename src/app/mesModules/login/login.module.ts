// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


// components
import { LoginComponent } from 'app/components/login/login'

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    LoginComponent,
  ]
})
export class LoginModule { }
