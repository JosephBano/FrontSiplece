import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InicioComponent } from './inicio.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    InicioComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    InicioRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class InicioModule { }
