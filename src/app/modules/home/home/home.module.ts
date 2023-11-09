import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { PersonaMainComponent } from './persona/persona-main/persona-main.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PersonaFormComponent } from './persona-form/persona-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent,
    PersonaMainComponent,
    PersonaFormComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,FormsModule,ReactiveFormsModule
  ]
})
export class HomeModule { }
